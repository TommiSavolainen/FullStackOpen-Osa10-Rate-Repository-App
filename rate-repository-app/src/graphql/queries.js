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

export const GET_REVIEWS = gql`
    query Repository($id: ID!, $first: Int, $after: String) {
        repository(id: $id) {
            id
            fullName
            reviews(first: $first, after: $after) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation CreateReview($review: CreateReviewInput) {
        createReview(review: $review) {
            id
            repositoryId
            userId
            rating
            createdAt
            text
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput) {
        createUser(user: $user) {
            id
            reviewCount
            username
            createdAt
        }
    }
`;
