import { gql } from '@apollo/client';

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;

export const GET_REPOSITORY = gql`
    query Repository($id: ID!) {
        repository(id: $id) {
            id
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            ownerAvatarUrl
            url
        }
    }
`;
