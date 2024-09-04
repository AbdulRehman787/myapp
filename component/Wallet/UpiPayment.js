import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';


const UpiPayment = ({ route }) => {
    const [utr, setUtr] = useState('');
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const { amount } = route.params;


    
    const handleConfirmPayment = async () => {
        if (!utr) {
            Alert.alert('Error', 'Please enter the UTR number');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/confirm-payment', {
                utr,
                amount,
            });

            if (response.data.success) {
                Alert.alert('Success', 'Payment confirmed successfully!');
                setPaymentConfirmed(true); // Payment confirmed
            } else {
                Alert.alert('Failed', 'Failed to confirm payment: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            Alert.alert('Error', 'Error confirming payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Upi Payment</Text>
            {paymentConfirmed ? (
                <View style={styles.confirmation}>
                    <Text style={styles.successText}>Payment Successful! Your wallet has been updated.</Text>
                </View>
            ) : (
                <>
                    <View style={styles.qrContainer}>
                        <QRCode
                            value={`upi://pay?pa=your-upi-id@upi&pn=YourName&am=${amount}&cu=INR`}
                            size={300}
                            backgroundColor="white"
                        />
                    </View>
                    <Text style={styles.amountText}>₹ {amount}/-</Text>
                    <Text style={styles.infoText}>Scan to pay the package price and then enter the UTR number.</Text>
                    <TextInput
                        placeholder="Enter UTR no."
                        placeholderTextColor="#ddd"
                        value={utr}
                        onChangeText={(text) => setUtr(text)}
                        style={styles.input}
                    />
                    <TouchableOpacity
                        onPress={handleConfirmPayment}
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Confirm Your Payment</Text>
                        )}
                    </TouchableOpacity>
                </>
            )}
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#021324',
        paddingVertical: 30,
        paddingHorizontal: 20,
        height: "100%"
    },
    head: {
        fontSize: 22,
        fontFamily: "Poppins-Regular",
        textAlign: 'center',
        color: "#fff",
        marginVertical: 20,

    },
    qrContainer: {
        marginBottom: 20,
        alignItems: 'center',
        width: '90%',
        marginTop: 20
    },
    input: {
        padding: 10,
        width: '80%',
        marginBottom: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        color: 'white',  // Text color
    },
    button: {
        padding: 20,
        backgroundColor: '#ffd700',  // Button color
        borderRadius: 4,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: '#fff',
    },
    confirmation: {
        padding: 20,
        backgroundColor: '#dff0d8',
        borderRadius: 8,
    },
    successText: {
        color: 'black',
        textAlign: 'center',
    },
    amountText: {
        color: 'white',  // Text color
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        marginVertical: 10,

    },
    infoText: {
        color: '#ddd',  // Slightly lighter text color for additional information
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
        fontFamily: "Poppins-Regular"
    },
});

export default UpiPayment;
