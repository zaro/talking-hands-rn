import type {Settings} from './defaults';

export const CONVERSE_CHANGE_CATEGORY = 'CONVERSE_CHANGE_CATEGORY';
export const CONVERSE_ADD_WORD = 'CONVERSE_ADD_WORD';
export const CONVERSE_ADD_WORD_CHANGE_CATEGORY =
  'CONVERSE_ADD_WORD_CHANGE_CATEGORY';
export const CONVERSE_CLEAR = 'CONVERSE_CLEAR';

export const SETTINGS_SET = 'SETTINGS_SET';
export const SETTINGS_REPLACE = 'SETTINGS_REPLACE';
export const SETTINGS_CLEAR = 'SETTINGS_CLEAR';
export const SETTINGS_CLEAR_ALL = 'SETTINGS_CLEAR_ALL';

export type ConverseAction =
  | {type: typeof CONVERSE_CHANGE_CATEGORY; category: string}
  | {type: typeof CONVERSE_ADD_WORD; word: string; pronounceAs?: string}
  | {
      type: typeof CONVERSE_ADD_WORD_CHANGE_CATEGORY;
      word: string;
      pronounceAs?: string;
      category: string;
    }
  | {type: typeof CONVERSE_CLEAR; category: string | null};

export type SettingsAction =
  | {type: typeof SETTINGS_SET; key: string; value: unknown}
  | {type: typeof SETTINGS_REPLACE; settings: Settings}
  | {type: typeof SETTINGS_CLEAR; key: string}
  | {type: typeof SETTINGS_CLEAR_ALL};

export type Action = ConverseAction | SettingsAction;

export function converseChangeCategory(category: string): ConverseAction {
  return {type: CONVERSE_CHANGE_CATEGORY, category};
}

export function converseAddWord(
  word: string,
  pronounceAs?: string,
): ConverseAction {
  return {type: CONVERSE_ADD_WORD, word, pronounceAs};
}

export function converseAddWordChangeCategory(
  word: string,
  pronounceAs: string | undefined,
  category: string,
): ConverseAction {
  return {type: CONVERSE_ADD_WORD_CHANGE_CATEGORY, word, pronounceAs, category};
}

export function converseClear(category: string | null = null): ConverseAction {
  return {type: CONVERSE_CLEAR, category};
}

export function settingsSet(key: string, value: unknown): SettingsAction {
  return {type: SETTINGS_SET, key, value};
}

export function settingsReplace(settings: Settings): SettingsAction {
  return {type: SETTINGS_REPLACE, settings};
}

export function settingsClear(key: string): SettingsAction {
  return {type: SETTINGS_CLEAR, key};
}

export function settingsClearAll(): SettingsAction {
  return {type: SETTINGS_CLEAR_ALL};
}
