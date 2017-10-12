import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View} from 'react-native';

import SpeakButton from './speak-button';

export default class SpeakButtonsColumn extends Component {
  static propTypes = {
    config: PropTypes.object,
  }
  render() {
    const {
      config,
    } = this.props;
    const words = Object.keys(config);
    return (
        <View style={styles.columnStyle}>
          {
            words.map((key, idx) =>{
              return <SpeakButton text={key} key={idx} image={config[key].img}/>;
            })
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  columnStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
