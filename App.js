/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import SpeakButtonsColumn from './ui/components/speak-buttons-column';
import TestScreen from './data/urok-1';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        { TestScreen.columns.map((column, idx) => <SpeakButtonsColumn config={column} key={idx} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
