import React, {Component} from 'react';
import {AppState, type AppStateStatus} from 'react-native';
import {Provider} from 'react-redux';
import {legacy_createStore as createStore} from 'redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppNavigator} from './navigators/app-navigator';
import appReducer from './reducers';
import Tts from './tts';
import Storage from './util/storage';

const store = createStore(appReducer);

export type AppDispatch = typeof store.dispatch;

export default class App extends Component {
  private appStateSubscription?: {remove: () => void};

  constructor(props: Record<string, never>) {
    super(props);
    Tts.init(store);
    Storage.load(store);
  }

  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
  }

  componentWillUnmount() {
    this.appStateSubscription?.remove();
    Tts.storeUnsubscribe?.();
  }

  handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState.match(/inactive|background/)) {
      console.log('Persist settings');
      Storage.save();
    }
  };

  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
