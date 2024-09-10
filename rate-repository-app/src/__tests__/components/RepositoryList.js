import { render } from '@testing-library/react-native';
import { FlatList, View, Text, Image } from 'react-native';

const RepositoryListContainer = ({ repositories }) => {
    return <FlatList data={repositories.edges} renderItem={({ item }) => <RepositoryItem repository={item.node} />} keyExtractor={(item) => item.node.id} />;
};

const RepositoryItem = ({ repository }) => {
    return (
        <View>
            <Text testID="fullName">{repository.fullName}</Text>
            <Text>{repository.description}</Text>
            <Text>{repository.language}</Text>
            <Text>{repository.forksCount}</Text>
            <Text>{repository.stargazersCount}</Text>
            <Text>{repository.ratingAverage}</Text>
            <Text>{repository.reviewCount}</Text>
            <Image source={{ uri: repository.ownerAvatarUrl }} style={{ width: 50, height: 50 }} />
        </View>
    );
};

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };

            // Add your test code here
            const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
            const firstRepository = repositories.edges[0].node;
            const secondRepository = repositories.edges[1].node;

            expect(getAllByTestId('fullName')[0]).toHaveTextContent(firstRepository.fullName);
            expect(getAllByTestId('fullName')[1]).toHaveTextContent(secondRepository.fullName);
        });
    });
});
