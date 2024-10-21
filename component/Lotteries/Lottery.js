import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const Lottery = ({route}) => {
  const {wallet_Balance} = route.params;
  console.log(wallet_Balance)
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [amount, setAmount] = useState('');
  const [lotteryNumbers, setLotteryNumbers] = useState([]);
  const [balance, setBalance] = useState(wallet_Balance); // Initialize user balance to 1000
  const [timer, setTimer] = useState(10); // Countdown timer set to 10 seconds
  const [isProcessing, setIsProcessing] = useState(false); // To show processing state
  const [result, setResult] = useState(null); // To show the result of the lottery

  useEffect(() => {
    // Fetch lottery numbers from the backend
    const getData = async () => {
      try {
        const res = await axios.get('https://bulldog-solid-bream.ngrok-free.app/lotteryNumber');
        console.log('Fetched Lottery Data:', res.data); // Debug log to check data

        // Ensure the data is in the correct format (an array of arrays)
        if (Array.isArray(res.data) && res.data.every((item) => Array.isArray(item))) {
          setLotteryNumbers(res.data);
        } else {
          console.log('Invalid data format:', res.data); // Log the invalid data for debugging
          Alert.alert('Error', 'Invalid data received from the server.');
        }
      } catch (err) {
        console.error('Error fetching lottery numbers:', err);
        Alert.alert('Error', 'Failed to fetch lottery numbers. Please try again.');
      }
    };
    getData();
  }, []);

  const toggleNumber = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const postData = () => {
    if (selectedNumbers.length !== 5) {
      Alert.alert('Please select exactly 5 numbers');
      return;
    }

    if (amount === '' || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Please enter a valid bet amount');
      return;
    }

    const betAmount = parseFloat(amount);
    if (betAmount > balance) {
      Alert.alert('Insufficient balance');
      return;
    }

    // Deduct the bet amount from the user's balance
    setBalance(balance - betAmount);

    // Start the countdown timer and show a loading message
    setIsProcessing(true);
    setResult(null);

    // Timer countdown logic
    let countdown = 10;
    const timerInterval = setInterval(() => {
      countdown -= 1;
      setTimer(countdown);
      if (countdown === 0) {
        clearInterval(timerInterval); 

     
        const isWinner = lotteryNumbers.some((lotterySet) => {
          // Ensure lotterySet is an array before calling .sort()
          if (Array.isArray(lotterySet)) {
            // Sort and compare the user's selected numbers with each lottery set
            return arraysAreEqual(lotterySet.sort(), selectedNumbers.sort());
          }
          return false; // Return false if lotterySet is not valid
        });

        if (isWinner) {
          Alert.alert('Congratulations!', 'You have won the lottery!');
          // Increase the balance if the user wins (e.g., double the bet amount)
          setBalance(balance + betAmount * 2);
          setResult('won');
        } else {
          Alert.alert('Sorry!', 'You did not win. Better luck next time.');
          setResult('lost');
        }

        // Reset processing state
        setIsProcessing(false);

        // Reset selected numbers and amount
        setSelectedNumbers([]);
        setAmount('');
      }
    }, 1000); // 1-second delay for each tick
  };

  // Helper function to compare two arrays for equality
  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Lottery</Text>
      <Text style={styles.subHeader}>Choose 5 Numbers</Text>

      <Text style={styles.balanceText}>Balance: {balance}</Text>
      {/* Show Timer */}
      {isProcessing && (
        <Text style={styles.timerText}>Time Remaining: {timer} seconds</Text>
      )}

      <View style={styles.numbersGrid}>
        {[...Array(30).keys()].map((num) => {
          const number = num + 1;
          const isSelected = selectedNumbers.includes(number);
          return (
            <TouchableOpacity
              key={number}
              style={[styles.number, isSelected && styles.selectedNumber]}
              onPress={() => toggleNumber(number)}
              disabled={isProcessing} // Disable buttons while processing
            >
              <Text style={[styles.numberText, isSelected && styles.selectedNumberText]}>{number}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        placeholderTextColor="#fff"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        editable={!isProcessing} // Disable input while processing
      />

      <TouchableOpacity style={styles.addButton} onPress={postData} disabled={isProcessing}>
        <Text style={styles.addButtonText}>Add Bet</Text>
      </TouchableOpacity>

      {/* Show Lottery Numbers After Result */}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {result === 'won' ? 'Winning Numbers:' : 'Lottery Numbers:'}
          </Text>
          {lotteryNumbers.map((lotterySet, index) => (
            <Text key={index} style={styles.lotteryNumber}>
              {Array.isArray(lotterySet) ? lotterySet.join(', ') : 'Invalid data'} {/* Added check to ensure lotterySet is an array */}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Lottery;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#021324',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  balanceText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 20,
    color: '#FFD700',
    marginBottom: 20,
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  number: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 30,
    margin: 5,
  },
  selectedNumber: {
    backgroundColor: '#FFD700',
  },
  numberText: {
    color: '#fff',
    fontSize: 20,
  },
  selectedNumberText: {
    color: '#000',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
  },
  lotteryNumber: {
    fontSize: 18,
    color: '#FFD700',
    marginVertical: 5,
  },
});
