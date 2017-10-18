import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import SpeakButtonsColumn from './components/speak-buttons-column';

import LessonsIndex from '../data/lesson-index';

export default
class TutorScreen extends React.Component {
  static navigationOptions = {
    title: 'Lesson',
  };
  render() {
    const {
      lessonName
    } = this.props.navigation.state.params;
    const lessonData = LessonsIndex.getLessonData(lessonName);
    console.log(lessonName);
    console.log(lessonData);
    return (
      <View style={styles.container}>
        { lessonData.columns.map((column, idx, arr) => [
          <SpeakButtonsColumn config={column} key={idx} />,
          (idx != arr.length - 1) ? <View style={styles.separator} key={idx + 999}/> : null,
        ])}
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
  separator: {
    width: 3,
    height: "60%",
    backgroundColor: 'lightgrey',
  },
});
