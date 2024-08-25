import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const RealAccount = () => {
    const navigation = useNavigation()
  const [realAccountBalance, setRealAccountBalance] = useState(0); // Real account balance state

  const handleDepositPress = () => {
    navigation.navigate('Deposit')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real Money Account</Text>
      <Text style={styles.infoText}>
        Balance: ${realAccountBalance.toFixed(2)}
      </Text>
      {realAccountBalance === 0 && (
        <TouchableOpacity style={styles.depositButton} onPress={handleDepositPress}>
          <Text style={styles.depositButtonText}>Add Deposit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffd700',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  infoText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  depositButton: {
    marginTop: 20,
    backgroundColor: '#ffd700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  depositButtonText: {
    color: '#021324',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});

export default RealAccount;
