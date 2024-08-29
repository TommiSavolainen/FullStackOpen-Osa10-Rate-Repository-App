import { View, StyleSheet } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBarBackground.backgroundColor,
    // ...
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}><Text style={{padding: 10}} color="textWhite" fontSize="subheading" fontWeight="bold">Repositories</Text></View>;
};

export default AppBar;