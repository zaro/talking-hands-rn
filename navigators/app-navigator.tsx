import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MenuScreen from '../ui/menu-screen';
import SettingsScreen from '../ui/settings-screen';
import ConverseScreen from '../ui/converse-screen';
import TutorScreen from '../ui/tutor-screen';
import LessonScreen from '../ui/lesson-screen';
import I18n from '../i18n';

export type RootStackParamList = {
  Conversation: undefined;
  Tutor: undefined;
  Lesson: {lessonName: string};
  Menu: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Conversation"
        screenOptions={({route, navigation}) => ({
          headerRight:
            route.name !== 'Menu'
              ? () => (
                  <Icon.Button
                    name="menu"
                    color="#000000"
                    backgroundColor="transparent"
                    onPress={() => navigation.navigate('Menu')}
                  />
                )
              : undefined,
        })}>
        <Stack.Screen
          name="Conversation"
          component={ConverseScreen}
          options={{title: I18n.t('conversation')}}
        />
        <Stack.Screen
          name="Tutor"
          component={TutorScreen}
          options={{title: I18n.t('tutor')}}
        />
        <Stack.Screen
          name="Lesson"
          component={LessonScreen}
          options={({route}) => ({
            title: `${I18n.t('lesson')}: ${route.params.lessonName}`,
          })}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{title: I18n.t('menu')}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{title: I18n.t('settings')}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
