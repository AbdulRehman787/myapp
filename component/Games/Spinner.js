import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';

const gridSize = 3;
const gameTimeLimit = 60; // Time limit in seconds (1 minute)

const generateShuffledTiles = () => {
  const array = Array.from({ length: gridSize * gridSize }, (_, i) => i);
  // Shuffle tiles randomly (Fisher-Yates shuffle)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function PuzzleGame({ route }) {
  const { wallet_Balance } = route.params;
  const [tiles, setTiles] = useState(generateShuffledTiles());
  const emptyTile = tiles.indexOf(0); // The empty tile represented by '0'

  const [walletBalance, setWalletBalance] = useState(wallet_Balance); // Initial user balance
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [result, setResult] = useState(''); // State for storing the result of the game
  const [timer, setTimer] = useState(gameTimeLimit); // State for countdown timer
  const [gameOver, setGameOver] = useState(false); // State to track if the game is over
  const [betAmount, setBetAmount] = useState(''); // State to store bet amount
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started

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

  const isSolvable = (arr) => {
    // Logic to check if the current puzzle is solvable
    return true;
  };

  const isSolved = (arr) => {
    // Puzzle is solved if all tiles are in ascending order
    return arr.every((num, index) => num === index);
  };

  const swapTiles = (newIndex) => {
    let updatedTiles = [...tiles];
    [updatedTiles[emptyTile], updatedTiles[newIndex]] = [updatedTiles[newIndex], updatedTiles[emptyTile]];
    setTiles(updatedTiles);

    // Check if the puzzle is solved after swapping
    if (isSolved(updatedTiles)) {
      setResult('win');
      Alert.alert('Congratulations!', 'You solved the puzzle in time!');
      updateWalletBalance(walletBalance + parseFloat(betAmount)); // Add bet amount to wallet
      setGameOver(true); // Mark the game as over
    }
  };

  const moveTile = (tileIndex) => {
    if (gameOver) return; // Prevent moves after game is over

    const row = Math.floor(tileIndex / gridSize);
    const col = tileIndex % gridSize;
    const emptyRow = Math.floor(emptyTile / gridSize);
    const emptyCol = emptyTile % gridSize;

    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;
    if (isAdjacent) {
      swapTiles(tileIndex);
    }
  };

  useEffect(() => {
    if (!isSolvable(tiles)) {
      setTiles(generateShuffledTiles()); // Reshuffle if not solvable
    }
  }, []);

  // Timer Logic
  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup on unmount or game over
    } else if (timer === 0) {
      setResult('lose');
      Alert.alert('Time’s up!', 'You ran out of time!');
      setGameOver(true); // Mark the game as over
      updateWalletBalance(walletBalance - parseFloat(betAmount)); // Deduct bet amount from wallet
    }
  }, [timer, gameOver]);

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

  // Start Game function
  const startGame = () => {
    const bet = parseFloat(betAmount);
    if (isNaN(bet) || bet <= 0) {
      Alert.alert('Invalid Bet', 'Please enter a valid bet amount.');
      return;
    }
    if (walletBalance < bet) {
      Alert.alert('Insufficient Balance', 'You do not have enough balance to place this bet.');
      return;
    }
    
    // Deduct the bet amount from wallet and start the game
    setWalletBalance(walletBalance - bet);
    updateWalletBalance(walletBalance - bet); // Update wallet balance in backend
    setGameStarted(true);
    setGameOver(false);
    setTimer(gameTimeLimit);
    setTiles(generateShuffledTiles()); // Shuffle tiles for a new game
  };

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        <View>
          <Text style={styles.title}>Sliding Puzzle Game</Text>
          <Text style={styles.balance}>Wallet Balance {walletBalance}</Text>
          <TextInput
            style={styles.inp}
            placeholder="Enter Bet Amount"
            keyboardType="numeric"
            value={betAmount}
            onChangeText={setBetAmount}
            placeholderTextColor={'#ffd700'}
          />
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Sliding Puzzle Game</Text>
          <Text style={styles.balance}>Wallet Balance {walletBalance}</Text>
          <Text style={styles.bet}>Current Bet: {betAmount}</Text>
          <Text style={styles.timer}>Time Left: {timer} seconds</Text>
          <View style={styles.grid}>
            {tiles.map((tile, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tile, tile === 0 && styles.emptyTile]}
                onPress={() => moveTile(index)}
              >
                {tile !== 0 && <Text style={styles.tileText}>{tile}</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <Footer />
    </View>
  );
}

const tileSize = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  balance: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ffd700',
    textAlign: 'center',
  },
  bet: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ffd700',
    textAlign: 'center',
  },
  timer: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: tileSize * gridSize,
    justifyContent: 'center',
  },
  tile: {
    width: tileSize,
    height: tileSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#007acc',
    margin: 2,
  },
  emptyTile: {
    backgroundColor: '#021324',
  },
  tileText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  inp: {
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    padding: 12,
    backgroundColor: '#ffd700',

  },
  startButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    color: '#021324',
    fontFamily: 'Poppins-Regular',
  },
});
