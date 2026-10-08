import Tts from 'react-native-tts';
import type {Store} from 'redux';

import type {RootState} from '../reducers';

type Settings = RootState['settings'];

type HandlerName = 'onStart' | 'onFinish' | 'onCancel';

type SpeakHandlers = {
  onStart: (() => void) | null;
  onFinish: () => void;
  onCancel: () => void;
};

export default class AppTts {
  static promises: Record<string, SpeakHandlers> = {};
  static receivedEvents: Record<string, HandlerName[]> = {};
  static store: Store<RootState> | null = null;
  static storeUnsubscribe: (() => void) | null = null;
  static currentSettings: Partial<Settings> = {};

  static init(store: Store<RootState>) {
    Tts.addEventListener('tts-start', ({utteranceId}) =>
      AppTts.onTtsStart(utteranceId),
    );
    Tts.addEventListener('tts-finish', ({utteranceId}) =>
      AppTts.onTtsFinish(utteranceId),
    );
    Tts.addEventListener('tts-progress', () => AppTts.onTtsProgress());
    Tts.addEventListener('tts-cancel', ({utteranceId}) =>
      AppTts.onTtsCancel(utteranceId),
    );

    AppTts.store = store;
    AppTts.storeUnsubscribe = store.subscribe(AppTts.handleStoreChange);
  }

  static handleStoreChange() {
    const previousSettings = AppTts.currentSettings;
    const currentSettings: Partial<Settings> =
      AppTts.store?.getState().settings ?? {};
    AppTts.currentSettings = currentSettings;

    if (previousSettings === currentSettings) {
      return;
    }
    if (
      currentSettings.speechLang &&
      previousSettings.speechLang !== currentSettings.speechLang
    ) {
      Tts.setDefaultLanguage(currentSettings.speechLang);
    }
    if (
      currentSettings.speechVoice &&
      previousSettings.speechVoice !== currentSettings.speechVoice
    ) {
      Tts.setDefaultVoice(currentSettings.speechVoice);
    }
    if (
      currentSettings.speechRate &&
      previousSettings.speechRate !== currentSettings.speechRate
    ) {
      Tts.setDefaultRate(currentSettings.speechRate);
    }
    if (
      currentSettings.speechPitch &&
      previousSettings.speechPitch !== currentSettings.speechPitch
    ) {
      Tts.setDefaultPitch(currentSettings.speechPitch);
    }
  }

  private static _handleEvent(
    utteranceId: string,
    eventHandlerName: HandlerName,
    postpone = true,
  ) {
    const remove = eventHandlerName === 'onFinish' || eventHandlerName === 'onCancel';
    const handlers = AppTts.promises[utteranceId];
    if (handlers) {
      handlers[eventHandlerName]?.();
      if (remove) {
        delete AppTts.promises[utteranceId];
      }
    } else if (postpone) {
      if (!AppTts.receivedEvents[utteranceId]) {
        AppTts.receivedEvents[utteranceId] = [];
      }
      if (!AppTts.receivedEvents[utteranceId].includes(eventHandlerName)) {
        AppTts.receivedEvents[utteranceId].push(eventHandlerName);
      }
    }
  }

  static onTtsStart(utteranceId: string | number) {
    AppTts._handleEvent(String(utteranceId), 'onStart');
  }

  static onTtsFinish(utteranceId: string | number) {
    AppTts._handleEvent(String(utteranceId), 'onFinish');
  }

  static onTtsCancel(utteranceId: string | number) {
    AppTts._handleEvent(String(utteranceId), 'onCancel');
  }

  static onTtsProgress() {}

  static speak(
    text: string,
    onStart: (() => void) | null = null,
  ): Promise<string | number> {
    return new Promise((resolve, reject) => {
      try {
        // react-native-tts 4.x returns the utterance id synchronously.
        const utteranceId = Tts.speak(text);
        const key = String(utteranceId);
        AppTts.promises[key] = {
          onStart,
          onFinish: () => resolve(utteranceId),
          onCancel: () => resolve(utteranceId),
        };
        const postponed = AppTts.receivedEvents[key];
        if (postponed) {
          for (const event of postponed) {
            AppTts._handleEvent(key, event, false);
          }
          delete AppTts.receivedEvents[key];
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  static stop() {
    return Tts.stop();
  }

  static voices() {
    return Tts.voices();
  }
}
