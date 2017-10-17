import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Platform from 'Platform';
import SpeakButtonsColumn from './components/speak-buttons-column';

import LessonsIndex from '../data/lesson-index';

const Touchable = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : TouchableOpacity;

class LessonsListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.name);
  };
  render() {
     return (
       <Touchable accessibilityComponentType="button" onPress={this.onPress}>
         <Text style={styles.listItem} >{ this.props.title }</Text>
       </Touchable>
      )
   }
 }


export default
class TutorScreen extends React.Component {
  static navigationOptions = {
    title: 'Tutor',
  };
  keyExtractor = (item, index) => item.name
  onPressItem = (id: string) => {
    console.log('Pressed id:', id);
    this.props.navigation.navigate('Lesson', { lessonName: id })
  }
  renderItem = ({item}) => (
    <LessonsListItem
      id={item.id}
      onPressItem={this.onPressItem}
      title={item.name}
      name={item.name}
    />
  )
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={LessonsIndex.lessons}
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
