import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextInput, Button, View, Text, StyleSheet, Alert } from 'react-native';

const validationSchema = Yup.object().shape({
    ownerName: Yup.string().required('Repository owner\'s username is required'),
    repositoryName: Yup.string().required('Repository name is required'),
    rating: Yup.number()
        .required('Rating is required')
        .min(0, 'Rating must be between 0 and 100')
        .max(100, 'Rating must be between 0 and 100'),
    review: Yup.string(),
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
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

const CustomTextInput = ({ field, form, ...props }) => {
    return <TextInput
        style={styles.input}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        value={form.values[field.name]}
        {...props}
    />;
};

const ReviewForm = ({ onSubmit }) => {
    const handleSubmit = async (values) => {
        const { ownerName, repositoryName, rating, review } = values;
        try {
            const response = await fetch('http://localhost:5000/api/repositories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    ownerName, 
                    repositoryName, 
                    rating: Number(rating), 
                    review 
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
            const data = await response.json();
            Alert.alert('Review submitted successfully');
            onSubmit(data);
        } catch (error) {
            console.error(error);
            Alert.alert('Failed to submit review');
        }
    };
    return (
        <Formik
            initialValues={{ ownerName: '', repositoryName: '', rating: '', review: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit }) => (
                <View style={styles.container}>
                    <View>
                        <Text>Owner's Username</Text>
                        <Field name="ownerName" component={CustomTextInput} />
                        <ErrorMessage name="ownerName" component={Text} style={styles.errorText} />
                    </View>
                    <View>
                        <Text>Repository Name</Text>
                        <Field name="repositoryName" component={CustomTextInput} />
                        <ErrorMessage name="repositoryName" component={Text} style={styles.errorText} />
                    </View>
                    <View>
                        <Text>Rating</Text>
                        <Field name="rating" component={CustomTextInput} keyboardType="numeric" />
                        <ErrorMessage name="rating" component={Text} style={styles.errorText} />
                    </View>
                    <View>
                        <Text>Review</Text>
                        <Field name="review" component={CustomTextInput} multiline />
                        <ErrorMessage name="review" component={Text} style={styles.errorText} />
                    </View>
                    <Button onPress={handleSubmit} title="Submit" color={styles.button.backgroundColor} />
                </View>
            )}
        </Formik>
    );
};

export default ReviewForm;