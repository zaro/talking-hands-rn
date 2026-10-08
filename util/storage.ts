import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Store} from 'redux';

import type {RootState} from '../reducers';
import type {Settings} from '../reducers/defaults';
import {settingsReplace} from '../reducers/actions';

export default class Storage {
  static STORAGE_KEY = '@th:Settings';
  static store: Store<RootState> | null = null;

  static load(store: Store<RootState>): Promise<void> {
    Storage.store = store;
    return AsyncStorage.getItem(Storage.STORAGE_KEY).then(json => {
      if (json) {
        const settings = JSON.parse(json) as Settings;
        store.dispatch(settingsReplace(settings));
      }
    });
  }

  static save(): Promise<void> {
    const store = Storage.store;
    if (!store) {
      return Promise.resolve();
    }
    const currentSettings = store.getState().settings;
    return AsyncStorage.setItem(
      Storage.STORAGE_KEY,
      JSON.stringify(currentSettings),
    );
  }
}
