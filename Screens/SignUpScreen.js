import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import ip from '../Ip';

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [customername, setCustomername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [customernameError, setCustomernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigation = useNavigation();

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            setEmailError('Email is required');
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleRegister = () => {
        setEmailError('');
        setCustomernameError('');
        setPasswordError('');
        setConfirmPasswordError('');

        if (!customername) {
            setCustomernameError('Please enter your username');
            return;
        }

        if (!email) {
            setEmailError('Please enter your email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email');
            return;
        }

        if (!password) {
            setPasswordError('Please enter your password');
            return;
        }

        if (password.length < 8) {
            setPasswordError('Password should be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        const customer = {
            customername: customername,
            email: email,
            password: password,
        };

        axios
            .post(`http://${ip}:8000/register`, customer)
            .then((response) => {
                console.log(response);
                Alert.alert(
                    "Registration successful",
                    "You have been registered successfully"
                );
                navigation.navigate('LogIn');
                setCustomername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch((error) => {
                Alert.alert(
                    "Registration Error",
                    "An error occurred while registering"
                );
                console.log("Registration failed", error);
            });
    };

    const handleSignIn = () => {
        navigation.navigate('LogIn');
    };

    return (
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Register as Customer</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={customername}
                        style={styles.input}
                        placeholder="Customername"
                        onChangeText={(text) => setCustomername(text)}
                    />
                    {customernameError !== '' && <Text style={styles.errorText}>{customernameError}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={email}
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        onBlur={validateEmail}
                    />
                    {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={password}
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                    {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={confirmPassword}
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    {confirmPasswordError !== '' && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                    <Text style={styles.loginButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginAccountText} onPress={handleSignIn}>
                    <Text style={styles.text}>
                        Already have an account? <Text style={styles.loginAccountText2}>Sign in</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    text: {
        textAlign: 'center',
    },
    formContainer: {
        flex: 2,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderBottomWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    loginButton: {
        backgroundColor: 'orange',
        borderRadius: 8,
        paddingVertical: 12,
        marginBottom: 16,
        marginTop: 10,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loginAccountText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    loginAccountText2: {
        fontSize: 16,
        marginLeft: 5,
        textAlign: 'center',
        color: '#555555',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default SignupScreen;
