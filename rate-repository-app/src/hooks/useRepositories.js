import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    id
                    ownerName
                    name
                    createdAt
                    fullName
                    ratingAverage
                    reviewCount
                    stargazersCount
                    watchersCount
                    forksCount
                    openIssuesCount
                    url
                    ownerAvatarUrl
                    description
                    language
                    userHasReviewed
                }
            }
        }
    }
`;

const useRepositories = () => {
    const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });

    if (error) {
        console.error('Error fetching repositories:', error);
    }

    const repositories = data ? data.repositories : undefined;

    return { repositories, loading, refetch };
};

export default useRepositories;
