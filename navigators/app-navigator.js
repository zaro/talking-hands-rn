import React from 'react';
import { BackHandler } from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions, DrawerNavigator } from 'react-navigation';

import ConverseScreen from '../ui/converse-screen';
import TutorScreen from '../ui/tutor-screen';
import LessonScreen from '../ui/lesson-screen';


class Hidden extends React.PureComponent {
  render() {
    return null;
  }
}

export const AppNavigator = DrawerNavigator({
  Converse: { screen: ConverseScreen },
  Tutor: { screen: TutorScreen },
  Lesson: {
    screen: LessonScreen,
    navigationOptions: {
      drawerLabel: <Hidden />,
    },
  },
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
    console.log('Back PRESS', nav);
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
