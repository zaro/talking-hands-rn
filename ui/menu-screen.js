import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import AppStyles from '../styles';

import ImageButton  from './components/image-button';
import SpeakButtonsColumn from './components/speak-buttons-column';

const resetToConversation = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Conversation'})
  ]
})

const resetToTutor = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Tutor'})
  ]
})


export default
class MenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Menu',
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageButton
          image={require('../data/img/conversation.png')}
          text="Conversation"
          onPress={()=> this.props.navigation.dispatch(resetToConversation)}
        />
        <ImageButton
          image={require('../data/img/teacher.png')}
          text="Tutor"
          onPress={()=> this.props.navigation.dispatch(resetToTutor)}
        />
        <ImageButton
          image={require('../data/img/settings.png')}
          text="Settings"
          onPress={()=> this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    ...AppStyles.appBackground,
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
