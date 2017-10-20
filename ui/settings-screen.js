import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Slider,
  Picker,
  CheckBox,
  TouchableNativeFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Platform from 'Platform';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyles from '../styles';
import Touchable from './components/touchable';
import Tts from '../tts';
import LocaleCode from 'iso-639-1';

import {
  settingsSet,
  settingsClear,
  settingsClearAll
} from '../reducers/actions';

const defaultVoice = {
  id: null,
  name: 'Default',
}

const overrideLangCodes = {
  'bul': 'bg',
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    voices: [defaultVoice]
  }

  componentWillMount() {
    Tts.voices().then(voicesList => {
      const voices = [defaultVoice];
      for(let voice of voicesList) {
        const langCodeFull = (voice.language in overrideLangCodes)
          ? overrideLangCodes[voice.language]
          : voice.language;
        const langCode = langCodeFull.split('-')[0];
        const langName = LocaleCode.getNativeName(langCode) || langCode;
        voices.push({
          id: voice.id,
          name: `${voice.name} (${langName})`,
        });
      }
      this.setState({voices})
    }).catch(e => {
      Alert.alert( 'Error', 'Failed to get list of system languages' );
      console.error(e);
    });
  }

  resetDefaultSettings = () => {
    console.log('RESET');
    Alert.alert(
      'Reset settings',
      'This will reset all values to their defaults. You need to restart the app for the voice change to take effect.',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => this.props.settingsClearAll()},
      ],
      { cancelable: true }
    );

  }

  render() {
    const props = this.props;
    console.log(this.state.languages);
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.title}>Voice Name</Text>
          <Picker
            selectedValue={props.speechVoice}
            onValueChange={(itemValue, itemIndex) => {props.settingsSet('speechVoice', itemValue)}}>
            {this.state.voices.map((voice, idx) =>
              <Picker.Item label={voice.name} value={voice.id} key={idx}/>
            )}
          </Picker>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Speech Rate</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.01}
            maximumValue={0.99}
            step={0.05}
            value={props.speechRate || 0.5}
            onSlidingComplete={(v) => props.settingsSet('speechRate', v)}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Speech Pitch</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2.0}
            step={0.1}
            value={props.speechPitch || 1.0}
            onSlidingComplete={(v) => props.settingsSet('speechPitch', v)}
          />
        </View>
        <View style={styles.itemCheckbox}>
          <Text style={styles.title}>Say word on press</Text>
          <CheckBox
            onValueChange={(v) => props.settingsSet('speakWordOnPress', v)}
            value={props.speakWordOnPress}
          />
        </View>
        <Touchable style={styles.item} onPress={this.resetDefaultSettings}>
          <Text style={styles.title}>Reset to default settings</Text>
        </Touchable>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state.settings;
};

const mapDispatchToProps = dispatch => {
  return {
    settingsSet: (key, value) => {
      dispatch(settingsSet(key, value));
    },
    settingsClear: (key) => {
      dispatch(settingsClear(key));
    },
    settingsClearAll: () => {
      dispatch(settingsClearAll());
    },
  }
};

const SettingsScreenWithState = connect(
  mapStateToProps,
  mapDispatchToProps
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
  }
});
