import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Platform from 'Platform';

import {StyleSheet, View, ScrollView} from 'react-native';

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
  render() {
    const {
      config,
      onPressAny,
      speakOnPress,
    } = this.props;
    let words = Object.keys(config);
    for(let i=0;i<10; i++){
      words = words.concat(Object.keys(config));
    }
    return (
      <ScrollView>
        <View style={styles.panelStyle}>
          {
            words.map((key, idx) =>{
              return <SpeakButton
                text={key}
                pronounceAs={config[key].pronounce_as}
                key={idx}
                image={config[key].img}
                onPress={onPressAny}
                speakOnPress={speakOnPress}
                style={{width: '30%'}}
              />;
            })
          }
        </View>
      </ScrollView>
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
  }
});
