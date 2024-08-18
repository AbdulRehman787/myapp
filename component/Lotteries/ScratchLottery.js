import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const [userNumber, setUserNumber] = useState(null);
  const adminNumber = Math.floor(Math.random() * 10) + 1;
  const [revealed, setRevealed] = useState(false);

  const scratch = () => {
    const generatedNumber = Math.floor(Math.random() * 10) + 1;
    setUserNumber(generatedNumber);
    setRevealed(true);
    if (generatedNumber === adminNumber) {
      Alert.alert("Congratulations!", "You won this lottery!");
    } else {
      Alert.alert("Try Again", `The winning number was ${adminNumber}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scratch Lottery</Text>
      <View style={styles.card}>
        {revealed ? (
          <Text style={styles.number}>{userNumber}</Text>
        ) : (
          <Text style={styles.scratchText}>Scratch to reveal</Text>
        )}
      </View>
      <TouchableOpacity style={styles.scratchButton} onPress={scratch} disabled={revealed}>
        <Text style={styles.scratchButtonText}>Scratch</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetButton} onPress={() => setRevealed(false)}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#021324',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  card: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 20,
    marginBottom: 20,
  },
  number: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000',
  },
  scratchText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  scratchButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  scratchButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  resetButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
