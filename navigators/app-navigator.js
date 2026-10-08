import React from 'react';
import { BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MenuScreen from '../ui/menu-screen';
import SettingsScreen from '../ui/settings-screen';
import ConverseScreen from '../ui/converse-screen';
import TutorScreen from '../ui/tutor-screen';
import LessonScreen from '../ui/lesson-screen';

import I18n from '../i18n';


class Hidden extends React.PureComponent {
  render() {
    return null;
  }
}

export const AppNavigatorStack = createStackNavigator({
  Conversation: { screen: ConverseScreen },
  Tutor: { screen: TutorScreen },
  Lesson: {
    screen: LessonScreen,
    navigationOptions: ({navigation}) => ({
      title: `${I18n.t('lesson')}: ${navigation.state.params.lessonName}`,
    }),
  },
  Menu: { screen: MenuScreen},
  Settings: {screen: SettingsScreen},
},{
  defaultNavigationOptions: ({navigation}) => ({
    // The app runs full-screen (status bar hidden) - don't let the header
    // reserve safe-area space for it.
    headerForceInset: { top: 'never', bottom: 'never', horizontal: 'always' },
    headerRight:   (
      navigation.state.routeName !== 'Menu'
      ?(
        <Icon.Button
          name="menu"
          color="#000000"
          backgroundColor="transparent"
          onPress={() => navigation.navigate('Menu')}
        />
      )
      : null
    ),
  }),
});

export
const AppNavigator = createAppContainer(AppNavigatorStack);
