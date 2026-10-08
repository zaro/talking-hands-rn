import {I18n} from 'i18n-js';
import {getLocales} from 'react-native-localize';

import bg from './locales/bg';
import en from './locales/en';

const i18n = new I18n({en, bg});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';

const deviceLocale = getLocales()[0]?.languageCode;
if (deviceLocale) {
  i18n.locale = deviceLocale;
}

export default i18n;
