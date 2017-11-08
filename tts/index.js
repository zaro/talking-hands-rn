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
  static receivedEvents = {}

  static store = null;
  static storeUnsubscribe = null;
  static currentSettings = {};

  static init(store){
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
      // console.log(previousSettings, currentSettings);
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

  static _handleEvent(utteranceId, eventHandlerName, postpone=true) {
    const remove = eventHandlerName.match(/onFinish|onCancel/);
    if (AppTts.promises[utteranceId]) {
      if(AppTts.promises[utteranceId][eventHandlerName]){
        AppTts.promises[utteranceId][eventHandlerName]();
      }
      if(remove) {
        delete AppTts.promises[utteranceId];
      }
    } else if(postpone) {
      if (!AppTts.receivedEvents[utteranceId]) {
        AppTts.receivedEvents[utteranceId] = []
      }
    }
  }

  static onTtsStart({utteranceId}) {
    console.log('tts-start', utteranceId);
    AppTts._handleEvent(utteranceId, 'onStart');
  }

  static onTtsFinish({utteranceId}) {
    console.log('tts-finish', utteranceId);
    AppTts._handleEvent(utteranceId, 'onFinish');
  }

  static onTtsCancel({utteranceId}) {
    console.log('tts-cancel', utteranceId);
    AppTts._handleEvent(utteranceId, 'onCancel');
  }

  static onTtsProgress(utteranceId) {
  }

  static speak(text, onStart=null) {
    return new Promise(function (resolve, reject) {
      Tts.speak(text)
        .then((utteranceId)=>{
          console.log('tts-speak', utteranceId);
          AppTts.promises[utteranceId] = {
            onFinish: ()=> resolve(utteranceId, 'finish'),
            onCancel: ()=> resolve(utteranceId, 'cancel'),
            onStart,
          }
          if (AppTts.receivedEvents[utteranceId]) {
            for(let event of AppTts.receivedEvents[utteranceId]){
              AppTts._handleEvent(utteranceId, event, false);
            }
            delete AppTts.receivedEvents[utteranceId];
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
