import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HeadandTail = ({ route }) => {
  const { wallet_Balance } = route.params;
  const [selectedSide, setSelectedSide] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [animationValue] = useState(new Animated.Value(0));
  const [flippedSide, setFlippedSide] = useState(null);
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);
  const [walletBalance, setWalletBalance] = useState(wallet_Balance);
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const selectHead = () => setSelectedSide('Head');
  const selectTail = () => setSelectedSide('Tail');

  const animatedRotation = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '360deg', '720deg'], // Two full rotations
  });

  useEffect(() => {
    const getData = () => {
      axios.get('https://bulldog-solid-bream.ngrok-free.app/signup')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    };
    getData();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('emailId')
      .then(email => {
        if (email !== null) setEmail(email);
      })
      .catch(err => {
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

  const handleFlip = () => {
    if (selectedSide === null) {
      Alert.alert("Please select Head or Tail");
      return;
    }

    if (bidAmount === '' || parseFloat(bidAmount) <= 0) {
      Alert.alert("Please enter a valid bet amount");
      return;
    }

    const betAmount = parseFloat(bidAmount);
    if (betAmount > walletBalance) {
      Alert.alert("Insufficient wallet balance");
      return;
    }

    // Deduct the bet amount from the wallet balance before flipping
    const newWalletBalance = walletBalance - betAmount;
    setWalletBalance(newWalletBalance); // Update local wallet balance
    updateWalletBalance(newWalletBalance); // Update on server

    // Start the flipping animation
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 2000, // 2 seconds flip
      useNativeDriver: true,
    }).start(() => {
      animationValue.setValue(0);
      const outcome = Math.random() < 0.5 ? 'Head' : 'Tail';
      setFlippedSide(outcome);

      if (selectedSide === outcome) {
        const winnings = betAmount * 2; // Calculate winnings (double the bet)
        const updatedBalance = newWalletBalance + winnings;
        setResult(`You Win!`);
        setWalletBalance(updatedBalance); // Update local wallet balance
        updateWalletBalance(updatedBalance); // Update on server
      } else {
        setResult(`You Lose!`);
      }

      setSelectedSide(null);
    });
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
      game_name: 'Head & Tail',
      game_status: result,
      bet_price: bidAmount,
    };

    axios.post('https://bulldog-solid-bream.ngrok-free.app/games/data', data1)
      .then(res => console.log(res))
      .catch(err => console.log('Error while posting data:', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Head or Tail</Text>
      <Text style={styles.noteText}>Wallet Balance: {walletBalance}</Text>

      <View style={styles.imageContainer}>
        <Animated.View style={{ transform: [{ rotateY: animatedRotation }] }}>
          <Image
            source={
              flippedSide === 'Head'
                ? require('../../assets/images/head.png')
                : require('../../assets/images/tail.png')
            }
            style={styles.image}
          />
        </Animated.View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedSide === 'Head' && styles.selectedButton]}
          onPress={selectHead}
        >
          <Text style={styles.buttonText}>Head</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedSide === 'Tail' && styles.selectedButton]}
          onPress={selectTail}
        >
          <Text style={styles.buttonText}>Tail</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Enter amount"
        value={bidAmount}
        onChangeText={setBidAmount}
        keyboardType='numeric'
        placeholderTextColor="#888"
        style={styles.input}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleFlip}>
        <Text style={styles.addButtonText}>Add Bet</Text>
      </TouchableOpacity>

      {result ? <Text style={styles.noteText}>{result}</Text> : null}

      <View style={styles.navBar}>
        <Text style={styles.navText}>Home</Text>
        <Text style={styles.navText}>Lottery</Text>
        <Text style={styles.navText}>Wallet</Text>
        <Text style={styles.navText}>Setting</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 34,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginTop: 40,
  },
  imageContainer: {
    marginVertical: 20,
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  selectText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a4a4a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#f0b000',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  noteText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
   marginVertical: 30,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#f0b000',
    paddingVertical: 15,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    marginHorizontal: -20,
  },
  navText: {
    color: '#021324',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#4a4a4a',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#ffd700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#021324',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default HeadandTail;
