import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import AppStyles from '../styles';
import I18n from '../i18n';

import ImageButton  from './components/image-button';
import SpeakButtonsColumn from './components/speak-buttons-column';

const resetToConversation = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Conversation'})
  ]
})

const resetToTutor = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Tutor'})
  ]
})


export default
class MenuScreen extends React.Component {
  static navigationOptions = {
    title: I18n.t('menu'),
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageButton
          image={require('../data/img/conversation.png')}
          text={I18n.t('conversation')}
          onPress={()=> this.props.navigation.dispatch(resetToConversation)}
        />
        <ImageButton
          image={require('../data/img/teacher.png')}
          text={I18n.t('tutor')}
          onPress={()=> this.props.navigation.dispatch(resetToTutor)}
        />
        <ImageButton
          image={require('../data/img/settings.png')}
          text={I18n.t('settings')}
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
