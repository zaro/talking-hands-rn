import AsyncStorage from '@react-native-community/async-storage';
import { settingsReplace } from '../reducers/actions';

export default
class Storage {
  static STORAGE_KEY='@th:Settings';
  static store = null;

  static
  load(store) {
    Storage.store = store;
    return AsyncStorage.getItem(Storage.STORAGE_KEY).then((json)=>{
      if (json) {
        const settings = JSON.parse(json);
        store.dispatch(settingsReplace(settings));
      }
    });
  }

  static
  save() {
    const currentSettings = Storage.store.getState().settings;
    return AsyncStorage.setItem(Storage.STORAGE_KEY, JSON.stringify(currentSettings))
  }

}
