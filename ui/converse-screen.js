import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  converseAddWord,
  converseAddWordChangeCategory,
  converseChangeCategory,
  converseClear,
} from '../reducers/actions';

import SpeakButtonsPanel from './components/speak-buttons-panel';
import WordsCategories from '../data/words-categories';
import Tts from '../tts';

const converseChain = [
  'verb',
  'noun'
];

class ConverseScreen extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
  }
  static defaultProps = {
    category: 'verb',
  }
  static navigationOptions = {
    title: 'Conversation',
  };

  state = {
    opacityAnim: new Animated.Value(1.0),
  }

  reset = (stopSpeaking=false) => {
    if(stopSpeaking){
      Tts.stop();
    }
    this.stopAnimation()
    this.props.clearWords(converseChain[0]);
  }

  startAnimation() {
    this.animation = Animated.loop(Animated.sequence([
      Animated.timing(this.state.opacityAnim, { toValue: 0, useNativeDriver: true,}),
      Animated.timing(this.state.opacityAnim, { toValue: 1.0, useNativeDriver: true,}),
    ]));
    this.animation.start();
  }

  stopAnimation() {
    if (this.animation){
      this.animation.stop();
      this.setState({opacityAnim: new Animated.Value(1.0)});
      this.animation = null;
    }
  }

  onWord = (word, pronounceAs) => {
    const categoryIndex = converseChain.indexOf(this.props.category);
    if (categoryIndex === converseChain.length - 1) {
      this.props.addWord(word, pronounceAs);
      const words = this.props.currentWordsPronounceAs.concat([pronounceAs || word])
      this.startAnimation()
      Tts.speak(words.join(' ')).then(()=>{
        this.reset();
      })
    } else {
      this.props.onWord(word, pronounceAs, converseChain[categoryIndex+1]);
    }
  }
  render() {
    let { opacityAnim } = this.state;
    const category = WordsCategories[this.props.category];
    const currentAction = converseChain.indexOf(this.props.category);
    const lastAction = currentAction == converseChain.length - 1;
    const words = this.props.currentWords;
    const message = this.props.currentWords.slice(0);

    for(let i=message.length; i < converseChain.length; ++i){
        message.push('_ _ _');
    }
    console.log('Render', opacityAnim._value, this.props.currentWordsPronounceAs, message);
    return (
      <View style={styles.container}>
        <SpeakButtonsPanel config={category} onPressAny={this.onWord} speakOnPress={!lastAction}/>
        <View style={styles.messageContainer}>
          <Animated.Text style={[styles.message, { opacity: opacityAnim }]}>{message.join('   ')}</Animated.Text>
          <Icon.Button
            name="close"
            color="#000000"
            backgroundColor="transparent"
            size={24}
            onPress={() => this.reset(true)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    category: state.converse.currentCategory,
    currentWords: state.converse.currentWords,
    currentWordsPronounceAs: state.converse.currentWordsPronounceAs,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addWord: (word, pronounceAs) => {
      dispatch(converseAddWord(word, pronounceAs));
    },
    onWord: (word, pronounceAs, newCategory) => {
      dispatch(converseAddWordChangeCategory(word, pronounceAs, newCategory));
    },
    clearWords: (newCategory) => {
      dispatch(converseClear(newCategory));
    }
  }
};

const ConverseScreenWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConverseScreen);

export default ConverseScreenWithState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  messageContainer: {
    flexDirection: 'row',

  },
  message: {
    flex: 1,
    color: 'grey',
    textAlign: 'center',
    padding: 2,
    fontSize: 24,
    fontWeight: '500',
  },
});
