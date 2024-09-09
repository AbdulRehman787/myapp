import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const PaymentQRScreen = ({ route }) => {
  const { amount, paymentMethod } = route.params;

  // Generate a URL with payment details
  const paymentURL = `https://mint-legible-coyote.ngrok-free.app/payment?amount=${amount}&method=${paymentMethod}&reference=${Date.now()}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan this QR Code to Pay:</Text>
      <QRCode
        value={paymentURL}
        size={200}
        color='black'
        backgroundColor='white'
      />
      <Text style={styles.instructions}>
        Open your payment app, scan this QR code, and follow the instructions to complete the payment.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 18, marginBottom: 20 },
  instructions: { marginTop: 20, textAlign: 'center' },
});

export default PaymentQRScreen;
