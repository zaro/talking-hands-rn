import React from 'react';
import { BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions, StackNavigator } from 'react-navigation';

import MenuScreen from '../ui/menu-screen';
import SettingsScreen from '../ui/settings-screen';
import ConverseScreen from '../ui/converse-screen';
import TutorScreen from '../ui/tutor-screen';
import LessonScreen from '../ui/lesson-screen';


class Hidden extends React.PureComponent {
  render() {
    return null;
  }
}

export const AppNavigator = StackNavigator({
  Conversation: { screen: ConverseScreen },
  Tutor: { screen: TutorScreen },
  Lesson: {
    screen: LessonScreen,
    navigationOptions: ({navigation}) => ({
      title: `Lesson: ${navigation.state.params.lessonName}`,
    }),
  },
  Menu: { screen: MenuScreen},
  Settings: {screen: SettingsScreen},
},{
  navigationOptions: ({navigation}) => ({
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

class AppWithNavigationState  extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    // console.log('Back PRESS', nav);
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }
  render() {
    const {
      dispatch,
      nav,
    } = this.props;
    return (
     <AppNavigator
       navigation={addNavigationHelpers({ dispatch, state: nav })}
     />
   );
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});


export default connect(mapStateToProps)(AppWithNavigationState);
