import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

const UpiPayment = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [balance, setBalance] = useState(0); // State to store the balance

  const [username, setUsername] = useState(''); // New state for username
  const [accountNumber, setAccountNumber] = useState(''); // New state for account number
  const [userId, setUserId] = useState(''); // New state for user ID

  const { amount } = route.params;

  const handleDeposit = async () => {
    if (!amount || !upiId || !username || !accountNumber || !userId) {
      Alert.alert('Error', 'Please fill in all the details.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('https://mint-legible-coyote.ngrok-free.app/initiate-deposit', {
        userId,
        amount,
        paymentMethod: 'UPI',
        upiId,
        username,
        accountNumber
      });

      if (response.data) {
        setUpiId(response.data.upiId);
        setQrCodeUrl(response.data.qrCodeUrl);
        setTransactionId(response.data.transactionId);
        Alert.alert('Payment Details', `Please complete the payment to UPI ID: ${response.data.upiId}`);
        navigation.navigate('ConfirmPayment', { transactionId: response.data.transactionId });
      }
    } catch (error) {
      console.error('Error initiating deposit:', error);
      Alert.alert('Error', 'Failed to initiate deposit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = () => {
    const qrData = `upi://pay?pa=${upiId}&pn=${username}&am=${amount}&cu=INR&tn=Payment`; // Standard UPI QR format
    setQrValue(qrData);
  };

  useEffect(() => {
    generateQRCode();
  }, [upiId, username, amount]);

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(`https://your-backend-api.com/check-payment-status?transactionId=${transactionId}`);
      if (response.data && response.data.status === 'SUCCESS') {
        setBalance(response.data.newBalance); // Update balance on success
        Alert.alert('Success', 'Payment received successfully!');
      } else {
        Alert.alert('Payment Pending', 'Your payment is still being processed. Please check again later.');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      Alert.alert('Error', 'Failed to check payment status. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Deposit Amount: {amount}</Text>
      <TextInput
        placeholder="Enter your UPI ID"
        value={upiId}
        onChangeText={setUpiId}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your Account Number"
        value={accountNumber}
        onChangeText={setAccountNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your User ID"
        value={userId}
        onChangeText={setUserId}
        style={styles.input}
      />

<Button title={loading ? 'Processing...' : 'Deposit via UPI'} onPress={handleDeposit} disabled={loading} />
{qrValue ? (
        <View style={styles.qrContainer}>
         <QRCode value={qrValue} size={200} />

        </View>
      ) : null}
      
      <Button title="Check Payment Status" onPress={checkPaymentStatus} />

<Text style={styles.balance}>Current Balance: {balance} INR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  balance: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UpiPayment;
