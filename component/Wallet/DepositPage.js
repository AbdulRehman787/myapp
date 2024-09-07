import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
const DepositPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedAmount = route.params?.selectedAmount || 0;
  const selectedPaymentMethod = route.params?.selectedPaymentMethod || 'None';

  const handleDeposit = () => {
    if (selectedPaymentMethod === 'UPID') {
      navigation.navigate('UpiPayment', { amount: selectedAmount, paymentMethod: selectedPaymentMethod });
    } else if (selectedPaymentMethod === 'Card Payment') {
      navigation.navigate('Card Payment', { amount: selectedAmount, paymentMethod: selectedPaymentMethod });
    } else if (selectedPaymentMethod === 'USDT') {
      navigation.navigate('UsdtPayment', { amount: selectedAmount, paymentMethod: selectedPaymentMethod });
    } else if (selectedPaymentMethod === 'Google Pay') {
      navigation.navigate('GooglePayPayment', { amount: selectedAmount, paymentMethod: selectedPaymentMethod });
    } else if (selectedPaymentMethod === 'Phone Pay') {
      navigation.navigate('Phone Pay', { amount: selectedAmount, paymentMethod: selectedPaymentMethod });
    } else {
      console.log('No payment method selected');
    }
  };
 
  
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Deposit Amount</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('DepositOptions', { selectedPaymentMethod })}
      >
        <Text style={styles.btntext}>
          Deposit Amount {"\n"} {selectedAmount}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('PaymentOptions', { selectedAmount })}
      >
        <Text style={styles.btntext}>
          Payment Method {"\n"} {selectedPaymentMethod}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.btn} onPress={handleDeposit}>
        <Text style={styles.btntext}>Deposit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: "#021324",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  head: {
    fontSize: 22,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#fff",
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#ffd700",
    borderRadius: 10,
    marginVertical: 20,
  },
  btntext: {
    color: "#021324", // Ensure the text color is readable
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});

export default DepositPage;
