// // screens/DepositScreen.js
// import React, { useState } from 'react';
// import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
// import { initiatePhonePePayment } from './phonepe';

// export default function PhonePay({ navigation, route }) 
// {
//   const { amount } = route.params;

//   const handleDeposit = () => {
//     initiatePhonePePayment(amount, 'deposit')
//       .then(response => {
//         if (response.success) {
//           Alert.alert('Success', `Your deposit of ${amount} INR was successful.`);
   
//           navigation.goBack();
//         } else {
//           Alert.alert('Error', 'Your deposit was unsuccessful. Please try again.');
//         }
//       })
//       .catch(error => {
//         console.error('Error during deposit:', error);
//         Alert.alert('Error', 'An unexpected error occurred. Please try again.');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Deposit to Wallet</Text>
  
//       <Button title="Deposit with PhonePe" onPress={handleDeposit} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PhonePay = () => {
  return (
    <View>
      <Text>PhonePay</Text>
    </View>
  )
}

export default PhonePay

const styles = StyleSheet.create({})
