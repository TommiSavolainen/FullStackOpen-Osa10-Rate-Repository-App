import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import Text from './Text';
import * as Linking from 'expo-linking';

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
    if (num === undefined) {
        return 'N/A';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
};

const RepositoryItem = ({ repository, showGitHubButton }) => {
    if (!repository) {
        return null;
    }
    return (
        <View style={styles.container} role='none'>
            <View style={styles.header} role='none'>
                <Image
                    style={styles.image}
                    source={{ uri: repository.ownerAvatarUrl }}
                    role="img"
                />
                <View style={styles.textContainer}>
                    <Text fontWeight="bold">{repository.fullName}</Text>
                    <Text color="textSecondary">{repository.description}</Text>
                    <Text style={styles.language}>{repository.language}</Text>
                </View>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text fontWeight="bold">{formatNumber(repository.stargazersCount)}</Text>
                    <Text color="textSecondary">Stars</Text>
                </View>
                <View style={styles.statItem}>
                    <Text fontWeight="bold">{formatNumber(repository.forksCount)}</Text>
                    <Text color="textSecondary">Forks</Text>
                </View>
                <View style={styles.statItem}>
                    <Text fontWeight="bold">{formatNumber(repository.reviewCount)}</Text>
                    <Text color="textSecondary">Reviews</Text>
                </View>
                <View style={styles.statItem}>
                    <Text fontWeight="bold">{formatNumber(repository.ratingAverage)}</Text>
                    <Text color="textSecondary">Rating</Text>
                </View>
            </View>
            {showGitHubButton && (
                <Button
                    title="Open in GitHub"
                    onPress={() => Linking.openURL(repository.url)}
                />
            )}
        </View>
    );
};

export default RepositoryItem;