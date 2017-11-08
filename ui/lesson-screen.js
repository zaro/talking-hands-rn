import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import I18n from '../i18n';

import AppStyles from '../styles';
import SpeakButtonsColumn from './components/speak-buttons-column';
import LessonsIndex from '../data/lesson-index';
import WordsCategories from '../data/words-categories';

export default
class TutorScreen extends React.Component {
  static navigationOptions = {
    title: I18n.t('lesson'),
  };
  render() {
    const {
      lessonName
    } = this.props.navigation.state.params;
    const lessonData = LessonsIndex.getLessonData(lessonName);
    const [topPanel, bottomPanel] = lessonData.panels;

    return (
      <View style={styles.container}>
        { lessonData.columns.map((column, idx, arr) => [
          <SpeakButtonsColumn config={column} key={idx} topPanel={!idx && topPanel ? WordsCategories[topPanel]: null} bottomPanel={!idx && bottomPanel? WordsCategories[bottomPanel]: null}/>,
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
    ...AppStyles.appBackground,
  },
  separator: {
    width: 3,
    height: "60%",
    backgroundColor: 'lightgrey',
  },
});
