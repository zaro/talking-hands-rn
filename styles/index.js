import { StyleSheet } from 'react-native';
import Platform from 'Platform';

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
        elevation: 4,
      }
    })
  },
};

export default styles;
