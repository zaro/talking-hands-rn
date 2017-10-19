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
import AppStyles from '../styles';
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
         <View style={styles.listItem}>
           <Text style={styles.listItemIndex} >{this.props.index}.</Text>
           <Text style={styles.listItemText} >{ this.props.title }</Text>
         </View>
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
    this.props.navigation.navigate('Lesson', { lessonName: id })
  }

  // { item: { name: 'Урок 1' },
  //   index: 49,
  //   separators:
  //   { highlight: [Function: highlight],
  //     unhighlight: [Function: unhighlight],
  //     updateProps: [Function: updateProps] } }
  renderItem = ({item, index}) => (
    <LessonsListItem
      id={item.id}
      onPressItem={this.onPressItem}
      title={item.name}
      name={item.name}
      index={index}
    />
  )
  render() {
    let lessons = LessonsIndex.lessons;
    for(let i=0; i<50; ++i){
      lessons = lessons.concat(LessonsIndex.lessons);
    }
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
    height: "60%",
    backgroundColor: 'lightgrey',
  },
  listItem :{
    margin: 5,
    flexDirection: 'row',
    ...AppStyles.buttonBorder,
  },
  listItemIndex: {
    fontSize: 18,
    fontWeight: '500',
  },
  listItemText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  }
});
