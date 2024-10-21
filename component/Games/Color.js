import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer'; // Import your Footer component

const Color = ({ route }) => {
  const { wallet_Balance } = route.params;
  const [result, setResult] = useState('');
  const [walletBalance, setWalletBalance] = useState(wallet_Balance);
  const [betAmount, setBetAmount] = useState(100);
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [data, setData] = useState([]);

  const initialColors = [
    { id: 1, name: 'Red', odds: 2.0 },
    { id: 2, name: 'Green', odds: 1.5 },
    { id: 3, name: 'Blue', odds: 3.0 },
  ];

  const initialUser = {
    balance: 1000,
    bets: [],
  };

  const initialRound = {
    id: 1,
    timer: 60,
    status: 'ongoing', // 'ongoing' or 'finished'
    winner: null,
  };

  const [colors] = useState(initialColors);
  const [user, setUser] = useState(initialUser);
  const [round, setRound] = useState(initialRound);
  const [timeLeft, setTimeLeft] = useState(round.timer);

  // Timer Effect
  useEffect(() => {
    if (round.status === 'ongoing' && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft <= 0) {
      handleTimeUp();
    }
  }, [timeLeft, round.status]);

  // Handle Bet
  const handleBet = useCallback((colorId) => {
    if (walletBalance >= betAmount && round.status === 'ongoing') {
      setUser((prevUser) => ({
        ...prevUser,
        balance: prevUser.balance - betAmount,
        bets: [...prevUser.bets, { colorId, amount: betAmount, roundId: round.id }],
      }));
    } else {
      Alert.alert("Insufficient balance or round is not ongoing.");
    }
  }, [walletBalance, betAmount, round.status]);

  // Handle Time Up and Determine Winner
  const handleTimeUp = () => {
    const winnerColorId = colors[Math.floor(Math.random() * colors.length)].id;

    setRound((prevRound) => ({
      ...prevRound,
      status: 'finished',
      winner: winnerColorId,
    }));

    // Calculate winnings for user bets
    const winningBets = user.bets.filter(
      (bet) => bet.roundId === round.id && bet.colorId === winnerColorId
    );

    const totalWinnings = winningBets.reduce(
      (sum, bet) => sum + bet.amount * colors.find((c) => c.id === winnerColorId).odds,
      0
    );

    const updatedBalance = walletBalance + totalWinnings;

    // Update local wallet balance
    setWalletBalance(updatedBalance);

    // Update the user's balance in the backend
    updateWalletBalance(updatedBalance);

    // Record the game result (Win or Lose)
    const gameResult = totalWinnings > 0 ? 'Win' : 'Lose';
    postData(gameResult, updatedBalance);

    // Clear user bets after the round
    setUser((prevUser) => ({
      ...prevUser,
      bets: [], // Clear bets after the round
    }));

    // Start new round after 5 seconds
    setTimeout(() => {
      setRound({
        id: round.id + 1,
        timer: 60,
        status: 'ongoing',
        winner: null,
      });
      setTimeLeft(60);
    }, 5000);
  };

  const updateWalletBalance = async (newBalance) => {
    try {
      await axios.post('https://bulldog-solid-bream.ngrok-free.app/wallet/update', {
        userId: user_id,
        newBalance: newBalance,
      });
      console.log('Wallet balance updated successfully.');
    } catch (err) {
      console.log('Error updating wallet balance:', err);
    }
  };

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
      .catch((err) => console.log('Error fetching email:', err));
  }, []);

  const postData = (gameResult, updatedBalance) => {
    const data = {
      user_id: user_id,
      user_name: username,
      user_email: userEmail,
      game_name: 'Color Prediction Game',
      game_status: gameResult,
      bet_price: walletBalance, // Use wallet balance as bet price
    };
    axios
      .post('https://bulldog-solid-bream.ngrok-free.app/games/data', data)
      .then((res) => console.log(res))
      .catch((err) => console.log('Error posting data:', err));
  };

  const filterData = data.filter((item) => item.email === email);

  useEffect(() => {
    if (filterData.length > 0) {
      const user = filterData[0]; // Assuming the filter will return only one user
      setUserId(user.user_id); // Update user_id state
      setUserName(user.name); // Update username state
      setUserEmail(user.email); // Update userEmail state
    }
  }, [filterData]);

  // Increment and decrement bet amount functions
  const incrementBet = () => {
    setBetAmount((prev) => prev + 10); // Increment bet by 10
  };

  const decrementBet = () => {
    setBetAmount((prev) => (prev > 10 ? prev - 10 : prev)); // Decrement bet by 10 but not below 10
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Color Prediction Game</Text>
      <Text style={styles.balance}>Wallet Balance: {walletBalance}</Text>
      <Text style={styles.timer}>Time Left: {timeLeft} seconds</Text>

      {/* Bet Amount Control */}
      <View style={styles.betControl}>
        <TouchableOpacity onPress={decrementBet} style={styles.betButton}>
          <Text style={styles.betButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.betAmount}>{betAmount}</Text>
        <TouchableOpacity onPress={incrementBet} style={styles.betButton}>
          <Text style={styles.betButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Render Colors */}
      {round.status === 'ongoing' ? (
        <FlatList
          data={colors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.colorItem}>
              <Text style={styles.colorName}>
                {item.name} - Odds: {item.odds}x
              </Text>
              <TouchableOpacity style={styles.btn} onPress={() => handleBet(item.id)}>
                <Text style={styles.btntext}>{`Bet on ${item.name}`}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.winner}>
          Round over! Winner: {colors.find((c) => c.id === round.winner)?.name || 'Unknown'}
        </Text>
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: "#FFF",
  },
  balance: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: "#FFF",
  },
  timer: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: "#FFF",
  },
  betControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  betButton: {
    width: 40,
    height: 40,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  betButtonText: {
    fontSize: 24,
    color: '#FFF',
  },
  betAmount: {
    fontSize: 18,
    marginHorizontal: 20,
    color: "#FFF",
  },
  colorItem: {
    backgroundColor: '#1D1D1D',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  colorName: {
    fontSize: 18,
    color: "#FFF",
  },
  btn: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  btntext: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  winner: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFD700',
  },
});

export default Color;
