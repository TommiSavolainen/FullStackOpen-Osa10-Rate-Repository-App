import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import { View, Button, TextInput } from 'react-native';
import { Formik } from 'formik';

const SignInContainer = ({ onSubmit }) => {
    return (
        <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit}>
            {({ handleChange, handleSubmit, values }) => (
                <View>
                    <TextInput placeholder="Username" onChangeText={handleChange('username')} value={values.username} />
                    <TextInput placeholder="Password" onChangeText={handleChange('password')} value={values.password} secureTextEntry />
                    <Button onPress={handleSubmit} title="Sign In" />
                </View>
            )}
        </Formik>
    );
};

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={onSubmit} />);

            fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
            fireEvent.changeText(getByPlaceholderText('Password'), 'password');
            fireEvent.press(getByText('Sign In'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'testuser',
                    password: 'password',
                });
            });
        });
    });
});
