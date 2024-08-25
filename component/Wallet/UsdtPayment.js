import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const UsdtPayment = ({ route, navigation }) => {
  const { amount, paymentMethod } = route.params;
  console.log(paymentMethod);

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Confirm Payment</Text>
      <View>
        <Image source={require('../../assets/images/usdt.png')} style={styles.img} />
        <Text style={styles.desc}>Payment Method: {paymentMethod}</Text>
        <Text style={styles.paymenthead}>Amount: {amount} {paymentMethod}</Text>
      </View>
      <View>
        <Text style={styles.notedesc}>Please note a commission will be applied to withdraw using the selected payment method.</Text>
      </View>
      <View style={styles.contmain1}>
      <View style={styles.cont1}>
        <Text style={styles.head2}>Payment Method</Text>
        <Text style={styles.head1}>{paymentMethod} (TRC20)</Text>
      </View>
      <View style={styles.cont1}>
        <Text style={styles.head2}>Deposit to Account</Text>
        <Text style={styles.head1}>usdt account no</Text>
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
        onPress={() => navigation.navigate('UsdtTransfer', { amount })}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UsdtPayment;

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
