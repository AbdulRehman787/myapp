// // utils/phonepe.js
// import { Linking, Alert } from 'react-native';

// export const initiatePhonePePayment = async (amount, transactionType, phonePeAccount) => {
//   try {
//     // Define the payment URL for PhonePe
//     const transactionId = `TXN_${new Date().getTime()}`; // Unique transaction ID
//     const merchantId = 'YOUR_MERCHANT_ID'; // Replace with your merchant ID
//     const paymentUrl = `phonepe://pay?pa=${phonePeAccount}&pn=YourName&mc=YourMerchantCode&tid=${transactionId}&tr=YourTransactionRef&tn=YourTransactionNote&am=${amount}&cu=INR`;

//     // Open the PhonePe payment screen
//     const supported = await Linking.canOpenURL(paymentUrl);
//     if (supported) {
//       await Linking.openURL(paymentUrl);
//       return { success: true };
//     } else {
//       Alert.alert('Error', 'PhonePe is not installed on this device.');
//       return { success: false };
//     }
//   } catch (error) {
//     console.error('Error during PhonePe payment initiation:', error);
//     Alert.alert('Error', 'Failed to initiate payment. Please try again.');
//     return { success: false };
//   }
// };
