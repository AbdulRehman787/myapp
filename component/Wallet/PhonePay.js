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


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const PhonePay = () => {
//   return (
//     <View>
//       <Text>PhonePay</Text>
//     </View>
//   )
// }

// export default PhonePay

// const styles = StyleSheet.create({})


import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Image, StyleSheet, Linking } from 'react-native';
import PhonePeSdk from "react-native-phonepe-pg"

import { sha256 } from 'react-native-sha256';
import Base64 from 'react-native-quick-base64'
const PhonePay = ({ route }) => {
  const phonePePaymentLink = 'https://www.phonepe.com/paylink'; // Replace with your generated payment link
  const { amount } = route.params;
  const [number, setNumber] = useState('')



  const handlePayment = () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount.');
      return;
    }

    // Open PhonePe app with the payment link (if available)
    Linking.openURL(phonePePaymentLink)
      .catch(err => {
        console.error('Failed to open PhonePe link:', err);
        Alert.alert('Error', 'Unable to open PhonePe link.');
      });
  };

  const [environment, setEnvironment] = useState('SANDBOX')
  const [merchantId, setMerchantId] = useState('PGTESTPAYUAT86')
  const [appId, setAppID] = useState(null)
  
  const [enabbleLogging, setEnableLogging] = useState(true)


  



  const generateTransactionId = () => {
    const timeStamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    const merchantPerfix = 'T';
    return `${merchantPerfix}${timeStamp}${random}`
  }


  const submithandler = () => {

    PhonePeSdk.init(environment, merchantId, appId, enabbleLogging)
      .then(res => {
        const requestBody = {
          merchantId: merchantId,
          merchantTransactionId: generateTransactionId(),
          merchantUserId: "",
          amount: amount,
          mobileNumber: number,
          callBackURL: "",
          paymentInstruments: {
            type: "PAY_PAGE"
          }
        }
        const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
        const salt_Index = 1;
        const payload = JSON.stringify(requestBody)
        const payload_main = Base64(payload)
        const string = payload_main + "/pg/v1/pay" + salt_key;
        const check_sum = sha256(string) + "###" + salt_Index;
    
        PhonePeSdk.startTransaction(
          payload,
          check_sum,
          null,
          null
        ).then(res => {
console.log(res);

        })
          .catch(err => {
            console.log(err);

          })
      })
      .catch(err => {
console.log(err);

      })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your deposit  Amount {amount} </Text>


      {/* Static QR Code Image */}
      <Text style={styles.qrLabel}>Scan QR Code to Pay:</Text>
      <Image
        source={{ uri: 'https://example.com/static-qr-code.png' }} // Replace with your static QR code URL
        style={styles.qrCode}
      />
      <TextInput style={styles.input} placeholder='enter Mobile number' value={number} onChangeText={setNumber} keyboardType='number' />
      {/* Button to Initiate Payment */}
      <Button title="Pay with PhonePe Link" onPress={() => submithandler()} />
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
  qrLabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrCode: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

export default PhonePay;
