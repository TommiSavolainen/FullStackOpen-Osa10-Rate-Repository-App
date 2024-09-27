import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';

const validationSchema = Yup.object().shape({
    ownerName: Yup.string().required('Repository owner\'s username is required'),
    repositoryName: Yup.string().required('Repository name is required'),
    rating: Yup.number()
        .required('Rating is required')
        .min(0, 'Rating must be between 0 and 100')
        .max(100, 'Rating must be between 0 and 100'),
    text: Yup.string(),
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
    return (
        <Formik
            initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ submitForm, isSubmitting }) => (
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
                        <Field name="text" component={CustomTextInput} multiline />
                        <ErrorMessage name="text" component={Text} style={styles.errorText} />
                    </View>
                    <Button onPress={submitForm} title="Submit" color={styles.button.backgroundColor} disabled={isSubmitting} />
                </View>
            )}
        </Formik>
    );
};

export default ReviewForm;
// import React from 'react';
// import { Formik, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { TextInput, Button, View, Text, StyleSheet, Alert } from 'react-native';
// import { useMutation } from '@apollo/client';
// import { CREATE_REVIEW } from '../graphql/queries';

// const validationSchema = Yup.object().shape({
//     ownerName: Yup.string().required('Repository owner\'s username is required'),
//     repositoryName: Yup.string().required('Repository name is required'),
//     rating: Yup.number()
//         .required('Rating is required')
//         .min(0, 'Rating must be between 0 and 100')
//         .max(100, 'Rating must be between 0 and 100'),
//     text: Yup.string(),
// });

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         padding: 15,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginVertical: 5,
//         borderRadius: 5,
//     },
//     errorText: {
//         color: 'red',
//         marginBottom: 5,
//     },
//     button: {
//         backgroundColor: '#0366d6',
//         padding: 15,
//         margin: 15,
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: 'white',
//         textAlign: 'center',
//     },
// });

// const CustomTextInput = ({ field, form, ...props }) => {
//     return <TextInput
//         style={styles.input}
//         onChangeText={form.handleChange(field.name)}
//         onBlur={form.handleBlur(field.name)}
//         value={form.values[field.name]}
//         {...props}
//     />;
// };

// const ReviewForm = ({ onSubmit }) => {
//     const [mutate] = useMutation(CREATE_REVIEW);

//     const handleSubmit = async (values, { setSubmitting }) => {
//         const { ownerName, repositoryName, rating, text } = values;
//         const ratingNumber = Number(rating);
//         const variables = { review: { ownerName, repositoryName, rating: ratingNumber, text } };
//         console.log('Submitting review with variables:', variables);
//         try {
//             const { data } = await mutate({ variables });
//             console.log('Server response:', data);
//             Alert.alert('Review submitted successfully');
//             onSubmit(data);
//         } catch (error) {
//             console.error('Error submitting review:', error);
//             if (error.networkError && error.networkError.result && error.networkError.result.errors) {
//                 console.error('Server errors:', error.networkError.result.errors);
//             }
//             Alert.alert('Failed to submit review');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <Formik
//             initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//         >
//             {({ submitForm, isSubmitting }) => (
//                 <View style={styles.container}>
//                     <View>
//                         <Text>Owner's Username</Text>
//                         <Field name="ownerName" component={CustomTextInput} />
//                         <ErrorMessage name="ownerName" component={Text} style={styles.errorText} />
//                     </View>
//                     <View>
//                         <Text>Repository Name</Text>
//                         <Field name="repositoryName" component={CustomTextInput} />
//                         <ErrorMessage name="repositoryName" component={Text} style={styles.errorText} />
//                     </View>
//                     <View>
//                         <Text>Rating</Text>
//                         <Field name="rating" component={CustomTextInput} keyboardType="numeric" />
//                         <ErrorMessage name="rating" component={Text} style={styles.errorText} />
//                     </View>
//                     <View>
//                         <Text>Review</Text>
//                         <Field name="text" component={CustomTextInput} multiline />
//                         <ErrorMessage name="text" component={Text} style={styles.errorText} />
//                     </View>
//                     <Button onPress={submitForm} title="Submit" color={styles.button.backgroundColor} disabled={isSubmitting} />
//                 </View>
//             )}
//         </Formik>
//     );
// };

// export default ReviewForm;