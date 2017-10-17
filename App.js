import React, { Component } from 'react';
import AppNavigator from './navigators/app-navigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import { addNavigationHelpers } from 'react-navigation';

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
