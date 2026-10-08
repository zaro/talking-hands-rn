declare module '*.png' {
  const content: number;
  export = content;
}

declare module 'react-native-vector-icons/MaterialIcons' {
  import type {ComponentType} from 'react';
  import type {TextProps, TouchableOpacityProps} from 'react-native';

  export type IconProps = TextProps & {
    name: string;
    size?: number;
    color?: string;
  };

  export type IconButtonProps = TouchableOpacityProps & {
    name: string;
    size?: number;
    color?: string;
    backgroundColor?: string;
    borderRadius?: number;
    onPress?: () => void;
  };

  interface MaterialIconsComponent extends ComponentType<IconProps> {
    Button: ComponentType<IconButtonProps>;
    getImageSource(
      name: string,
      size?: number,
      color?: string,
    ): Promise<unknown>;
  }

  const MaterialIcons: MaterialIconsComponent;
  export default MaterialIcons;
}
