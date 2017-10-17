export const CONVERSE_CHANGE_CATEGORY = 'CONVERSE_CHANGE_CATEGORY';
export const CONVERSE_ADD_WORD = 'CONVERSE_ADD_WORD';
export const CONVERSE_CLEAR = 'CONVERSE_CLEAR';


export function converseChangeCategory(category) {
  return { type: CONVERSE_CHANGE_CATEGORY, category }
}

export function converseAddWord(word, pronounseAs) {
  return { type: CONVERSE_ADD_WORD, word, pronounseAs }
}

export function converseClear() {
  return { type: CONVERSE_CLEAR }
}
