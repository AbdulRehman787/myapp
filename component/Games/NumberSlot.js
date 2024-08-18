import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NumberSlot = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Number Slot</Text>
      
      <Image 
        source={require('../../assets/images/numbermatch.jpg')} 
        style={styles.slotImage}
      />
      
      <Text style={styles.numberText}>Your Number is 03</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Enter amount"
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Bit</Text>
      </TouchableOpacity>
      
      <Text style={styles.infoText}>
        minimum: 51 & maximum: 1M | Win Amount 150%
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Home</Text>
        <Text style={styles.footerText}>Lottery</Text>
        <Text style={styles.footerText}>Wallet</Text>
        <Text style={styles.footerText}>Setting</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#021324', // Changed background color to #021324
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#FFFFFF', // White text color
    },
    slotImage: {
      width: '100%',
      height: 250,
      marginBottom: 20,
      borderRadius: 20,
    },
    numberText: {
      fontSize: 18,
      marginBottom: 10,
      color: '#FFFFFF', // White text color
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#FFC107',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: '#FFFFFF',
      color: '#021324', // Text inside input should contrast the background
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#FF5722',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
    },
    infoText: {
      fontSize: 12,
      color: '#FFFFFF', // White text color
      marginBottom: 30,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      position: 'absolute',
      bottom: 20,
      paddingHorizontal: 20,
    },
    footerText: {
      fontSize: 16,
      color: '#FFFFFF', // White text color
    },
  });

export default NumberSlot;
