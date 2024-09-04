import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Image, Alert, TextInput } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const Spinner = () => {
  const [spinValue] = useState(new Animated.Value(0));
  const [result, setResult] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [error, setError] = useState('');
  const [betAmount, setBetAmount] = useState(''); // State for bet amount
  const [balance, setBalance] = useState(1000); // Initial balance of 1000 USDT
  const [showResult, setShowResult] = useState(false); // State to control result display delay
  const prizes = ['Car', 'Bike', 'Phone', 'Laptop', 'Watch', 'Camera', 'House', 'Macbook'];

  const startSpin = () => {
    const bet = parseFloat(betAmount);

    if (!bet || bet <= 0) {  // Validate bet amount
      Alert.alert('Invalid Bet', 'Please enter a valid bet amount.');
      return;
    }

    if (bet > balance) {  // Check if bet is more than available balance
      Alert.alert('Insufficient Balance', 'You do not have enough balance to place this bet.');
      return;
    }

    // Reset spin value to 0 and hide the previous result
    spinValue.setValue(0);
    setShowResult(false);

    // Calculate a random spin duration and final spin position
    const duration = 4000;
    const endValue = Math.floor(Math.random() * prizes.length);

    // Start spinning animation
    Animated.timing(spinValue, {
      toValue: 1 + endValue / prizes.length,
      duration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setResult(prizes[endValue]);

      // Check if the user selection matches the result
      if (prizes[endValue] === userSelect) {
        const profit = 90;  // Profit for the user
        setBalance(balance + profit);  // Update balance with profit
        setError(`You win!`);
      } else {
        setBalance(balance - bet);  // Update balance by subtracting the bet amount
        setError(`You Lose!`);
      }

      // Delay showing the result by 5 seconds
      setTimeout(() => {
        setShowResult(true);
      }, 5000);
    });
  };

  const spinRotation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spinner Game</Text>
      <Text style={styles.balanceText}>Current Balance: ${balance.toFixed(2)} USDT</Text> 
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spinRotation }] }]}>
        <Image source={require('../../assets/images/spinner.png')} style={styles.spinnerImage} />
      </Animated.View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select an Item:</Text>
        <SelectList
          setSelected={val => setUserSelect(val)}
          data={prizes}
          save="value"
          dropdownTextStyles={styles.dropdownText}
          dropdownItemStyles={styles.dropdownItem}
          dropdownItemSelectedStyles={styles.selectedItem}
          boxStyles={styles.dropdownBox} // White container for the dropdown
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.dropdownLabel}>Enter Bet Amount:</Text>
        <TextInput
          style={styles.betInput}
          keyboardType="numeric"
          value={betAmount}
          onChangeText={setBetAmount}
          placeholder="Enter bet amount"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.spinButton} onPress={startSpin} disabled={!userSelect}>
        <Text style={styles.spinButtonText}>SPIN</Text>
      </TouchableOpacity>

      {result ? <Text style={styles.resultText}>{error}!</Text> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#021324',
    paddingVertical: 30,
    paddingHorizontal: 20,
    height: '100%',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  balanceText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  spinner: {
    width: 250,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  spinnerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  spinButton: {
    marginTop: 20,
    backgroundColor: '#f0b000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  spinButtonText: {
    color: '#021324',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  dropdownContainer: {
    marginVertical: 10,
  },
  dropdownLabel: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownText: {
    color: '#021324',
  },
  dropdownItem: {
    backgroundColor: '#fff',
    color: "#021324",
  },
  selectedItem: {
    backgroundColor: '#fff',
    color: '#021324',
  },
  dropdownBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  inputContainer: {
    marginVertical: 10,
  },
  betInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    color: '#021324',
    fontFamily: 'Poppins-Regular',
  },
  resultText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    textAlign: 'center',
  },
});


export default Spinner;
