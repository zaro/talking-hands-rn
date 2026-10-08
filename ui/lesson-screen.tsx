import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import AppStyles from '../styles';
import SpeakButtonsColumn from './components/speak-buttons-column';
import LessonsIndex from '../data/lesson-index';
import WordsCategories from '../data/words-categories';
import type {RootStackParamList} from '../navigators/app-navigator';
import type {WordEntry, WordsConfig} from '../types';

type LessonData = {
  panels: Array<string | null>;
  columns: WordEntry[][];
};

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

export default class LessonScreen extends React.Component<Props> {
  render() {
    const {lessonName} = this.props.route.params;
    const lessonData = LessonsIndex.getLessonData(lessonName) as LessonData;
    const [topPanel, bottomPanel] = lessonData.panels;
    const categories = WordsCategories as unknown as Record<
      string,
      WordsConfig
    >;

    return (
      <View style={styles.container}>
        {lessonData.columns.map((column, idx, arr) => [
          <SpeakButtonsColumn
            config={column}
            key={idx}
            topPanel={!idx && topPanel ? categories[topPanel] : null}
            bottomPanel={!idx && bottomPanel ? categories[bottomPanel] : null}
          />,
          idx !== arr.length - 1 ? (
            <View style={styles.separator} key={idx + 999} />
          ) : null,
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
    height: '60%',
    backgroundColor: 'lightgrey',
  },
});
