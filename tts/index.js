import Tts from 'react-native-tts';
import Platform from 'Platform';

function ifChangedNonNull(previousSettings, currentSettings, settingName) {
  return currentSettings[settingName] && (previousSettings[settingName] !== currentSettings[settingName]);
}

function ifChanged(previousSettings, currentSettings, settingName) {
  return (previousSettings[settingName] !== currentSettings[settingName]);
}

export default
class AppTts {
  static promises = {}
  static store = null;
  static storeUnsubscribe = null;
  static currentSettings = {};

  static init(store){
    switch(Platform.OS) {
      case  'ios':
        Tts.setDefaultLanguage('ru-RU');
        break;
      case 'android':
        Tts.setDefaultLanguage('bg-BG');
        break;
    }
    Tts.addEventListener('tts-start', AppTts.onTtsStart);
    Tts.addEventListener('tts-finish', AppTts.onTtsFinish);
    Tts.addEventListener('tts-progress', AppTts.onTtsProgress);
    Tts.addEventListener('tts-cancel', AppTts.onTtsCancel);

    AppTts.store = store;
    AppTts.storeUnsubscribe = store.subscribe(AppTts.handleStoreChange);
  }

  static handleStoreChange(){
    const previousSettings = AppTts.currentSettings;
    const currentSettings = AppTts.currentSettings = AppTts.store.getState().settings;

    if (previousSettings !== currentSettings) {
      console.log(previousSettings, currentSettings);
      if (ifChangedNonNull(previousSettings, currentSettings, 'speechLang')) {
        Tts.setDefaultLanguage(currentSettings.speechLang);
      }
      if (ifChangedNonNull(previousSettings, currentSettings, 'speechVoice')) {
        Tts.setDefaultVoice(currentSettings.speechVoice);
      }
      if (ifChangedNonNull(previousSettings, currentSettings, 'speechRate')) {
        Tts.setDefaultRate(currentSettings.speechRate);
      }
      if (ifChangedNonNull(previousSettings, currentSettings, 'speechPitch')) {
        Tts.setDefaultPitch(currentSettings.speechPitch);
      }
    }
  }

  static onTtsStart({utteranceId}) {
    console.log('tts-start', utteranceId);
    if(AppTts.promises[utteranceId].onStart){
      AppTts.promises[utteranceId].onStart();
    }
  }

  static onTtsFinish({utteranceId}) {
    console.log('tts-finish', utteranceId);
    if(AppTts.promises[utteranceId]){
      AppTts.promises[utteranceId].onFinish();
      delete AppTts.promises[utteranceId];
    }
  }

  static onTtsCancel({utteranceId}) {
    console.log('tts-cancel', utteranceId);
    if(AppTts.promises[utteranceId]){
      AppTts.promises[utteranceId].onCancel();
      delete AppTts.promises[utteranceId];
    }
  }

  static onTtsProgress(utteranceId) {
  }

  static speak(text, onStart=null) {
    return new Promise(function (resolve, reject) {
      Tts.speak(text)
        .then((utteranceId)=>{
          AppTts.promises[utteranceId] = {
            onFinish: ()=> resolve(utteranceId, 'finish'),
            onCancel: ()=> resolve(utteranceId, 'cancel'),
            onStart,
          }
        })
        .catch((e)=>reject(e))
    });
  }


  static stop() {
    return Tts.stop();
  }

  static voices() {
    return Tts.voices();
  }
}
