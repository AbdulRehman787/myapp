import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  ScrollView
} from 'react-native';
import PushNotification from 'react-native-push-notification';

// Dice images
const diceImages = {
  1: require('../../assets/images/1.png'),
  2: require('../../assets/images/2.png'),
  3: require('../../assets/images/3.png'),
  4: require('../../assets/images/4.png'),
  5: require('../../assets/images/5.png'),
  6: require('../../assets/images/6.png'),
};

// Dice Game Component
const DiceGame = ({ route }) => {
  const { wallet_Balance } = route.params;
  const [firstDice, setFirstDice] = useState(2);
  const [secondDice, setSecondDice] = useState(4);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [betType, setBetType] = useState('over');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [walletBalance, setWalletBalance] = useState(wallet_Balance);
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [data , setData] = useState([])



  // // Push notification setup function
  // const LocalNotification = () => {
  //   const key = Date.now().toString();
  //   // Create a unique notification channel
    
  //   PushNotification.createChannel(
  //     {
  //       channelId: key,
  //       channelName: 'Local Notification',
  //       channelDescription: 'Dice Game notifications',
  //       importance: 4,
  //       vibrate: true,
  //     },
  //     (created) => console.log(`Channel created: ${created}`)
  //   );

  //   // Trigger the local notification
  //   PushNotification.localNotification({
  //     channelId: key,
  //     title: 'Dice Game',
  //     message: result,
  //   });
  // };

  
  // Animation reference
  const diceRotation = useRef(new Animated.Value(0)).current;

  const randomNum = (min = 1, max = 6) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Dice animation
  const startDiceRotation = () => {
    diceRotation.setValue(0);
    Animated.timing(diceRotation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const rollDiceOnTap = async () => {
    if (!selectedNumber) {
      setError('Please select a number');
      return;
    }
    if (!bidAmount) {
      setError('Please enter your bid amount');
      return;
    }
    if (parseFloat(bidAmount) > parseFloat(walletBalance)) {
      setError('Insufficient balance');
      return;
    }
    if (selectedNumber < 1 || selectedNumber > 6) {
      setError('Please select a number between 1 and 6');
      return;
    }

    const newFirstDice = randomNum();
    const newSecondDice = randomNum();
    setFirstDice(newFirstDice);
    setSecondDice(newSecondDice);

    // Start dice rotation
    startDiceRotation();

    const diceSum = newFirstDice + newSecondDice;
    let gameResult = '';

    if (betType === 'over' && diceSum > parseInt(selectedNumber)) {
      gameResult = 'You Win! (Over)';

     
    } else if (betType === 'under' && diceSum <= parseInt(selectedNumber)) {
      gameResult = 'You Win! (Under)';
     
    } else {
      gameResult = 'You Lose!';
     
    }

    const updatedBalance = gameResult.includes('Win')
      ? parseFloat(walletBalance) + parseFloat(bidAmount)
      : parseFloat(walletBalance) - parseFloat(bidAmount);

    setWalletBalance(updatedBalance.toFixed(2));

    await AsyncStorage.setItem('walletBalance', updatedBalance.toString());
    updateWalletBalance(updatedBalance);

    postData(gameResult, updatedBalance);

    setResult(gameResult);
    setSelectedNumber('');
    setBidAmount('');
    setError('');
  };

  const updateWalletBalance = async (newBalance) => {
   
    try {
      await axios.post('https://bulldog-solid-bream.ngrok-free.app/wallet/update', {
        userId: user_id,
        newBalance: newBalance,
      });
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
      game_name: 'Dice Game',
      game_status: gameResult,
      bet_price: bidAmount,
    
    };
    axios
      .post('https://bulldog-solid-bream.ngrok-free.app/games/data', data)
      .then((res) => console.log(res))
      .catch((err) => console.log('Error posting data:', err));
  };

  const rotateDice = diceRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const filterData = data.filter((item) => item.email === email);

  useEffect(() => {
    if (filterData.length > 0) {
      const user = filterData[0]; // Assuming the filter will return only one user
      setUserId(user.user_id); // Update user_id state
      setUserName(user.name); // Update username state
      setUserEmail(user.email); // Update userEmail state
    }
  }, [filterData]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dice Game</Text>

      <View style={styles.diceContainer}>
        <Animated.Image
          style={[styles.diceImage, { transform: [{ rotate: rotateDice }] }]}
          source={diceImages[firstDice]}
        />
        <Animated.Image
          style={[styles.diceImage, { transform: [{ rotate: rotateDice }] }, styles.lite]}
          source={diceImages[secondDice]}
        />
      </View>

      <View>
        <Text style={styles.balanceText}>Current Balance: {walletBalance}</Text>

        <TextInput
          placeholder="Select a Number (1-6)"
          value={selectedNumber}
          onChangeText={setSelectedNumber}
          keyboardType="phone-pad"
          placeholderTextColor="#ffd700"
          style={styles.input}
        />

        <TextInput
          placeholder="Enter Amount"
          value={bidAmount}
          onChangeText={setBidAmount}
          keyboardType="numeric"
          placeholderTextColor="#ffd700"
          style={styles.input}
        />

        <View style={styles.betTypeContainer}>
          <TouchableOpacity
            style={[styles.betTypeButton, betType === 'over' && styles.selectedBetType]}
            onPress={() => setBetType('over')}
          >
            <Text style={styles.betTypeText}>Over</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.betTypeButton, betType === 'under' && styles.selectedBetType]}
            onPress={() => setBetType('under')}
          >
            <Text style={styles.betTypeText}>Under</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={rollDiceOnTap}>
          <Text style={styles.addButtonText}>Place Bet</Text>
        </TouchableOpacity>

        {result && <Text style={styles.resultText}>{result}</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.noteText}>* Ensure your wallet has enough funds to place a bet.</Text>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <Text style={styles.navText}>Home</Text>
        <Text style={styles.navText}>Lottery</Text>
        <Text style={styles.navText}>Wallet</Text>
        <Text style={styles.navText}>Settings</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#021324',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    color: '#ffd700',
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  diceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  diceImage: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
  lite: {
    tintColor: '#FFD700',
  },
  balanceText: {
    color: '#ffd700',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ffd700',
    borderWidth: 2,
    padding: 10,
    color: '#021324',
    borderRadius: 10,
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  betTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  betTypeButton: {
    padding: 15,
    borderRadius: 10,
    borderColor: '#ffd700',
    borderWidth: 2,
  },
  selectedBetType: {
    backgroundColor: '#ffd700',
  },
  betTypeText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  addButton: {
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  addButtonText: {
    color: '#021324',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  resultText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginVertical: 10,
  },
  noteText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginVertical: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: '#ffd700',
  },
  navText: {
    color: '#ffd700',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default DiceGame;
