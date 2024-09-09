import { ApolloClient, gql, useMutation, useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const SIGN_IN = gql`
    mutation authenticate($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(SIGN_IN);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { credentials: { username, password } } });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        await apolloClient.resetStore();
        return data;
    };

    return [signIn, result];
};

export default useSignIn;
