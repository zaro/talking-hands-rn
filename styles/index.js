import { StyleSheet } from 'react-native';
import {Platform} from 'react-native';

const styles = {
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
        // Opaque fill (same as the app background) stops the elevation shadow
        // from bleeding through the transparent button, so it reads as a tight
        // outer shadow instead of a wide dark frame inside the button.
        backgroundColor: '#F5FCFF',
        elevation: 2,
      }
    })
  },
};

export default styles;
