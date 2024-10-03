import { gql } from '@apollo/client';

export const ME = gql`
    query me($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
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
                        repository {
                            id
                            fullName
                        }
                    }
                }
            }
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

export const GET_REPOSITORIES = gql`
    query GetRepositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            totalCount
            edges {
                node {
                    id
                    fullName
                    description
                    language
                    forksCount
                    stargazersCount
                    ratingAverage
                    reviewCount
                    ownerAvatarUrl
                    createdAt
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`;

export const GET_REVIEWS = gql`
    query GetReviews($id: ID!, $first: Int, $after: String) {
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
                pageInfo {
                    endCursor
                    hasNextPage
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
