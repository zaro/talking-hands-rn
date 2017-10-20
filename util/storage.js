import { AsyncStorage } from 'react-native';
import EventEmitter from 'EventEmitter';


export default
class Storage {
  static STORAGE_KEY='@th:Settings';
  static stash = {};
  static __ee = new EventEmitter();


  static
  load() {
    return AsyncStorage.getItem(Storage.STORAGE_KEY).then((json)=>{
      Storage.stash.auth = json ? JSON.parse(json) : {};

      Storage._settingsAvaialble();
      return Storage.stash;
    });
  }

  static
  authenticate(phone, authToken) {
    Storage.stash.auth = { phone: phone, auth: authToken};
    Storage._fcmTokenAvaialble();
    return Storage.save();
  }

  static
  getAuth() {
    if(Storage.stash.auth) {
      return Storage.stash.auth.auth;
    }
  }


  static
  _settingsAvaialble() {
    Storage.__ee.emit(Storage.SETTINGS_AVAILABLE, Storage.stash);
  }

  static
  on(event, callback) {
    Storage.__ee.addListener(event, callback);
  }

  static
  save() {
    return AsyncStorage.setItem(Storage.STORAGE_KEY, JSON.stringify(Storage.stash.auth))
  }

  static
  clear() {
    return AsyncStorage.clear()
  }

  static
  SETTINGS_AVAILABLE = 'settings';

}
