import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DemoAccount = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demo Account</Text>
      <Text style={styles.infoText}>
        This is your demo account. Use it to practice and learn without risking real money.
      </Text>
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
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});

export default DemoAccount;
