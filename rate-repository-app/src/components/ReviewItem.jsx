import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { format, parseISO } from 'date-fns';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
    },
    rating: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderWidth: 2,
        borderColor: '#0366d6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText: {
        color: '#0366d6',
    },
    review: {
        marginLeft: 10,
        flexShrink: 1,
    },
    username: {
        fontWeight: 'bold',
    },
    date: {
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        marginTop: 10,
    },
    buttonWrapper: {
        marginHorizontal: 5,
    },
});

const ReviewItem = ({ review, refetch }) => {
    const navigate = useNavigate();
    const [deleteReview] = useMutation(DELETE_REVIEW);

    const handleViewRepository = () => {
        navigate(`/repository/${review.repository.id}`);
    };

    const handleDeleteReview = () => {
        Alert.alert(
            'Delete Review',
            'Are you sure you want to delete this review?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteReview({ variables: { id: review.id } });
                            refetch();
                        } catch (e) {
                            console.error(e);
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.rating}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.review}>
                <Text style={styles.username}>{review.user ? review.user.username : 'Anonymous'}</Text>
                <Text style={styles.date}>{format(parseISO(review.createdAt), 'dd.MM.yyyy')}</Text>
                <Text>{review.text}</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Button title="View Repository" onPress={handleViewRepository} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button title="Delete Review" onPress={handleDeleteReview} color="red" />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ReviewItem;