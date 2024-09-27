import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_USER } from '../graphql/queries';
import useSignIn from '../hooks/useSignIn';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
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
  return (
    <TextInput
      style={styles.input}
      onChangeText={form.handleChange(field.name)}
      onBlur={form.handleBlur(field.name)}
      value={form.values[field.name]}
      {...props}
    />
  );
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;

    try {
      const { data } = await createUser({ variables: { user: { username, password } } });
      if (data) {
        await signIn({ username, password });
        navigate('/repositories');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <View style={styles.container}>
          <View>
            <Text>Username</Text>
            <Field name="username" component={CustomTextInput} />
            <ErrorMessage name="username" component={Text} style={styles.errorText} />
          </View>
          <View>
            <Text>Password</Text>
            <Field name="password" component={CustomTextInput} secureTextEntry />
            <ErrorMessage name="password" component={Text} style={styles.errorText} />
          </View>
          <View>
            <Text>Password Confirmation</Text>
            <Field name="passwordConfirmation" component={CustomTextInput} secureTextEntry />
            <ErrorMessage name="passwordConfirmation" component={Text} style={styles.errorText} />
          </View>
          <Button onPress={submitForm} title="Sign Up" color={styles.button.backgroundColor} disabled={isSubmitting} />
        </View>
      )}
    </Formik>
  );
};

export default SignUp;