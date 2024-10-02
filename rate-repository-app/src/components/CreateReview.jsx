import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/queries';
import { GET_REVIEWS } from '../graphql/queries'; // Import the query to refetch
import ReviewForm from './ReviewForm';

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW, {
    refetchQueries: [{ query: GET_REVIEWS }], // Refetch the reviews query after mutation
  });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const parsedRating = parseInt(rating);

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: parsedRating,
            text,
          },
        },
      });

      if (data) {
        console.log("navigate id "+data.createReview.repositoryId);
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;