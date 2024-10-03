import React from 'react';
import { useQuery } from '@apollo/client';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { ME } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { data, loading, error, refetch } = useQuery(ME, {
        variables: { includeReviews: true },
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const reviews = data.me.reviews.edges.map(edge => edge.node);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default MyReviews;