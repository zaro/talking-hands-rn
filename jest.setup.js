/* eslint-env jest */

jest.mock('react-native-tts', () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    speak: jest.fn(() => 1),
    stop: jest.fn(() => Promise.resolve(true)),
    voices: jest.fn(() => Promise.resolve([])),
    setDefaultLanguage: jest.fn(() => Promise.resolve('success')),
    setDefaultVoice: jest.fn(() => Promise.resolve('success')),
    setDefaultRate: jest.fn(() => Promise.resolve('success')),
    setDefaultPitch: jest.fn(() => Promise.resolve('success')),
  },
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

jest.mock('react-native-localize', () => ({
  getLocales: () => [
    {
      languageCode: 'en',
      countryCode: 'US',
      languageTag: 'en-US',
      isRTL: false,
    },
  ],
}));

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock'),
);
