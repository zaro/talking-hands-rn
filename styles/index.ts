import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  appBackground: {
    backgroundColor: '#F5FCFF',
  },
  buttonBorder: {
    padding: 8,
    borderRadius: 10,
    borderColor: '#AAAAAA',
    ...Platform.select({
      ios: {
        borderWidth: 3,
      },
      android: {
        // Opaque fill stops the elevation shadow from bleeding through the
        // transparent button; a low elevation + soft theme shadow alphas keep
        // the shadow subtle on modern Android.
        backgroundColor: '#F5FCFF',
        elevation: 2,
      },
    }),
  },
});

export default styles;
