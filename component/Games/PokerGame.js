import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Footer from './Footer';

const PokerGame = ({ route }) => {
  const { wallet_Balance } = route.params;
  const [betAmount, setBetAmount] = useState('');
  const [multiplier, setMultiplier] = useState(1);
  const [isFlying, setIsFlying] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [crashPoint, setCrashPoint] = useState(0);
  const [coinPosition] = useState(new Animated.Value(0)); // Initial position of the coin
  const [coinRotation] = useState(new Animated.Value(0)); // Initial rotation of the coin
  const [walletBalance, setWalletBalance] = useState(wallet_Balance); // Initial user balance
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [result, setResult] = useState(''); // State for storing the result of the game (added)

  useEffect(() => {
    const getData = () => {
      axios
        .get('https://bulldog-solid-bream.ngrok-free.app/signup')
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('emailId')
      .then((email) => {
        if (email !== null) setEmail(email);
      })
      .catch((err) => {
        console.log('Dont Fetch Email');
      });
  }, []);

  const filterData = data.filter((item) => item.email === email);

  useEffect(() => {
    if (filterData.length > 0) {
      const user = filterData[0];
      setUserId(user.user_id);
      setUserName(user.name);
      setUserEmail(user.email);
    }
  }, [filterData]);

  const updateWalletBalance = async (newBalance) => {
    try {
      await axios.post('https://bulldog-solid-bream.ngrok-free.app/wallet/update', {
        userId: user_id,
        newBalance: newBalance,
      });
      setWalletBalance(newBalance); // Update the wallet balance in state
    } catch (err) {
      console.log('Error updating wallet balance:', err);
    }
  };

  useEffect(() => {
    let interval;
    if (isFlying) {
      // Animate coin flying from bottom to top
      Animated.parallel([
        Animated.timing(coinPosition, {
          toValue: -300, // Move upward (change as needed)
          duration: crashPoint * 1000, // Duration until the crash
          useNativeDriver: true,
        }),
        Animated.timing(coinRotation, {
          toValue: 1, // Rotate to 45 degrees
          duration: crashPoint * 1000, // Duration should match the position animation
          useNativeDriver: true,
        }),
      ]).start();

      interval = setInterval(() => {
        setMultiplier((prev) => (prev < crashPoint ? prev + 0.1 : prev));
      }, 100); // Increment every 100ms
    }
    return () => {
      clearInterval(interval);
      coinPosition.setValue(0); // Reset position when game ends
      coinRotation.setValue(0); // Reset rotation when game ends
    };
  }, [isFlying, crashPoint]);

  const startGame = () => {
    if (!betAmount || parseFloat(betAmount) <= 0 || parseFloat(betAmount) > walletBalance) {
      alert('Please enter a valid bet amount.');
      return;
    }

    setMultiplier(1);
    setIsFlying(true);
    setCrashPoint(Math.floor(Math.random() * (5 - 2 + 1)) + 2); // Random crash point between 2 and 5
    const updatedBalance = walletBalance - betAmount;
    setWalletBalance(updatedBalance);
    updateWalletBalance(updatedBalance);
    setTimeout(() => {
      setIsFlying(false);
      setResultMessage('The coin has crashed! Try again.');
      setResult('lost');
       // Set result as lost when the game crashes
     setBetAmount('');

    }, crashPoint * 1000); // Simulate crash after a random time
  };

  const cashOut = () => {
    if (!isFlying) {
      setResultMessage('You need to start the game first!');
      return;
    }

    const cashOutValue = (multiplier * parseFloat(betAmount)).toFixed(2);
    const profit = (multiplier * parseFloat(betAmount)) - parseFloat(betAmount); // Calculate profit
    const winnings = parseFloat(cashOutValue);
    const updatedBalance = Number(walletBalance + winnings);

    setWalletBalance(updatedBalance); // Update wallet balance state
    updateWalletBalance(updatedBalance); // Update balance in the backend
    setIsFlying(false);

    setResultMessage(`You cashed out! Your winnings: $${cashOutValue}. Your new balance: $${(walletBalance + profit).toFixed(2)}`);
    setResult('won');
     // Set result as won when the user cashes out
     setBetAmount('');
  };

  useEffect(() => {
    if (result) {
      postData();
    }
  }, [result]);

  const postData = () => {
    const data1 = {
      user_id: user_id,
      user_name: username,
      user_email: userEmail,
      game_name: 'CoinPilot',
      game_status: result,
      bet_price: betAmount,
    };

    axios
      .post('https://bulldog-solid-bream.ngrok-free.app/games/data', data1)
      .then((res) => console.log('GameData Added'))
      .catch((err) => console.log('Error while posting data:', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinPilot Betting Game</Text>
      <Text style={styles.balanceText}>Wallet Balance: {walletBalance}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your bet amount"
        keyboardType="numeric"
        value={betAmount}
        onChangeText={setBetAmount}
        placeholderTextColor="#ffd700"
      />

      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>

      {isFlying && (
        <>
          <View style={styles.multiplierDisplay}>
            <Text style={styles.multiplierText}>Multiplier: {multiplier.toFixed(1)}x</Text>
          </View>
          <TouchableOpacity style={styles.cashOutButton} onPress={cashOut}>
            <Text style={styles.cashOutButtonText}>Cash Out</Text>
          </TouchableOpacity>
        </>
      )}

      {isFlying && (
        <Animated.View
          style={{
            transform: [
              { translateY: coinPosition }, // Move vertically
              {
                rotate: coinRotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '45deg'], // Rotate from 0 to 45 degrees
                }),
              },
            ],
          }}
        >
          <Image source={require('../../assets/images/coin1.png')} style={styles.coinImage} />
        </Animated.View>
      )}

      {resultMessage && <Text style={styles.resultMessage}>{resultMessage}</Text>}
      <Footer />
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
    fontSize: 28,
    color: '#ffd700',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  balanceText: {
    fontSize: 22,
    color: '#ffd700',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: 40,
    borderColor: '#ffd700',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    padding: 10,
    color: '#ffd700',
    borderRadius: 10
  },
  startButton: {
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    borderWidth : 2,
  },
  startButtonText: {
    fontSize: 18,
    color: '#021324',
    fontFamily: 'Poppins-Regular',
    textAlign:"center"
  },
  multiplierDisplay: {
    marginVertical: 10,
  },
  multiplierText: {
    fontSize: 30,
    color: '#ffd700',
    fontFamily: 'Poppins-Regular',
  },
  cashOutButton: {
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  cashOutButtonText: {
    fontSize: 18,
    color: '#021324',
    fontFamily: 'Poppins-Regular',
  },
  coinImage: {
    width: 100,
    height: 100,
  },
  resultMessage: {
    fontSize: 18,
    color: '#ffd700',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default PokerGame;
