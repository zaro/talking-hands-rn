import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';


export default
class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  separator: {
    width: 3,
    height: "60%",
    backgroundColor: 'lightgrey',
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
