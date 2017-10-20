export const CONVERSE_CHANGE_CATEGORY = 'CONVERSE_CHANGE_CATEGORY';
export const CONVERSE_ADD_WORD = 'CONVERSE_ADD_WORD';
export const CONVERSE_ADD_WORD_CHANGE_CATEGORY = 'CONVERSE_ADD_WORD_CHANGE_CATEGORY';
export const CONVERSE_CLEAR = 'CONVERSE_CLEAR';

export const SETTINGS_SET = 'SETTINGS_SET';
export const SETTINGS_CLEAR = 'SETTINGS_CLEAR'
export const SETTINGS_CLEAR_ALL = 'SETTINGS_CLEAR_ALL'

export function converseChangeCategory(category) {
  return { type: CONVERSE_CHANGE_CATEGORY, category }
}

export function converseAddWord(word, pronounceAs) {
  return { type: CONVERSE_ADD_WORD, word, pronounceAs }
}

export function converseAddWordChangeCategory(word, pronounceAs, category) {
  return { type: CONVERSE_ADD_WORD_CHANGE_CATEGORY, word, pronounceAs, category }
}

export function converseClear(category=null) {
  return { type: CONVERSE_CLEAR, category }
}

export function settingsSet(key, value) {
  return { type: SETTINGS_SET , key, value }
}

export function settingsClear(key) {
  return { type: SETTINGS_CLEAR , key }
}

export function settingsClearAll() {
  return { type: SETTINGS_CLEAR_ALL }
}
