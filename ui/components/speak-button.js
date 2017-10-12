import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ColorPropType from 'ColorPropType';

import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native';

import Platform from 'Platform';

import Tts from 'react-native-tts';

export default class SpeakButton extends Component< {
  text : string,
  color?: ?string,
  disabled?: ?boolean,
} > {
  static propTypes = {
    text: PropTypes.string.isRequired,
    color: ColorPropType,
    disabled: PropTypes.bool,
    image: PropTypes.any,
  }
  speak = () => {
    Tts.speak(this.props.text);
  }
  render() {
    const {
      color,
      text,
      disabled,
      image,
    } = this.props;
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];
    if (color) {
      if (Platform.OS === 'ios') {
        textStyles.push({color: color});
      } else {
        buttonStyles.push({backgroundColor: color});
      }
    }
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
    }
    const Touchable = Platform.OS === 'android'
      ? TouchableNativeFeedback
      : TouchableOpacity;
    return (
      <Touchable accessibilityComponentType="button" disabled={disabled} onPress={this.speak}>
        <View style={buttonStyles}>
          { image && <Image source={image} style={{width: 50, height: 50}}/> }
          <Text style={textStyles} disabled={disabled}>{text}</Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      //flex: 1,
      margin: 5,
    },
    android: {
      //flex: 1,
      elevation: 1,
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
      backgroundColor: '#2196F3',
      borderRadius: 2,
      margin: 5,
    }
  }),
  text: Platform.select({
    ios: {
      // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
      color: '#007AFF',
      textAlign: 'center',
      padding: 8,
      fontSize: 18
    },
    android: {
      color: 'white',
      textAlign: 'center',
      padding: 8,
      fontWeight: '500'
    }
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf'
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd'
    },
    android: {
      color: '#a1a1a1'
    }
  })
});
