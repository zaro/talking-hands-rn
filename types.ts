import type {ImageSourcePropType} from 'react-native';

export type WordEntry = {
  word: string;
  pronounce_as?: string;
  img?: ImageSourcePropType;
};

export type WordsConfig = Record<string, WordEntry>;

export type Lesson = {
  name: string;
};
