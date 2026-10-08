import React from 'react';
import CheckBoxBase from '@react-native-community/checkbox';

export type CheckBoxProps = {
  value?: boolean;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;
  tintColors?: {true?: string; false?: string};
};

// The published typings of @react-native-community/checkbox are broken (they
// intersect a constructor with the component class), so re-type it here.
const CheckBox = CheckBoxBase as unknown as React.ComponentType<CheckBoxProps>;

export default CheckBox;
