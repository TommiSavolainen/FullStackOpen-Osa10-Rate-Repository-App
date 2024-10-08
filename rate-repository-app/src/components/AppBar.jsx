import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBarBackground.backgroundColor,
    flexDirection: 'row',
  },
  tab: {
    padding: 10,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  const createReview = () => {
    console.log('create review');
    navigate('/createreview');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/" role="link">
            <Text style={styles.tab} color="textWhite" fontSize="subheading" fontWeight="bold">Repositories</Text>
          </Link>
        </Pressable>
        {data?.me ? (
          <>
            <Pressable>
              <Link to="/createreview" role="link">
                <Text style={styles.tab} color="textWhite" fontSize="subheading" fontWeight="bold">Create a review</Text>
              </Link>
            </Pressable>
            <Pressable>
              <Link to="/myreviews" role="link">
                <Text style={styles.tab} color="textWhite" fontSize="subheading" fontWeight="bold">My reviews</Text>
              </Link>
            </Pressable>
            <Pressable onPress={signOut}>
              <Text style={styles.tab} color="textWhite" fontSize="subheading" fontWeight="bold">Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
          <Pressable>
            <Link to="/signin" role="link">
              <Text style={styles.tab} color="textWhite" fontSize="subheading" fontWeight="bold">Sign in</Text>
            </Link>
          </Pressable>
          <Pressable>
            <Link to="/signup" role="link">
              <Text style={styles.tab} color="textWhite" fontSize="subheading" fontWeight="bold">Sign up</Text>
            </Link>
          </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;