import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, FlatList} from 'react-native';

import SpeakButton from './speak-button';

export default class SpeakButtonsColumn extends Component {
  static propTypes = {
    config: PropTypes.object,
    onPressAny: PropTypes.func,
  }

  getListItems() {
    const {
      config
    } = this.props;

    if ( config === this.prevConfig ) {
      return this.listItems;
    }

    const items = Object.values(config).map((val, idx) => ({
        key: idx,
        config: val,
    }));

    this.prevConfig = config;
    return this.listItems = items;
  }

  renderItem = ({item}) => {
    const { config } = item;
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
        data={this.getListItems()}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  columnStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }
});
