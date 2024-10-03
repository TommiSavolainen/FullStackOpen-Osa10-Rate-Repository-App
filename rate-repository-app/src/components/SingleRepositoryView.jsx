import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    separator: {
        height: 10,
        backgroundColor: 'lightgray',
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
    const { id } = useParams();
    const { repository, loading: repoLoading, error: repoError } = useRepository(id);
    const [first, setFirst] = useState(3);
    const { reviews, fetchMore, loading: reviewsLoading, error: reviewsError } = useReviews(id, { first });

    if (repoLoading || reviewsLoading) return <Text>Loading...</Text>;
    if (repoError || reviewsError) return <Text>Error: {repoError?.message || reviewsError?.message}</Text>;

    const reviewNodes = reviews ? reviews.edges.map(edge => edge.node) : [];

    const onEndReach = () => {
        // console.log('End reached, fetching more reviews...');
        fetchMore();
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={reviewNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <ReviewItem review={item} />
                )}
                keyExtractor={({ id }) => id}
                ListHeaderComponent={() => (
                    <RepositoryItem repository={repository} />
                )}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

export default SingleRepositoryView;