import { format, parseISO } from 'date-fns';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
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
    });
const ReviewItem = ({ review }) => {
  return (

    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.review}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{format(parseISO(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;