import Constants from 'expo-constants';
import RepositoryList from './RepositoryList';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log('AppBar pressed')}>
      <AppBar />
      </Pressable>
        <RepositoryList />
    </View>
  );
};

export default Main;