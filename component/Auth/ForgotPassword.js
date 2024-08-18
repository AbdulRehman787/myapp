import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = () => {
        if (!email) {
            setError('Email is required');
            return;
        }

        axios.post('https://b56b-2a00-f29-2c8-c685-504f-d568-c93-1878.ngrok-free.app/forgotpassword', { email })
            .then(res => {
                setMessage(res.data.message);
                setError('');
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                } else if (err.request) {
                    setError("No response from the server. Please try again.");
                } else {
                    setError("An error occurred. Please try again.");
                }
                setMessage('');
            });
    };
  return (
    <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.head1}>Reset Password</Text>
                <Text style={styles.head2}>Please enter your email to receive a link to create a new password via email </Text>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View>
                <TouchableOpacity onPress={handleForgotPassword} style={styles.btn}><Text style={styles.btn_head}>Send</Text></TouchableOpacity>
            </View>

        </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 50,
        height: '100%',
        backgroundColor: '#021324',
    },
    container1: {
        textAlign: "center",
    },
    head1: {
        fontSize: 30,
        textAlign: "center",
        color :"white"
    },
    head2: {
        fontSize: 16,
        textAlign: "center",
        alignItems: 'center',
        marginVertical: 10,
        color :"white"


    },
    input: {
        borderWidth: 1,
        padding: 12,
        borderRadius: 50,
        backgroundColor: "#eeeeee",
        marginVertical: 10,
    },
    btn: {
        backgroundColor: "#ffd700",
        padding: 15,
        marginVertical: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ffd700"
    },
    btn_head: {
        color: "#fff",
        textAlign: "center"
    },
    btn1: {
        padding: 15,
        backgroundColor: "#42a5f5",
        borderWidth: 1,
        borderColor: "#42a5f5",
        borderRadius: 50,
    }
})