import { gql, useMutation } from '@apollo/client';

const SIGN_IN = gql`
    mutation authenticate($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);

    const signIn = async ({ username, password }) => {
        // console.log('Calling signIn with:', { username, password }); // Debugging statement
        const { data } = await mutate({ variables: { credentials: { username, password } } });
        // console.log('Mutation result:', data); // Debugging statement
        return data;
    };

    return [signIn, result];
};

export default useSignIn;
