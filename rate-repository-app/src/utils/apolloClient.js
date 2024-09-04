import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
const createApolloClient = () => {
    return new ApolloClient({
        // uri: 'http://192.168.1.107:4000/graphql',
        uri: Constants.expoConfig.extra.APOLLO_URI,
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
