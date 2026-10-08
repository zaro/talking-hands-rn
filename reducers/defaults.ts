export const startScreen = 'Conversation';
export const startingCategory = 'verb';

export type ConverseState = {
  currentCategory: string;
  currentWords: string[];
  currentWordsPronounceAs: string[];
};

export type Settings = {
  speechLang: string | null;
  speechVoice: string | null;
  speechRate: number | null;
  speechPitch: number | null;
  speakWordOnPress: boolean;
};

export const converseState: ConverseState = {
  currentCategory: startingCategory,
  currentWords: [],
  currentWordsPronounceAs: [],
};

export const settings: Settings = {
  speechLang: null,
  speechVoice: null,
  speechRate: null,
  speechPitch: null,
  speakWordOnPress: true,
};
