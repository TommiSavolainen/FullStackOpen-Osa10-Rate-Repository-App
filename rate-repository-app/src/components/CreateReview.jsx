import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/queries';
import ReviewForm from './ReviewForm';


const CreateReview = () => {
    const [createReview] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();
    
    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, review } = values;
        const parsedRating = parseInt(rating);
    
        try {
        const { data } = await createReview({
            variables: {
            review: {
                ownerName,
                repositoryName,
                rating: parsedRating,
                text: review,
            },
            },
        });
    
        if (data) {
            navigate(`/repository/${data.createReview.repositoryId}`);
        }
        } catch (e) {
        console.error(e);
        }
    };
    
    return <ReviewForm onSubmit={onSubmit} />;
    };

export default CreateReview;