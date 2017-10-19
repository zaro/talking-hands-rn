import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Platform from 'Platform';

import {StyleSheet, View} from 'react-native';

import SpeakButton from './speak-button';

export default class SpeakButtonsPanel extends Component {
  static propTypes = {
    config: PropTypes.object,
    onPressAny: PropTypes.func,
    speakOnPress: PropTypes.bool,
  }
  render() {
    const {
      config,
      onPressAny,
      speakOnPress,
    } = this.props;
    const words = Object.keys(config);
    return (
        <View style={styles.panelStyle}>
          {
            words.map((key, idx) =>{
              return <SpeakButton
                text={key}
                pronounceAs={config[key].pronounce_as}
                key={key}
                image={config[key].img}
                onPress={onPressAny}
                speakOnPress={speakOnPress}
                style={{flex:1}}
              />;
            })
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  panelStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
      },
      android: {
      }
    })
  }
});
