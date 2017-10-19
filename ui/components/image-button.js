import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ColorPropType from 'ColorPropType';
import AppStyles from '../../styles';

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

export default class ImageButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    color: ColorPropType,
    disabled: PropTypes.bool,
    image: PropTypes.any,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    const {
      color,
      text,
      pronounce_as,
      disabled,
      image,
      onPress,
      style,
    } = this.props;
    const buttonStyles = [styles.button, style];
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

    const content = (
      <View style={styles.buttonContent} >
        { image && <Image source={image} style={styles.image}/> }
        <Text style={textStyles} disabled={disabled}>{text}</Text>
      </View>
    );
    if(Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback accessibilityComponentType="button" disabled={disabled} onPress={onPress}>
          <View style={buttonStyles}>{content}</View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity style={buttonStyles} accessibilityComponentType="button" disabled={disabled} onPress={onPress}>
          {content}
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    ...AppStyles.buttonBorder,
  },
  text: {
    color: '#101010',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
        padding: 8,
        fontSize: 18
      },
      android: {
        padding: 2,
        fontWeight: '500'
      }
    })
  },
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
  }),
  image: {
    marginTop: 3,
    minHeight: 50,
  }
});
