import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';

// Function to get a random crash point
const getRandomCrashPoint = () => {
  return (Math.random() * 8.5 + 1.5).toFixed(2); // Random crash multiplier between 1.5 and 10x
};

export default function JetX({ route }) {
  const { wallet_Balance } = route.params;
  const [multiplier, setMultiplier] = useState(1);
  const [betAmount, setBetAmount] = useState(0);
  const [cashOutMultiplier, setCashOutMultiplier] = useState(null);
  const [isBetting, setIsBetting] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [crashPoint, setCrashPoint] = useState(getRandomCrashPoint());
  const intervalRef = useRef(null);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [walletBalance, setWalletBalance] = useState(wallet_Balance);

  // Fetch user data from backend
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://bulldog-solid-bream.ngrok-free.app/signup');
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // Fetch email from AsyncStorage
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const emailFromStorage = await AsyncStorage.getItem('emailId');
        if (emailFromStorage !== null) setEmail(emailFromStorage);
      } catch (err) {
        console.log('Dont Fetch Email');
      }
    };
    fetchEmail();
  }, []);

  const filterData = data.filter((item) => item.email === email);

  // Set user data after filtering
  useEffect(() => {
    if (filterData.length > 0) {
      const user = filterData[0]; // Assuming the filter will return only one user
      setUserId(user.user_id); // Update user_id state
      setUserName(user.name); // Update username state
      setUserEmail(user.email); // Update userEmail state
    }
  }, [filterData]);

  // Update wallet balance in the backend
  const updateWalletBalance = async (newBalance) => {
    try {
      const response = await axios.post('https://bulldog-solid-bream.ngrok-free.app/wallet/update', {
        userId: user_id,
        newBalance: newBalance,
      });
      console.log('Wallet balance updated:', response.data);
      setWalletBalance(newBalance); // Update the wallet balance in state
    } catch (err) {
      console.log('Error updating wallet balance:', err.response ? err.response.data : err.message);
    }
  };

  // Prepare data to post game results
  const data1 = {
    user_id: user_id,
    user_name: username,
    user_email: userEmail,
    game_name: 'JetX',
    game_status: isCrashed ? 'Crashed' : 'Winner', // Updated result state
    bet_price: betAmount,
  };

  // Post game data to backend
  const postData = async () => {
    try {
      const response = await axios.post('https://bulldog-solid-bream.ngrok-free.app/games/data', data1);
      console.log("Game Data Added", response.data);
    } catch (err) {
      console.log('Error while posting data:', err.response ? err.response.data : err.message);
    }
  };

  // Effect to increase multiplier while betting
  useEffect(() => {
    if (isBetting && !isCrashed) {
      intervalRef.current = setInterval(() => {
        setMultiplier((prevMultiplier) => prevMultiplier + 0.1);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isBetting, isCrashed]);

  // Effect to check if crash point is reached
  useEffect(() => {
    if (multiplier >= crashPoint) {
      setIsCrashed(true);
      clearInterval(intervalRef.current);
      Alert.alert('Crashed!', `The game crashed at ${crashPoint}x`);
    }
  }, [multiplier]);

  // Function to place a bet
  const handlePlaceBet = () => {
    if (betAmount <= 0) {
      Alert.alert('Error', 'You must place a valid bet!');
      return;
    }
    setMultiplier(1); // Reset multiplier
    setCrashPoint(getRandomCrashPoint()); // Set new crash point
    setIsCrashed(false);
    setIsBetting(true);
    setCashOutMultiplier(null);
  };

  // Function to cash out
  const handleCashOut = () => {
    if (!isBetting) return;

    // Stop the betting process
    setIsBetting(false);

    // Calculate the winnings
    const winnings = betAmount * multiplier.toFixed(2);

    // Update the wallet balance
    const newBalance = walletBalance + winnings;
    setWalletBalance(newBalance); // Update the wallet balance in state

    // Post the updated balance to the backend
    updateWalletBalance(newBalance);

    // Set the cash out multiplier and display the winnings
    setCashOutMultiplier(multiplier.toFixed(2));

    // Post game data
    postData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JetX Game</Text>
      <Text style={styles.balance}>Wallet Balance: $ {walletBalance}</Text>

      <TextInput
        style={styles.inp}
        placeholder="Enter Bet Amount"
        keyboardType="numeric"
        value={betAmount.toString()} // Ensure the value is displayed as a string
        onChangeText={(value) => setBetAmount(parseFloat(value) || 0)} // Parse the value as a number
        placeholderTextColor={'#021324'}
      />

      {/* Display the current multiplier */}
      <Text style={styles.multiplierText}>
        {isCrashed ? `Crashed at ${crashPoint}x` : `Multiplier: ${multiplier.toFixed(2)}x`}
      </Text>

      <View style={styles.betSection}>
        {!isBetting ? (
          <>
            {/* Betting amount input */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => setBetAmount(betAmount + 5)} style={styles.button}>
                <Text style={styles.buttonText}>Increase Bet (+05)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setBetAmount(betAmount > 0 ? betAmount - 5 : 0)} style={styles.button}>
                <Text style={styles.buttonText}>Decrease Bet (-05)</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.betText}>Bet Amount: ${betAmount}</Text>

            {/* Place bet button */}
            <TouchableOpacity onPress={handlePlaceBet} style={styles.button}>
              <Text style={styles.buttonText}>Place Bet</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Cash-out button */}
            <TouchableOpacity onPress={handleCashOut} style={styles.button}>
              <Text style={styles.buttonText}>Cash Out</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Display winnings */}
      {cashOutMultiplier && (
        <Text style={styles.winningsText}>
          You cashed out at {cashOutMultiplier}x and won ${(betAmount * cashOutMultiplier).toFixed(2)}!
        </Text>
      )}
      <Footer />
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 30
  },
  title: {
    fontSize: 32,
    color: '#ffd700',
    marginBottom: 20,
    textAlign: "center"
  },
  balance: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins-Regular"
  },
  multiplierText: {
    fontSize: 30,
    color: '#fff',
    marginVertical: 30,
  },
  betSection: {
    alignItems: 'center',
  },
  betText: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ffd700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#021324',
    fontSize: 18,
  },
  winningsText: {
    fontSize: 20,
    color: '#ffd700',
    marginVertical: 20,
    textAlign: 'center',
  },
  inp: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 18,
    color: '#021324',
  },
});
