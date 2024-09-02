import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: 'lightgray',
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    signIn: {
        padding: 10,
        backgroundColor: '#0366d6',
        color: 'white',
        textAlign: 'center',
        borderRadius: 5,
        margin: 10,
        fontWeight: 'bold',
    },
    errorBorder: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
    },
});

const SignIn = () => {
    const { handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <View style={{ backgroundColor: 'white' }}>
            <TextInput
                onChangeText={handleChange('username')}
                value={values.username}
                style={[
                    styles.container,
                    touched.username && errors.username && styles.errorBorder,
                ]}
                placeholder='Username'
                placeholderTextColor='gray'
            />
            {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <TextInput
                onChangeText={handleChange('password')}
                value={values.password}
                style={[
                    styles.container,
                    touched.password && errors.password && styles.errorBorder,
                ]}
                placeholder='Password'
                placeholderTextColor='gray'
                secureTextEntry
            />
            {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Pressable onPress={handleSubmit}>
                <Text style={styles.signIn}>Sign in</Text>
            </Pressable>
        </View>
    );
};

export default SignIn;