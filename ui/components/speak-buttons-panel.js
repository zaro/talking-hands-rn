import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, ScrollView, FlatList, Platform} from 'react-native';

import SpeakButton from './speak-button';

export default class SpeakButtonsPanel extends Component {
  static propTypes = {
    config: PropTypes.object,
    onPressAny: PropTypes.func,
    speakOnPress: PropTypes.bool,
    numColumns: PropTypes.number,
  }
  static defaultProps = {
    numColumns: 4
  }

  getListItems() {
    const {
      config
    } = this.props;

    if ( config === this.prevConfig ) {
      return this.listItems;
    }
    const items = [];

    let words = Object.keys(config);
    for(let i=0; i < words.length; ) {
      const row = [];
      for(let count=0; count < 3 && i < words.length; ++count,++i ) {
        row.push(config[words[i]])
      }
      items.push({
        key: i,
        words: row,
      })
    }
    this.prevConfig = config;
    return this.listItems = items;
  }

  renderRow = ({item}) => {
    const words = item.words;
    return (
      <View style={styles.rowStyle}>
        {
          words.map((word, idx) =>{
            return <SpeakButton
              text={word.word}
              pronounceAs={word.pronounce_as}
              key={idx}
              image={word.img}
              onPress={this.props.onPressAny}
              speakOnPress={this.props.speakOnPress}
              style={{width: '30%'}}
            />;
          })
        }
      </View>
    );
  }
  render() {
    return (
      <FlatList
        data={this.getListItems()}
        renderItem={this.renderRow}
        keyExtractor={item => item.key.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  panelStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
  }

});
