import { View, Text, Image } from 'react-native';
const RepositoryItem = (props) => {
    console.log(props);
    if (!props) {
        return null;
    }
    return (
        <View>
        <Text>Full name: {props.fullName}</Text>
        <Text>Description: {props.description}</Text>
        <Text>Language: {props.language}</Text>
        <Text>Stars: {props.stargazersCount}</Text>
        <Text>Forks: {props.forksCount}</Text>
        <Text>Reviews: {props.reviewCount}</Text>
        <Text>Rating: {props.ratingAverage}</Text>
        <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: props.ownerAvatarUrl }}
        />
        </View>
    );
    };

export default RepositoryItem;