import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Footer from './Footer';

const GRID_SIZE = 5; // 5x5 grid
const TOTAL_MINES = 5; // Number of mines on the grid

const generateGrid = () => {
  const grid = Array(GRID_SIZE * GRID_SIZE).fill({ isMine: false, revealed: false });
  let mineCount = 0;

  while (mineCount < TOTAL_MINES) {
    const randomIndex = Math.floor(Math.random() * grid.length);
    if (!grid[randomIndex].isMine) {
      grid[randomIndex] = { isMine: true, revealed: false };
      mineCount++;
    }
  }
  return grid;
};

export default function MinesGame({ route }) {
  const { wallet_Balance } = route.params; // Assuming initial balance is passed through route
  const [grid, setGrid] = useState(generateGrid);
  const [betAmount, setBetAmount] = useState(0); // Bet amount will reset after the game
  const [revealedTiles, setRevealedTiles] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [walletBalance, setWalletBalance] = useState(wallet_Balance);
  const [multiplier, setMultiplier] = useState(1);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [result, setResult] = useState('');

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

  const handlePlaceBet = () => {
    if (betAmount <= 0) {
      Alert.alert('Error', 'Please place a valid bet to start the game.');
      return;
    }

    if (betAmount > walletBalance) {
      Alert.alert('Error', 'You do not have enough balance.');
      return;
    }

    setGameOver(false);
    setRevealedTiles(0);
    setMultiplier(1); // Reset multiplier
    setGrid(generateGrid()); // Reset grid after placing bet
   
  };

  const handleTilePress = (index) => {
    if (gameOver || grid[index].revealed || betAmount <= 0) {
      if (betAmount <= 0) {
        Alert.alert('Error', 'Please place a bet before playing.');
      }
      return;
    }

    const updatedGrid = [...grid];
    updatedGrid[index] = { ...updatedGrid[index], revealed: true }; // Reveal only the clicked tile

    if (updatedGrid[index].isMine) {
      // User hits a mine, game over, and they lose the bet
      Alert.alert('Game Over', 'You hit a mine! You lost your bet.');
      setWalletBalance(walletBalance - betAmount); // Deduct the bet amount from the balance
      setGameOver(true);
      setResult('Lose'); // Set result to 'Lose'
    } else {
      // Safe box, update multiplier and show the new balance
      const newRevealedTiles = revealedTiles + 1;
      const newMultiplier = 1 + newRevealedTiles * 0.2; // Increase multiplier for each safe tile
      setMultiplier(newMultiplier);
      setRevealedTiles(newRevealedTiles);
    }

    setGrid(updatedGrid); // Update the grid
  };

  const handleCashOut = () => {
    if (!gameOver && revealedTiles > 0) {
      const winnings = betAmount * multiplier;
      const newBalance = walletBalance + winnings; // Calculate new balance after winnings

      // Send updated balance to backend

      Alert.alert('Cash Out', `You cashed out and won $${winnings.toFixed(2)}!`);
      setGameOver(true);
      setWalletBalance(newBalance); // Update balance in state
      updateWalletBalance(newBalance);
      setResult('Win'); // Set result to 'Win'
    } else {
      Alert.alert('Error', 'You cannot cash out right now.');
    }
  };

  useEffect(() => {
    if (result) {
      postData(); // Send game data to the backend when the game is finished
    }
    if (gameOver) {
      setTimeout(() => {
        setGrid(generateGrid()); // Reset the grid
        setBetAmount(0); // Reset the bet amount after the game ends
      }, 1000); // Reset after 1 second
    }
  }, [result, gameOver]);

  const postData = () => {
    const data1 = {
      user_id: user_id,
      user_name: username,
      user_email: userEmail,
      game_name: 'Mines Game',
      game_status: result,
      bet_price: betAmount,
    };

    axios
      .post('https://bulldog-solid-bream.ngrok-free.app/games/data', data1)
      .then((res) => console.log('GameData Added'))
      .catch((err) => console.log('Error while posting data:', err));
  };

  const renderTile = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.tile, item.revealed ? (item.isMine ? styles.mine : styles.safe) : null]}
      onPress={() => handleTilePress(index)}
    >
      {item.revealed ? (
        <Text style={styles.tileText}>{item.isMine ? '💣' : '💎'}</Text>
      ) : (
        <Text style={styles.tileText}></Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.gameName}>Mines Game</Text>
        <Text style={styles.balance}>Wallet Balance: {walletBalance}</Text>

        {/* Bet amount section */}
        <View style={styles.betSection}>
          <Text style={styles.betText}>Bet Amount: ${betAmount}</Text>
          <View style={styles.betbutton}>
            <TouchableOpacity onPress={() => setBetAmount(betAmount + 5)} style={styles.button}>
              <Text style={styles.buttonText}>Increase Bet (+05)</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setBetAmount(betAmount > 0 ? betAmount - 5 : 0)} style={styles.button}>
              <Text style={styles.buttonText}>Decrease Bet (-05)</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handlePlaceBet} style={styles.button}>
            <Text style={styles.buttonText}>Place Bet</Text>
          </TouchableOpacity>
        </View>

        {/* Game grid */}
        <View style={styles.grid}>
          <FlatList
            data={grid}
            numColumns={GRID_SIZE}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTile}
          />
        </View>

        <Text style={styles.infoText}>
          Revealed Safe Tiles: {revealedTiles} / {GRID_SIZE * GRID_SIZE - TOTAL_MINES}
        </Text>
        <Text style={styles.infoText}>Multiplier: x{multiplier.toFixed(2)}</Text>

        {/* Cashout button */}
        <TouchableOpacity onPress={handleCashOut} style={styles.button}>
          <Text style={styles.buttonText}>Cash Out</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    padding: 20,
  },
  gameName: {
    fontSize: 28,
    fontFamily: 'Poppins_Regular',
    textAlign: 'center',
    color: '#fff',
  },
  balance: {
    fontSize: 20,
    fontFamily: 'Poppins_Regular',
    textAlign: 'center',
    color: '#ffd700',
    marginBottom: 20,
  },
  betSection: {
    marginBottom: 20,
  },
  betText: {
    fontSize: 18,
    fontFamily: 'Poppins_Regular',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  betbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grid: {
    marginBottom: 20,
  },
  tile: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  mine: {
    backgroundColor: 'red',
  },
  safe: {
    backgroundColor: 'green',
  },
  tileText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins_Regular',
    color: '#021324',
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Poppins_Regular',
    color: '#fff',
    textAlign: 'center',
  },
});
