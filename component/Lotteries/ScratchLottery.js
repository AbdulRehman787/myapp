import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import Footer from '../Games/Footer';
import axios from 'axios';

const ScratchLottery = ({route}) => {
  const {wallet_Balance} = route.params;
  const [adminNumber, setAdminNumber] = useState(null); // Dynamic admin number
  const [selectedNumber, setSelectedNumber] = useState(null); // User-selected number
  const [betAmount, setBetAmount] = useState(''); // Bet amount input
  const [balance, setBalance] = useState(wallet_Balance); // User's balance
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://bulldog-solid-bream.ngrok-free.app/scratchLottery');
        const dataObject = response.data[0]; // Access the first object in the array

        // Extract numbers and convert them to an array
        const numbers = [
          parseInt(dataObject.first_number),
          parseInt(dataObject.second_number),
          parseInt(dataObject.third_number),
          parseInt(dataObject.fourth_number),
          parseInt(dataObject.fifth_number),
        ];

        setData(numbers); // Store the array of numbers
        setAdminNumber(parseInt(dataObject.winningNumber)); // Assuming the response contains an 'adminNumber'.
      } catch (error) {
        console.error(error);
        Alert.alert('Error fetching data', 'Please try again later.');
      }
    };
    getData();
  }, []);

  const handleSelectNumber = (number) => {
    setSelectedNumber(number);
  };

  const checkWinner = () => {
    const bet = parseFloat(betAmount);

    if (selectedNumber === null) {
      Alert.alert('Please select a number!');
      return;
    }

    if (isNaN(bet) || bet <= 0) {
      Alert.alert('Please enter a valid bet amount!');
      return;
    }

    if (bet > balance) {
      Alert.alert('Insufficient balance!');
      return;
    }

    setBalance(balance - bet);

    if (selectedNumber === adminNumber) {
      Alert.alert('Congratulations!', 'You have won the lottery!');
      setBalance((prevBalance) => prevBalance + bet * 2); // Double the bet amount
    } else {
      Alert.alert('Sorry!', 'You did not win. Better luck next time!');
    }
  };
  console.log(adminNumber)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scratch & Win</Text>
      <View>
        <Text style={styles.subHeader}>Your Balance: ${balance}</Text>
        <Text style={styles.subHeader}>These 5 Numbers are available. Select any one:</Text>
        {data.map((number, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.numberButton,
              selectedNumber === number && styles.selectedButton,
            ]}
            onPress={() => handleSelectNumber(number)}
          >
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Bet Amount"
        placeholderTextColor="#fff"
        value={betAmount}
        onChangeText={setBetAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.checkButton} onPress={checkWinner}>
        <Text style={styles.checkButtonText}>Check if You Win!</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
};

export default ScratchLottery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 30,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  numberButton: {
    padding: 15,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FFC107', // Highlight selected button
  },
  numberText: {
    fontSize: 18,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  checkButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkButtonText: {
    fontSize: 18,
    color: '#000',
  },
});
