import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CardPayment = ({ route, navigation }) => {
  const { amount, paymentMethod,user_id,user_name,user_email } = route.params;

  
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const data1={
      user_id,
      user_email,
      user_name,
      amount,
      gateway_system:paymentMethod,
      payment_status:"Payment successfull"
    }
   
    const fetchPaymentSheetParams = async () => {
      const totalAmount = amount;
         const response = await fetch('https://mint-legible-coyote.ngrok-free.app/payment-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalAmount }), // Send the amount in the request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch payment sheet parameters');
      }
  
      const { paymentIntent, ephemeralKey, customer } = await response.json();
      return { paymentIntent, ephemeralKey, customer };
    };
  
    const initializePaymentSheet = async () => {
      try {
        const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
  
        const { error } = await initPaymentSheet({
          merchantDisplayName: 'Example, Inc.',
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            name: user_name,
            user_email:user_email,
            user_id:user_id
          },
        });
  
        if (!error) {
          setLoading(true); // Set loading state if initialization is successful
        } else {
          Alert.alert('Initialization Error', error.message);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
  
    const openPaymentSheet = async () => {
      // Make sure Payment Sheet is initialized before presenting
      if (!loading) {
        await initializePaymentSheet();
        setLoading(true);
        return; // Return here to avoid presenting Payment Sheet twice
      }
  
      const {error} = await presentPaymentSheet({
        confirmPayment: true,
        onConfirmed: () => {
          // Payment is confirmed, update payment status to 'Paid'
       
          setPaymentSheetIsOpen(true);
        },
        onDismissed: () => {
          setPaymentSheetIsOpen(false);
        },
      });
  
      if (!error) {
     
        console.log('')
        axios.post('https://mint-legible-coyote.ngrok-free.app/deposit', data1)
        .then(res => {
          console.log('Payment will be  Added');
         
        })
        .catch(err => console.log(err));
  
        // axios.post("https://mint-legible-coyote.ngrok-free.app/admin email", selectedSellerEmail)
        // .then(res=> console.log("Email send successfully"))
        // .catch(err=> console.log(err))
        
      } else {
        Alert.alert(`Error code: ${error.code}`, error.message);
      }
    };
  
    useEffect(() => {
      initializePaymentSheet(); // Initialize Payment Sheet on component mount
    }, []);

   
    
  
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Confirm Payment</Text>
      <View>
        <Text style={styles.desc}>Payment Method: {paymentMethod}</Text>
        <Text style={styles.paymenthead}>Amount: {amount} {paymentMethod}</Text>
      </View>
      <View>
        <Text style={styles.notedesc}>Please note a commission will be applied to withdraw using the selected payment method.</Text>
      </View>
      <View style={styles.contmain1}>
      <View style={styles.cont1}>
        <Text style={styles.head2}>Payment Method</Text>
        <Text style={styles.head1}>{paymentMethod}</Text>
      </View>
      <View style={styles.cont1}>
        <Text style={styles.head2}>Deposit to Account</Text>
        <Text style={styles.head1}>{user_id}</Text>
      </View>
      <View style={styles.cont1}>
        <Text style={styles.head2}>Currency</Text>
        <Text style={styles.head1}>{paymentMethod}</Text>
      </View>
      <View style={styles.cont1}>
        <Text style={styles.head2}>Level</Text>
        <Text style={styles.head1}>Starter</Text>
      </View>
      </View>
      <View>
        <Text style={styles.notedesc}> Your will be redirected to the payment system page afterwards</Text>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={()=>openPaymentSheet()} 
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardPayment;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#021324",
    height: "100%",
  },
  head: {
    fontSize: 22,
    fontFamily: "Poppins-Regular",
    textAlign: "left",
    marginVertical: 10,
    color: "#fff",
  },
  img: {
    width: width * 0.20,
    height: width * 0.20,
    borderRadius: (width * 0.12) / 2,
    alignSelf: "center",
    marginVertical: 20,
  },
  desc: {
    color: "#ccc",
    textAlign: "center",
  },
  paymenthead: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginVertical: 20,
  },
  notedesc: {
    paddingHorizontal: 20,
    color: "#c8c8c8",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  contmain1:{
    marginVertical:20,
  },
  cont1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  head1: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 10,
  },
  head2:{
    color: "#fff",
    fontSize: 14,
    marginVertical: 10,
  },
 
  confirmButton: {
    backgroundColor: '#ffd700',
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  confirmText: {
    color: '#021324',
    fontWeight: 'bold',
  },
});

// import { Button, StyleSheet, Text, View, Alert } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useStripe } from '@stripe/stripe-react-native';
// import axios from 'axios';

// const CardPayment = ({ route }) => {
//   const { amount } = route.params;
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [loading, setLoading] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState('Pending');

//   const fetchPaymentSheetParams = async () => {
//     const response = await fetch('https://mint-legible-coyote.ngrok-free.app/payment-sheet', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount }), // Send the amount in the request body
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch payment sheet parameters');
//     }

//     const { paymentIntent, ephemeralKey, customer } = await response.json();
//     return { paymentIntent, ephemeralKey, customer };
//   };

//   const initializePaymentSheet = async () => {
//     try {
//       const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

//       const { error } = await initPaymentSheet({
//         merchantDisplayName: 'Example, Inc.',
//         customerId: customer,
//         customerEphemeralKeySecret: ephemeralKey,
//         paymentIntentClientSecret: paymentIntent,
//         allowsDelayedPaymentMethods: true,
//         defaultBillingDetails: {
//           name: 'Jane Doe',
//         },
//       });

//       if (!error) {
//         setLoading(true); // Set loading state if initialization is successful
//       } else {
//         Alert.alert('Initialization Error', error.message);
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const openPaymentSheet = async () => {
//     if (!loading) {
//       await initializePaymentSheet(); // Ensure Payment Sheet is initialized
//       setLoading(true); // Set loading to true once initialized
//       return; // Prevent presenting the Payment Sheet twice
//     }

//     const { error } = await presentPaymentSheet();

//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//    
//       Alert.alert('Success', 'Payment was successful!');
//     }
//   };

//   useEffect(() => {
//     initializePaymentSheet(); // Initialize Payment Sheet on component mount
//   }, []);
//   const handleDepsoit=()=>{
//     axios.post('https://mint-legible-coyote.ngrok-free.app',)
//   }

//   return (
//     <View style={styles.container}>
//       <Text>Amount: {amount}</Text>
//       <Button title='Deposit' onPress={()=>openPaymentSheet()}  />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CardPayment;
