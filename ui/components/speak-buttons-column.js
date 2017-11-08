import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, FlatList} from 'react-native';

import SpeakButton from './speak-button';
import SpeakButtonsPanel from './speak-buttons-panel';

export default class SpeakButtonsColumn extends PureComponent {
  static propTypes = {
    config: PropTypes.array,
    onPressAny: PropTypes.func,
    topPanel: PropTypes.object,
    bottomPanel: PropTypes.object,
  }

  getListItems() {
    const {
      config,
      topPanel,
      bottomPanel,
    } = this.props;

    if ( config === this.prevConfig ) {
      return this.listItems;
    }

    const items = config.map((val, idx) => ({
        key: idx,
        config: val,
    }));

    if (bottomPanel){
      items.push({
        key: 999999,
        config: bottomPanel,
        type: 'panel',
      })
    }

    this.prevConfig = config;
    return this.listItems = items;
  }
  renderPanel(config) {
    return (
      <View style={{flexDirection: 'row'}}>
        {
          Object.values(config).map((word, idx) =>{
            return <SpeakButton
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
            />;
          })
        }
      </View>
    );
  }

  renderHeader = () => {
    if(this.props.topPanel){
      return this.renderPanel(this.props.topPanel);
    }
  }

  renderItem = ({item}) => {
    const { config, type } = item;
    if( type === 'panel') {
      return this.renderPanel(config);
    }
    return <SpeakButton
      text={config.word}
      pronounceAs={config.pronounce_as}
      image={config.img}
      onPress={this.props.onPressAny}
    />;
  }

  render() {
    return (
      <FlatList
        style={styles.columnStyle}
        data={this.getListItems()}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader()}
      />
    );
  }
}

const styles = StyleSheet.create({
  columnStyle: {
    flex: 1,
  }
});
