import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import SpeakButton from './speak-button';
import type {WordEntry, WordsConfig} from '../../types';

type Props = {
  config: WordsConfig;
  onPressAny?: (text: string, pronounceAs?: string) => void;
  speakOnPress?: boolean;
  numColumns?: number;
};

type Row = {
  key: number;
  words: WordEntry[];
};

export default class SpeakButtonsPanel extends Component<Props> {
  static defaultProps: Partial<Props> = {
    numColumns: 4,
  };

  private prevConfig?: WordsConfig;
  private listItems: Row[] = [];

  getListItems(): Row[] {
    const {config} = this.props;

    if (config === this.prevConfig) {
      return this.listItems;
    }
    const items: Row[] = [];

    const words = Object.keys(config);
    for (let i = 0; i < words.length; ) {
      const row: WordEntry[] = [];
      for (let count = 0; count < 3 && i < words.length; ++count, ++i) {
        row.push(config[words[i]]);
      }
      items.push({
        key: i,
        words: row,
      });
    }
    this.prevConfig = config;
    return (this.listItems = items);
  }

  renderRow = ({item}: {item: Row}) => {
    const words = item.words;
    return (
      <View style={styles.rowStyle}>
        {words.map((word, idx) => (
          <SpeakButton
            text={word.word}
            pronounceAs={word.pronounce_as}
            key={idx}
            image={word.img}
            onPress={this.props.onPressAny}
            speakOnPress={this.props.speakOnPress}
            style={{width: '30%'}}
          />
        ))}
      </View>
    );
  };

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
  },
});
