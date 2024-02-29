import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        if (email.trim() === '') {
            Alert.alert('Validation Error', 'Please enter your email.');
        } else if (!isValidEmail(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
        } else {
            // Logic to handle password reset
            Alert.alert('Password Reset', 'An email has been sent to your email address with further instructions.');
        }
    };

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
           <TouchableOpacity style={styles.ResetButton} onPress={handleResetPassword}>
          <Text style={styles.ResetButtonText}>Reset Password</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        marginBottom: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    ResetButton: {
        backgroundColor: 'orange',
        borderRadius: 8,
        paddingVertical: 12,
        marginBottom: 16,
        marginTop: 5,
      },
      ResetButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

export default ForgotPasswordScreen;
