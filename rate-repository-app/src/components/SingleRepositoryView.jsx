// SingleRepositoryView.jsx
import React from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, Button, StyleSheet, Text, FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import { GET_REVIEWS } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import * as Linking from 'expo-linking';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        margin: 10,
    },
    separator: {
        height: 10,
        backgroundColor: 'lightgray',
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
    const { id } = useParams();
    console.log(id);
    const { data, loading, error } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id },
    });
    console.log(data);
    const { data: reviewData, loading: reviewLoading, error: reviewError } = useQuery(GET_REVIEWS, {
        variables: { id, first: data?.repository.reviewCount},
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    if (reviewLoading) return <Text>Loading reviews...</Text>;
    if (reviewError) return <Text>Error: {reviewError.message}</Text>;

    const repository = data.repository;
    const reviews = reviewData.repository.reviews.edges.map(edge => edge.node);
    console.log(reviews);
    return (
        <View style={styles.container}>
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item} />}
                keyExtractor={({ id }) => id}
                ItemSeparatorComponent={ItemSeparator}
                ListHeaderComponent={() => <RepositoryItem {...repository} showGitHubButton />}
            />
        </View>
    );
};

export default SingleRepositoryView;