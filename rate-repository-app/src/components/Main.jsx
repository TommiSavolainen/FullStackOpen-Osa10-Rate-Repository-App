import Constants from 'expo-constants';
import RepositoryList from './RepositoryList';
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import AppBar from './AppBar';
import SingleRepositoryView from './SingleRepositoryView';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

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
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<ScrollView><SignIn /></ScrollView>} />
        <Route path="/signup" element={<ScrollView><SignUp /></ScrollView>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repository/:id" element={<SingleRepositoryView />} />
        <Route path="/createreview" element={<ScrollView><CreateReview /></ScrollView>} />
      </Routes>
    </View>
  );
};

export default Main;