import React, {PureComponent} from 'react';
import type {ImageSourcePropType} from 'react-native';

import ImageButton from './image-button';
import Tts from '../../tts';

type Props = {
  text: string;
  pronounceAs?: string;
  onPress?: (text: string, pronounceAs?: string) => void;
  speakOnPress?: boolean;
  image?: ImageSourcePropType;
  style?: React.ComponentProps<typeof ImageButton>['style'];
};

export default class SpeakButton extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    speakOnPress: true,
  };

  speak = () => {
    const {onPress, speakOnPress, text, pronounceAs} = this.props;
    if (onPress) {
      onPress(text, pronounceAs);
      if (!speakOnPress) {
        return;
      }
    }
    Tts.speak(pronounceAs || text);
  };

  render() {
    return <ImageButton {...this.props} onPress={this.speak} />;
  }
}
