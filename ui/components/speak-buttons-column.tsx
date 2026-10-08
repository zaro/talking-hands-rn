import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import SpeakButton from './speak-button';
import type {WordEntry, WordsConfig} from '../../types';

type NormalItem = {
  key: number;
  config: WordEntry;
  type: 'item';
};

type PanelItem = {
  key: number;
  config: WordsConfig;
  type: 'panel';
};

type Item = NormalItem | PanelItem;

type Props = {
  config: WordEntry[];
  onPressAny?: (text: string, pronounceAs?: string) => void;
  topPanel?: WordsConfig | null;
  bottomPanel?: WordsConfig | null;
  speakOnPress?: boolean;
};

export default class SpeakButtonsColumn extends PureComponent<Props> {
  private prevConfig?: WordEntry[];
  private listItems: Item[] = [];

  getListItems(): Item[] {
    const {config, topPanel, bottomPanel} = this.props;

    if (config === this.prevConfig) {
      return this.listItems;
    }

    const items: Item[] = config.map((val, idx) => ({
      key: idx,
      config: val,
      type: 'item',
    }));

    if (bottomPanel) {
      items.push({
        key: 999999,
        config: bottomPanel,
        type: 'panel',
      });
    }

    this.prevConfig = config;
    return (this.listItems = items);
  }

  renderPanel(config: WordsConfig) {
    return (
      <View style={{flexDirection: 'row'}}>
        {Object.values(config).map((word, idx) => (
          <SpeakButton
            text={word.word}
            pronounceAs={word.pronounce_as}
            key={idx}
            image={word.img}
            onPress={this.props.onPressAny}
            speakOnPress={this.props.speakOnPress}
            style={{
              minWidth: 50,
              minHeight: 50,
            }}
          />
        ))}
      </View>
    );
  }

  renderHeader = (): React.ReactElement | undefined => {
    if (this.props.topPanel) {
      return this.renderPanel(this.props.topPanel);
    }
    return undefined;
  };

  renderItem = ({item}: {item: Item}) => {
    if (item.type === 'panel') {
      return this.renderPanel(item.config);
    }
    return (
      <SpeakButton
        text={item.config.word}
        pronounceAs={item.config.pronounce_as}
        image={item.config.img}
        onPress={this.props.onPressAny}
      />
    );
  };

  render() {
    return (
      <FlatList
        style={styles.columnStyle}
        data={this.getListItems()}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader()}
        keyExtractor={item => item.key.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  columnStyle: {
    flex: 1,
  },
});
