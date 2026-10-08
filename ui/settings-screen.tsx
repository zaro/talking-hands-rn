import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-picker/picker';
import {connect} from 'react-redux';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import LocaleCode from 'iso-639-1';

import AppStyles from '../styles';
import Touchable from './components/touchable';
import CheckBox from './components/checkbox';
import Tts from '../tts';
import I18n from '../i18n';
import {
  settingsSet,
  settingsClear,
  settingsClearAll,
} from '../reducers/actions';
import type {RootState} from '../reducers';
import type {RootStackParamList} from '../navigators/app-navigator';

type VoiceItem = {
  id: string | null;
  name: string;
};

const defaultVoice: VoiceItem = {
  id: null,
  name: I18n.t('default'),
};

const overrideLangCodes: Record<string, string> = {
  bul: 'bg',
};

type OwnProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
type StateProps = RootState['settings'];
type DispatchProps = {
  settingsSet: (key: string, value: unknown) => void;
  settingsClear: (key: string) => void;
  settingsClearAll: () => void;
};
type Props = OwnProps & StateProps & DispatchProps;
type State = {
  voices: VoiceItem[];
};

class SettingsScreen extends React.Component<Props, State> {
  state: State = {
    voices: [defaultVoice],
  };

  componentDidMount() {
    Tts.voices()
      .then(voicesList => {
        const voices: VoiceItem[] = [defaultVoice];
        for (const voice of voicesList) {
          const langCodeFull =
            overrideLangCodes[voice.language] ?? voice.language;
          const langCode = langCodeFull.split('-')[0];
          const langName = LocaleCode.getNativeName(langCode) || langCode;
          voices.push({
            id: voice.id,
            name: `${voice.name} (${langName})`,
          });
        }
        this.setState({voices});
      })
      .catch(e => {
        Alert.alert('Error', 'Failed to get list of system languages');
        console.error(e);
      });
  }

  resetDefaultSettings = () => {
    Alert.alert(
      I18n.t('reset_settings'),
      I18n.t('reset_message'),
      [
        {text: I18n.t('cancel')},
        {text: I18n.t('ok'), onPress: () => this.props.settingsClearAll()},
      ],
      {cancelable: true},
    );
  };

  render() {
    const props = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.title}>{I18n.t('voice')}</Text>
          <Picker
            selectedValue={props.speechVoice ?? undefined}
            onValueChange={itemValue => {
              props.settingsSet('speechVoice', itemValue);
            }}>
            {this.state.voices.map((voice, idx) => (
              <Picker.Item
                label={voice.name}
                value={voice.id ?? ''}
                key={idx}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>{I18n.t('speech_rate')}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.01}
            maximumValue={0.99}
            step={0.05}
            value={props.speechRate || 0.5}
            onSlidingComplete={v => props.settingsSet('speechRate', v)}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>{I18n.t('speech_pitch')}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2.0}
            step={0.1}
            value={props.speechPitch || 1.0}
            onSlidingComplete={v => props.settingsSet('speechPitch', v)}
          />
        </View>
        <View style={styles.itemCheckbox}>
          <Text style={styles.title}>{I18n.t('speak_on_word_press')}</Text>
          <CheckBox
            onValueChange={v => props.settingsSet('speakWordOnPress', v)}
            value={props.speakWordOnPress}
          />
        </View>
        <Touchable style={styles.item} onPress={this.resetDefaultSettings}>
          <Text style={styles.title}>{I18n.t('reset_settings')}</Text>
        </Touchable>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return state.settings;
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    settingsSet: (key: string, value: unknown) => {
      dispatch(settingsSet(key, value));
    },
    settingsClear: (key: string) => {
      dispatch(settingsClear(key));
    },
    settingsClearAll: () => {
      dispatch(settingsClearAll());
    },
  };
};

const SettingsScreenWithState = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen);

export default SettingsScreenWithState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    ...AppStyles.appBackground,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  itemCheckbox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  slider: {
    margin: 5,
  },
});
