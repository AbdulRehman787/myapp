import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCurrencies, getLocales } from "react-native-localize";



const PaymentOptions = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const selectedAmount = route.params?.selectedAmount || 0;

    const handlePaymentMethod = (method) => {
        navigation.navigate('DepositPage', { selectedAmount, selectedPaymentMethod: method });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Select Payment Method</Text>
            <TouchableOpacity style={styles.button} onPress={() => handlePaymentMethod('UPID')}>
                <Text style={styles.buttonText}>UPID</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePaymentMethod('Card Payment')}>
                <Text style={styles.buttonText}>Card Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePaymentMethod('USDT')}>
                <Text style={styles.buttonText}>USDT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePaymentMethod('Google Pay')}>
                <Text style={styles.buttonText}>Google Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePaymentMethod('Phone Pay')}>
                <Text style={styles.buttonText}>Phone Pay</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#021324",
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    head: {
        fontSize: 22,
        fontFamily: "Poppins-Regular",
        textAlign: "center",
        color: "#fff",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#ffd700",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: "center",
    },
    buttonText: {
        color: "#021324",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default PaymentOptions;
