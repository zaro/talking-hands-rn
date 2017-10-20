import React, { PureComponent } from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Platform from 'Platform';

export default class Touchable extends PureComponent {
  render() {
    const {
      accessibilityComponentType,
      disabled,
      onPress,
      style,
      children,
      ...props,
    } = this.props;

    if(Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          accessibilityComponentType={accessibilityComponentType}
          disabled={disabled}
          onPress={onPress}
        >
          <View style={style} {...props}>{children}</View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity
          style={style}
          accessibilityComponentType={accessibilityComponentType}
          disabled={disabled}
          onPress={onPress}
          {...props} 
        >
          {children}
        </TouchableOpacity>
      );
    }
  }
}
