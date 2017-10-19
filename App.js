import React, { Component } from 'react';
import AppNavigator from './navigators/app-navigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import { addNavigationHelpers } from 'react-navigation';

import Tts from 'react-native-tts';
import Platform from 'Platform';

switch(Platform.OS) {
  case  'ios':{
    const ignore = (event) => {};
    Tts.setDefaultLanguage('ru-RU');
    Tts.addEventListener('tts-start', ignore);
    Tts.addEventListener('tts-finish', ignore);
    Tts.addEventListener('tts-progress', ignore);
    Tts.addEventListener('tts-cancel', ignore);
    break;
  }
  case 'android':
    Tts.setDefaultLanguage('bg-BG');
    break;
}

const store = createStore(appReducer);

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}/>
      </Provider>
    );
  }
}
