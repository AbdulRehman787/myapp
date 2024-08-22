import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const DepositPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedAmount = route.params?.selectedAmount || 0;
  const selectedPaymentMethod = route.params?.selectedPaymentMethod || 'None';

  const handleDeposit = () => {
    // Handle deposit logic here
    console.log('Deposit amount:', selectedAmount);
    console.log('Payment method:', selectedPaymentMethod);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.head}>Deposit Amount</Text>
 
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('DepositOptions')} >
      <Text style={styles.btntext}>Deposit Amount {"\n"} {selectedAmount}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PaymentOptions')}> 
      <Text style={styles.btntext}>Payment Method  {"\n"}{selectedPaymentMethod}</Text>
      </TouchableOpacity>
      
    <TouchableOpacity style={styles.btn} onPress={handleDeposit}><Text style={styles.btntext}>Deposit</Text></TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor:"#021324",
    paddingVertical : 30,
    paddingHorizontal: 20
  },
  head:{
    fontSize: 22,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#fff"
  },
  btn:{
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor:"#ffd700",
    borderRadius: 10,
    marginVertical :20
  },
  btntext:{
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins-Regular"

  }
});

export default DepositPage;
