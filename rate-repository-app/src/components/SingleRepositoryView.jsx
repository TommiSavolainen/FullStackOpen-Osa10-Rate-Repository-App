// SingleRepositoryView.jsx
import React from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, Button, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import * as Linking from 'expo-linking';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        margin: 10,
    },
});

const SingleRepositoryView = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_REPOSITORY, {
        variables: { id },
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const repository = data.repository;

    return (
        <View style={styles.container}>
            <RepositoryItem {...repository} showGitHubButton />
            {/* <Button
                style={styles.button}
                title="Open in GitHub"
                onPress={() => Linking.openURL(repository.url)}
            /> */}
        </View>
    );
};

export default SingleRepositoryView;