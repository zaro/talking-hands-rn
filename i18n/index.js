import I18n from 'react-native-i18n';
import en from './locales/en';
import bg from './locales/bg';

I18n.fallbacks = true;

I18n.translations = {
  en,
  bg,
};

export default I18n;
