import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        // Get the access token from the storage
        const token = await AsyncStorage.getItem(`${this.namespace}:token`);
        return token; // Return the token as is, no need to parse it
    }

    async setAccessToken(accessToken) {
        // Add the access token to the storage
        return await AsyncStorage.setItem(`${this.namespace}:token`, accessToken); // Store the token as is
    }

    async removeAccessToken() {
        // Remove the access token from the storage
        return await AsyncStorage.removeItem(`${this.namespace}:token`);
    }
}

export default AuthStorage;
