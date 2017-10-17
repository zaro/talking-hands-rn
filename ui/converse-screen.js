import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {
  converseAddWord,
  converseChangeCategory,
  converseClear,
} from '../reducers/actions';

import SpeakButtonsPanel from './components/speak-buttons-panel';
import WordsCategories from '../data/words-categories';
import Tts from 'react-native-tts';

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
    title: 'Converse',
  };

  onWord = (word, pronounceAs) => {
    const categoryIndex = converseChain.indexOf(this.props.category);
    if (categoryIndex === converseChain.length - 1) {
      const words = this.props.currentWords.concat([pronounceAs || word])
      Tts.speak(words.join(' '));
      this.props.clearWords(converseChain[0]);
    } else {
      this.props.onWord(word, pronounceAs, converseChain[categoryIndex+1]);
    }
  }
  render() {
    const category = WordsCategories[this.props.category];
    const currentAction = converseChain.indexOf(this.props.category);
    const lastAction = currentAction == converseChain.length - 1;
    const words = this.props.currentWords;
    let message = ''

    for(let i=0; i < converseChain.length; ++i){
        if( i < currentAction ) {
          message += words[i] + ' ';
        } else {
          message += '?';
        }
    }

    return (
      <View style={styles.container}>
        <SpeakButtonsPanel config={category} onPressAny={this.onWord} speakOnPress={!lastAction}/>
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    category: state.converse.currentCategory,
    currentWords: state.converse.currentWords,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onWord: (word, pronounceAs, newCategory) => {
      dispatch(converseAddWord(word, pronounceAs));
      dispatch(converseChangeCategory(newCategory));
    },
    clearWords: (newCategory) => {
      dispatch(converseClear());
      dispatch(converseChangeCategory(newCategory));
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  message: {
    color: 'grey',
    textAlign: 'center',
    padding: 2,
    fontSize: 18
  }
});
