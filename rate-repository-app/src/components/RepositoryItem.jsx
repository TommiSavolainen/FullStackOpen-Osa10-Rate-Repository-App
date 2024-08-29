import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        flexGrow: 1,
    },
    language: {
        backgroundColor: '#0069d4',
        color: 'white',
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    statsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

const formatNumber = (num) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
};

const RepositoryItem = (props) => {
    console.log(props);
    if (!props) {
        return null;
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.image}
                    source={{ uri: props.ownerAvatarUrl }}
                />
                <View style={styles.textContainer}>
                    <Text fontWeight="bold">{props.fullName}</Text>
                    <Text color="textSecondary">{props.description}</Text>
                    <Text style={styles.language}>{props.language}</Text>
                </View>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text fontWeight="bold">{formatNumber(props.stargazersCount)}</Text>
                    <Text color="textSecondary">Stars</Text>
                </View>
                <View style={styles.statItem}>
                    <Text fontWeight="bold">{formatNumber(props.forksCount)}</Text>
                    <Text color="textSecondary">Forks</Text>
                </View>
                <View style={styles.statItem}>
                    <Text fontWeight="bold">{formatNumber(props.reviewCount)}</Text>
                    <Text color="textSecondary">Reviews</Text>
                </View>
                <View style={styles.statItem}>
                    <Text fontWeight="bold">{formatNumber(props.ratingAverage)}</Text>
                    <Text color="textSecondary">Rating</Text>
                </View>
            </View>
        </View>
    );
};

export default RepositoryItem;