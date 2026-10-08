import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import AppStyles from '../styles';
import I18n from '../i18n';
import ImageButton from './components/image-button';
import type {RootStackParamList} from '../navigators/app-navigator';

import conversationImage from '../data/img/conversation.png';
import teacherImage from '../data/img/teacher.png';
import settingsImage from '../data/img/settings.png';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

export default class MenuScreen extends React.Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <ImageButton
          image={conversationImage}
          text={I18n.t('conversation')}
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: 'Conversation'}]})
          }
        />
        <ImageButton
          image={teacherImage}
          text={I18n.t('tutor')}
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: 'Tutor'}]})
          }
        />
        <ImageButton
          image={settingsImage}
          text={I18n.t('settings')}
          onPress={() => navigation.navigate('Settings')}
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
    height: '60%',
    backgroundColor: 'lightgrey',
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
