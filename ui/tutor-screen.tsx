import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import AppStyles from '../styles';
import Touchable from './components/touchable';
import LessonsIndex from '../data/lesson-index';
import type {RootStackParamList} from '../navigators/app-navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Tutor'>;

type ListItemProps = {
  index: number;
  title: string;
  name: string;
  onPressItem: (name: string) => void;
};

class LessonsListItem extends React.PureComponent<ListItemProps> {
  onPress = () => {
    this.props.onPressItem(this.props.name);
  };

  render() {
    return (
      <Touchable onPress={this.onPress}>
        <View style={styles.listItem}>
          <Text style={styles.listItemIndex}>{this.props.index}.</Text>
          <Text style={styles.listItemText}>{this.props.title}</Text>
        </View>
      </Touchable>
    );
  }
}

export default class TutorScreen extends React.Component<Props> {
  keyExtractor = (item: {name: string}) => item.name;

  onPressItem = (id: string) => {
    this.props.navigation.navigate('Lesson', {lessonName: id});
  };

  renderItem = ({item, index}: {item: {name: string}; index: number}) => (
    <LessonsListItem
      onPressItem={this.onPressItem}
      title={item.name}
      name={item.name}
      index={index}
    />
  );

  render() {
    const lessons = LessonsIndex.lessons;
    return (
      <View style={styles.container}>
        <FlatList
          data={lessons}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
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
    margin: 5,
    flexDirection: 'row',
    ...AppStyles.buttonBorder,
  },
  listItemIndex: {
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  listItemText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
});
