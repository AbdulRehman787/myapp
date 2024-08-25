import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createOrder, queryOrder } from './BinancePayService';

const UsdtTransfer = ({ route }) => {
  const { amount } = route.params;
  const navigation = useNavigation();
  const [showAddress, setShowAddress] = useState(false);
  const [depositAddress, setDepositAddress] = useState('0x1234567890abcdef');
  const [prepayId, setPrepayId] = useState(null);

  const handleShowAddress = () => {
    setShowAddress(!showAddress);
  };

  const handleConfirmDeposit = () => {
    // Simulate a deposit action (in reality, you'd handle the deposit logic)
    navigation.navigate('RealAccount', { depositedAmount: amount });
  };

  const handleCreateOrder = async () => {
    try {
      const orderData = await createOrder(amount, 'USDT', 'APP');
      setPrepayId(orderData.prepayId);
      Alert.alert('Order Created', `Order ID: ${orderData.orderId}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleQueryOrder = async () => {
    try {
      const status = await queryOrder(prepayId);
      Alert.alert('Order Status', `Status: ${status.status}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Payment Amount: {amount} USDT</Text>
      <Text style={styles.important}>Important</Text>
      <Text style={styles.note}>Only transfer USDT! Any non-USDT tokens transferred to this address will be lost.</Text>
      <Text style={styles.note}>The deposit address can change! Always create a new payment request to get the up-to-date address for your deposit.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleShowAddress}
      >
        <Text style={styles.buttonText}>Ok, show me the address</Text>
      </TouchableOpacity>
      {showAddress && <Text style={styles.depositAddress}>Deposit Address: {depositAddress}</Text>}
      <Button title="Create Order" onPress={handleCreateOrder} />
      {prepayId && <Button title="Query Order Status" onPress={handleQueryOrder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  head: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  important: {
    color: '#ffd700',
    marginBottom: 10,
  },
  note: {
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ffd700',
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#021324',
    fontWeight: 'bold',
  },
  depositAddress: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default UsdtTransfer;
