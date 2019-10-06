import React, { Component } from 'react';
import { AppNavigator } from './navigators/app-navigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import {AppState, BackHandler} from 'react-native'
import { NavigationActions } from 'react-navigation';

import Tts from './tts';
import {settingsReplace} from './reducers/actions'
import Storage from './util/storage'
const store = createStore(appReducer);


export default class App extends Component<{}> {
  UNSAFE_componentWillMount() {
    Tts.init(store);
    Storage.load(store);
  }
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
   componentDidMount() {
     AppState.addEventListener('change', this._handleAppStateChange);
   }
   componentWillUnmount() {
     AppState.removeEventListener('change', this._handleAppStateChange);
   }
   _handleAppStateChange = (nextAppState) => {
     if(nextAppState.match(/inactive|background/)) {
       console.log('Persist settings');
        // Persist settings here
        Storage.save();
     }
  }
}
