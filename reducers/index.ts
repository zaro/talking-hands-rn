import {combineReducers} from 'redux';

import * as actions from './actions';
import * as defaults from './defaults';
import type {Action} from './actions';
import type {ConverseState, Settings} from './defaults';

function converse(
  state: ConverseState = defaults.converseState,
  action: Action,
): ConverseState {
  switch (action.type) {
    case actions.CONVERSE_CHANGE_CATEGORY:
      return {...state, currentCategory: action.category};
    case actions.CONVERSE_ADD_WORD:
      return {
        ...state,
        currentWords: state.currentWords.concat([action.word]),
        currentWordsPronounceAs: state.currentWordsPronounceAs.concat([
          action.pronounceAs || action.word,
        ]),
      };
    case actions.CONVERSE_ADD_WORD_CHANGE_CATEGORY:
      return {
        ...state,
        currentWords: state.currentWords.concat([action.word]),
        currentWordsPronounceAs: state.currentWordsPronounceAs.concat([
          action.pronounceAs || action.word,
        ]),
        currentCategory: action.category,
      };
    case actions.CONVERSE_CLEAR:
      return {
        ...state,
        currentCategory: action.category || defaults.startingCategory,
        currentWords: [],
        currentWordsPronounceAs: [],
      };
    default:
      return state;
  }
}

function settings(
  state: Settings = defaults.settings,
  action: Action,
): Settings {
  let newState: Settings;
  switch (action.type) {
    case actions.SETTINGS_SET:
      newState = {...state};
      return {...newState, [action.key]: action.value} as Settings;
    case actions.SETTINGS_REPLACE:
      return action.settings;
    case actions.SETTINGS_CLEAR:
      newState = {...state};
      delete (newState as Record<string, unknown>)[action.key];
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

export type RootState = ReturnType<typeof AppReducer>;

export default AppReducer;
