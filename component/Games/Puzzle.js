import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';

const gridSize = 3;
const generateShuffledTiles = () => {
  const array = Array.from({ length: gridSize * gridSize }, (_, i) => i);
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
  const [betAmount, setBetAmount] = useState('');
  const [walletBalance, setWalletBalance] = useState(wallet_Balance);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(60); // 1 minute (60 seconds)
 
  const [isGameOver, setIsGameOver] = useState(false); // To track if the game is over
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
  // Timer logic to decrease the timer every second once the game starts
  useEffect(() => {
    let interval;
    if (gameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      handleGameLoss(); // Timer runs out, the user loses
      setIsGameOver(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, timer]);

  const startGame = () => {
    if (!betAmount || isNaN(betAmount) || parseFloat(betAmount) <= 0) {
      Alert.alert('Invalid Bet', 'Please enter a valid bet amount.');
      return;
    }
    if (parseFloat(betAmount) > walletBalance) {
      Alert.alert('Insufficient Balance', 'You do not have enough balance to place this bet.');
      return;
    }

    // Deduct bet amount and start the game
    const newBalance = walletBalance - parseFloat(betAmount);
    setWalletBalance(newBalance);
    updateWalletBalance(newBalance); // Update balance in backend
    setGameStarted(true); // Start the game
    setTimer(60); // Reset timer to 1 minute
  };

  const isSolved = (arr) => {
    return arr.every((num, index) => num === index);
  };

  const handleGameWin = () => {
    Alert.alert('Congratulations!', 'You solved the puzzle and won the game!');
    const winnings = parseFloat(betAmount) * 2; // User wins double the bet amount
    const newBalance = walletBalance + winnings;
    setWalletBalance(newBalance);
    updateWalletBalance(newBalance); // Update wallet balance in backend
    setGameStarted(false);
    setIsGameOver(true);
    setResult("Win ")
    setBetAmount('')

  };

  const handleGameLoss = () => {
    Alert.alert('Game Over', 'You ran out of time and lost the bet.');
    setGameStarted(false);
    setIsGameOver(true);
    setResult("Loss")
    setBetAmount('')
  };

  const moveTile = (tileIndex) => {
    if (!gameStarted || isGameOver) return;

    const row = Math.floor(tileIndex / gridSize);
    const col = tileIndex % gridSize;
    const emptyRow = Math.floor(emptyTile / gridSize);
    const emptyCol = emptyTile % gridSize;

    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;
    if (isAdjacent) {
      let updatedTiles = [...tiles];
      [updatedTiles[emptyTile], updatedTiles[tileIndex]] = [updatedTiles[tileIndex], updatedTiles[emptyTile]];
      setTiles(updatedTiles);

      // Check if the puzzle is solved after the tile is moved
      if (isSolved(updatedTiles)) {
        handleGameWin();
      }
    }
  };

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
    if (result) {
      postData();
    }
  }, [result]);

  const postData = () => {
    const data1 = {
      user_id: user_id,
      user_name: username,
      user_email: userEmail,
      game_name: 'Puzzle Game',
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
      <Text style={styles.title}>Sliding Puzzle Game</Text>
      <Text style={styles.balance}>Wallet Balance: {walletBalance}</Text>
      {gameStarted ? (
        <Text style={styles.timer}>Time Left: {timer}s</Text>
      ) : (
        <TextInput
          style={styles.inp}
          placeholder="Enter your bet amount"
          keyboardType="numeric"
          value={betAmount}
          onChangeText={setBetAmount}
          placeholderTextColor="#ffd700"
        />
      )}

  

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
      {!gameStarted && (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
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
    color: '#ffd700',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  balance: {
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  timer: {
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 10,
  },
  grid: {
    width: gridSize * tileSize,
    height: gridSize * tileSize,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal:"auto",
    marginVertical: 20,
  },
  tile: {
    width: tileSize,
    height: tileSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd700',
    borderWidth: 1,
    borderColor: '#fff',
  },
  emptyTile: {
    backgroundColor: '#021324',
  },
  tileText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#021324',
  },
  inp: {

    borderColor: '#ffd700',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    padding: 12,
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20
  },
  startButtonText: {
    fontSize: 18,
    color: '#021324',
    fontFamily: 'Poppins-Regular',
  },
});
