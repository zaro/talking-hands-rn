import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/app-navigator';

import * as actions from './actions';

const tutorScreenAction = AppNavigator.router.getActionForPathAndParams('Tutor');
const converseScreenAction = AppNavigator.router.getActionForPathAndParams('Conversation');
const initialNavState = AppNavigator.router.getStateForAction(converseScreenAction);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const converseState = { currentCategory: 'verb', currentWords: [] };

function converse(state = converseState, action) {
  switch (action.type) {
    case actions.CONVERSE_CHANGE_CATEGORY:
      return { ...state, currentCategory: action.category };
    case actions.CONVERSE_ADD_WORD:
      return { ...state, currentWords: state.currentWords.concat([action.word]) };
    case actions.CONVERSE_CLEAR:
      return { ...state, currentWords: [] };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  converse,
});

export default AppReducer;
