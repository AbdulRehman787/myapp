import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PaymentOptions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Select Payment Method</Text>
      <Button title="Card Payment" />
      <Button title="UPID" />
      <Button title="USDT" />
      <Button title="Google Pay" />
      <Button title="Chinon Pay" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor:"#021324",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  head:{
    fontSize: 22,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#fff"
  }
});

export default PaymentOptions;