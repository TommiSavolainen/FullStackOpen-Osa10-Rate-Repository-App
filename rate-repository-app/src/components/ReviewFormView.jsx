import React from 'react';
import { Pressable, StyleSheet, View, FormikTextInput } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
    },
    button: {
        backgroundColor: '#0366d6',
        padding: 15,
        margin: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});
const ReviewFormView = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="review" placeholder="Review" multiline />
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
        </View>
    );
};

export default ReviewFormView;