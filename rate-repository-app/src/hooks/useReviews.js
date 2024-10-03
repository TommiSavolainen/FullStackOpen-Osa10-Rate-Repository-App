import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (repositoryId, variables) => {
    const { data, loading, fetchMore, error } = useQuery(GET_REVIEWS, {
        variables: { id: repositoryId, ...variables },
        fetchPolicy: 'cache-and-network',
    });
    // console.log('data', data);
    const handleFetchMore = () => {
        if (loading) {
            // console.log('Loading data, please wait...');
            return;
        }

        if (!data || !data.repository || !data.repository.reviews || !data.repository.reviews.pageInfo) {
            // console.log('No data or pageInfo available');
            return;
        }

        const canFetchMore = data.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            // console.log('Cannot fetch more');
            return;
        }

        // console.log('Fetching more reviews...');
        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                id: repositoryId,
                ...variables,
            },
        });
    };

    return {
        reviews: data ? data.repository.reviews : undefined,
        fetchMore: handleFetchMore,
        loading,
        error,
    };
};

export default useReviews;
