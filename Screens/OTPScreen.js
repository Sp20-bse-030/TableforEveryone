import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OTPScreen = () => {
    const [otp, setOTP] = useState('');
    const navigation = useNavigation();
    
    const handleVerifyOTP = () => {
        if (otp.length !== 6) {
            alert('Please enter a valid OTP.');
        } else {
            // Logic to verify the OTP
            alert('OTP verified, you are successfully signed up!');
            navigation.navigate('Login');
        }
    };
    
    const handleResendOTP = () => {
        alert('OTP has been resent to your given email');
    }

    return (
        <View style={styles.container}>
            <Text>OTP Screen</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                onChangeText={text => setOTP(text)}
                value={otp}
                secureTextEntry
                keyboardType="numeric"
                maxLength={6}
            />
            <View style={styles.buttonContainer}>
                <Button title="Verify OTP" onPress={handleVerifyOTP} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Resend OTP" onPress={handleResendOTP} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    input: {
        marginBottom: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    buttonContainer: {
        marginVertical: 10,
    },
});

export default OTPScreen;
