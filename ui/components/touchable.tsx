import React, {PureComponent, type ReactNode} from 'react';
import {
  Platform,
  type StyleProp,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

type Props = {
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export default class Touchable extends PureComponent<Props> {
  render() {
    const {disabled, onPress, style, children} = this.props;

    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
          <View style={style}>{children}</View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity
        style={style}
        disabled={disabled}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
}
