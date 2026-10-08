import React, {PureComponent} from 'react';
import {
  Image,
  type ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

import AppStyles from '../../styles';

type Props = {
  text: string;
  color?: string;
  disabled?: boolean;
  image?: ImageSourcePropType;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default class ImageButton extends PureComponent<Props> {
  render() {
    const {color, text, disabled, image, onPress, style} = this.props;
    const buttonStyles: Array<StyleProp<ViewStyle>> = [styles.button, style];
    const textStyles: Array<StyleProp<TextStyle>> = [styles.text];

    if (color) {
      if (Platform.OS === 'ios') {
        textStyles.push({color});
      } else {
        buttonStyles.push({backgroundColor: color});
      }
    }
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
    }

    const content = (
      <View style={styles.buttonContent}>
        {image && <Image source={image} style={styles.image} />}
        <Text style={textStyles}>{text}</Text>
      </View>
    );

    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
          <View style={buttonStyles}>{content}</View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity
        style={buttonStyles}
        disabled={disabled}
        onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
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
        fontSize: 18,
      },
      android: {
        padding: 2,
        fontWeight: '500' as const,
      },
    }),
  },
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    },
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd',
    },
    android: {
      color: '#a1a1a1',
    },
  }),
  image: {
    marginTop: 3,
    minHeight: 50,
  },
});
