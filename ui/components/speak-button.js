import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImageButton  from './image-button';

import Tts from '../../tts';

export default class SpeakButton extends PureComponent {
  static propTypes = {
    pronounceAs: PropTypes.string,
    onPress: PropTypes.func,
    speakOnPress: PropTypes.bool,
  }

  static defaultProps = {
    speakOnPress: true,
  }

  speak = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.text, this.props.pronounceAs);
      if (!this.props.speakOnPress) {
        return;
      }
    }
    Tts.speak(this.props.pronounceAs || this.props.text);
  }
  render() {
    return (
      <ImageButton {...this.props} onPress={this.speak} />
    );
  }
}
