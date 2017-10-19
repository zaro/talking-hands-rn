import Tts from 'react-native-tts';
import Platform from 'Platform';

export default
class AppTts {
  static promises = {}

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

  static init(){
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
}
