import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentOptions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedAmount = route.params?.selectedAmount || 0;

  const handlePaymentMethod = (method) => {
    const validMethods = ['UPID', 'Card Payment', 'USDT', 'Google Pay', 'Phone Pay'];
    if (validMethods.includes(method)) {
      navigation.navigate('DepositPage', { selectedAmount, selectedPaymentMethod: method });
    } else {
      Alert.alert('Error', 'Invalid payment method.');
    }
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
    flex: 1,
    backgroundColor: '#021324',
    padding: 20,
  },
  head: {
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#021324',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PaymentOptions;
