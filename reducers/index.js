import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';


import * as actions from './actions';
import * as defaults from './defaults'

function converse(state = defaults.converseState, action) {
  switch (action.type) {
    case actions.CONVERSE_CHANGE_CATEGORY:
      return { ...state, currentCategory: action.category };
    case actions.CONVERSE_ADD_WORD:
      return {
        ...state,
        currentWords: state.currentWords.concat([action.word]),
        currentWordsPronounceAs: state.currentWordsPronounceAs.concat([action.pronounceAs || action.word])
      };
    case actions.CONVERSE_ADD_WORD_CHANGE_CATEGORY:
      return {
        ...state,
        currentWords: state.currentWords.concat([action.word]),
        currentWordsPronounceAs: state.currentWordsPronounceAs.concat([action.pronounceAs || action.word]) ,
        currentCategory: action.category,
      };
    case actions.CONVERSE_CLEAR:
      return { ...state, currentCategory: action.category || defaults.startingCategory, currentWords: [], currentWordsPronounceAs:[] };
    default:
      return state;
  }
}

function settings(state = defaults.settings, action) {
  let newState;
  switch (action.type) {
    case actions.SETTINGS_SET:
      newState = { ...state };
      newState[action.key] = action.value;
      return newState;
    case actions.SETTINGS_REPLACE:
      return action.settings;
    case actions.SETTINGS_CLEAR:
      newState = { ...state };
      delete newState[action.key];
      return newState;
    case actions.SETTINGS_CLEAR_ALL:
      return defaults.settings;
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  converse,
  settings,
});

export default AppReducer;
