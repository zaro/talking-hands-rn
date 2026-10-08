import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import I18n from '../i18n';
import {
  converseAddWord,
  converseAddWordChangeCategory,
  converseClear,
} from '../reducers/actions';
import AppStyles from '../styles';
import SpeakButtonsPanel from './components/speak-buttons-panel';
import WordsCategories from '../data/words-categories';
import Tts from '../tts';
import type {RootState} from '../reducers';
import type {RootStackParamList} from '../navigators/app-navigator';

const converseChain = ['verb', 'noun'];

type OwnProps = NativeStackScreenProps<RootStackParamList, 'Conversation'>;

type StateProps = {
  category: string;
  currentWords: string[];
  currentWordsPronounceAs: string[];
  speakWordOnPress: boolean;
};

type DispatchProps = {
  addWord: (word: string, pronounceAs?: string) => void;
  onWord: (
    word: string,
    pronounceAs: string | undefined,
    category: string,
  ) => void;
  clearWords: (category: string) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  opacityAnim: Animated.Value;
};

class ConverseScreen extends React.Component<Props, State> {
  state: State = {
    opacityAnim: new Animated.Value(1.0),
  };

  private animation: Animated.CompositeAnimation | null = null;

  reset = (stopSpeaking = false) => {
    if (stopSpeaking) {
      Tts.stop();
    }
    this.stopAnimation();
    this.props.clearWords(converseChain[0]);
  };

  startAnimation() {
    this.animation = Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.opacityAnim, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.opacityAnim, {
          toValue: 1.0,
          useNativeDriver: true,
        }),
      ]),
    );
    this.animation.start();
  }

  stopAnimation() {
    if (this.animation) {
      this.animation.stop();
      this.setState({opacityAnim: new Animated.Value(1.0)});
      this.animation = null;
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  onWord = (word: string, pronounceAs?: string) => {
    const categoryIndex = converseChain.indexOf(this.props.category);
    if (categoryIndex === converseChain.length - 1) {
      this.props.addWord(word, pronounceAs);
      const words = this.props.currentWordsPronounceAs.concat([
        pronounceAs || word,
      ]);
      this.startAnimation();
      Tts.speak(words.join(' ')).then(() => {
        this.reset();
      });
    } else {
      this.props.onWord(word, pronounceAs, converseChain[categoryIndex + 1]);
    }
  };

  render() {
    const {opacityAnim} = this.state;
    const category = WordsCategories[
      this.props.category as keyof typeof WordsCategories
    ];
    const currentAction = converseChain.indexOf(this.props.category);
    const lastAction = currentAction === converseChain.length - 1;
    const message = this.props.currentWords.slice(0);

    for (let i = message.length; i < converseChain.length; ++i) {
      message.push('_ _ _');
    }

    const speakOnPress = this.props.speakWordOnPress ? !lastAction : false;

    return (
      <View style={styles.container}>
        <SpeakButtonsPanel
          config={category}
          onPressAny={this.onWord}
          speakOnPress={speakOnPress}
        />
        <View style={styles.messageContainer}>
          <Animated.Text style={[styles.message, {opacity: opacityAnim}]}>
            {message.join('   ')}
          </Animated.Text>
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

const mapStateToProps = (state: RootState): StateProps => {
  return {
    category: state.converse.currentCategory,
    currentWords: state.converse.currentWords,
    currentWordsPronounceAs: state.converse.currentWordsPronounceAs,
    speakWordOnPress: state.settings.speakWordOnPress,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    addWord: (word: string, pronounceAs?: string) => {
      dispatch(converseAddWord(word, pronounceAs));
    },
    onWord: (
      word: string,
      pronounceAs: string | undefined,
      newCategory: string,
    ) => {
      dispatch(converseAddWordChangeCategory(word, pronounceAs, newCategory));
    },
    clearWords: (newCategory: string) => {
      dispatch(converseClear(newCategory));
    },
  };
};

const ConverseScreenWithState = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps,
)(ConverseScreen);

export default ConverseScreenWithState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    ...AppStyles.appBackground,
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
