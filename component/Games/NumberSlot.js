import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  Alert,
  Dimensions,
  Easing,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Slot symbols
const symbols = ['🍒', '🍋', '🔔', '💎', '🍀', '🍇', '7️⃣'];

// Helper function to generate random slot symbols
const getRandomSymbols = () => {
  return [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];
};

// Check if all symbols are the same (win condition)
const checkWin = (slots) => {
  return slots[0] === slots[1] && slots[1] === slots[2];
};

// Main Slot Game Component
const SlotGame = ({ route }) => {
  const { wallet_Balance } = route.params;
  const [slotSymbols, setSlotSymbols] = useState(getRandomSymbols());
  const [bidAmount, setBidAmount] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [walletBalance, setWalletBalance] = useState(wallet_Balance);
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [data, setData] = useState([]);

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

  const postGameData = (gameResult) => {
    const data = {
      user_id: user_id,
      user_name: username,
      user_email: userEmail,
      game_name: 'Slot Game',
      game_status: gameResult,
      bet_price: bidAmount,
    };  
    axios
      .post('https://bulldog-solid-bream.ngrok-free.app/games/data', data)
      .then((res) => console.log('Game data added'))
      .catch((err) => console.log('Error posting game data:', err));
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

  // Animated values for each reel
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animatedValue3 = useRef(new Animated.Value(0)).current;

  // Spin the reels
  const spinSlots = () => {
    if (walletBalance < bidAmount) {
      Alert.alert('Insufficient balance!', 'Please add more funds to play.');
      return;
    }

    if (isSpinning) {
      return; // Prevent double spin
    }

    setIsSpinning(true);
    setResultMessage(''); // Clear result message

    // Start the spin animation with random direction
    const getRandomDirection = () => (Math.random() > 0.5 ? 1 : -1); // Randomly up or down

    Animated.parallel([
      Animated.timing(animatedValue1, {
        toValue: getRandomDirection(),
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: getRandomDirection(),
        duration: 3500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue3, {
        toValue: getRandomDirection(),
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation ends, reset animated values
      animatedValue1.setValue(0);
      animatedValue2.setValue(0);
      animatedValue3.setValue(0);

      // Generate new symbols for each reel after spin ends
      const newSymbols = getRandomSymbols();
      setSlotSymbols(newSymbols);

      // Check for win
      if (checkWin(newSymbols)) {
        const winnings = bidAmount * 10; // Calculate winnings based on bid amount
        Alert.alert('You Win!', `Congratulations! You won ${winnings} coins!`);
        
        // Update wallet balance for winnings
        const updatedBalance = walletBalance + winnings; 
        setWalletBalance(updatedBalance); // Update wallet balance state
        updateWalletBalance(updatedBalance); // Update balance in backend
        setResultMessage(`You Won ${winnings} coins!`);
        postGameData('win'); // Post win game data
      } else {
        // Update wallet balance for loss
        const updatedBalance = walletBalance - bidAmount; 
        setWalletBalance(updatedBalance); // Update wallet balance state
        updateWalletBalance(updatedBalance); // Update balance in backend
        setResultMessage('Try Again! Better luck next time!');
        postGameData('lose'); // Post lose game data
      }
      setIsSpinning(false);
    });
  };

  const updateWalletBalance = async (newBalance) => {
    try {
      await axios.post('https://bulldog-solid-bream.ngrok-free.app/wallet/update', {
        userId: user_id,
        newBalance: newBalance, // Use newBalance directly
      });
      console.log('Wallet balance updated in backend.');
    } catch (err) {
      console.log('Error updating wallet balance:', err);
    }
  };

  // Function to get slot animation style
  const getSlotStyle = (animatedValue) => ({
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [-1, 1],
          outputRange: [-100, 100], // Moves either up or down
        }),
      },
    ],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎰 Slot Game 🎰</Text>
      <Text style={styles.balance}>Balance:{walletBalance}  
      </Text>

      {/* Slot machine reels */}
      <View style={styles.slotContainer}>
        <Animated.View style={[styles.slotSymbolContainer, getSlotStyle(animatedValue1)]}>
          <Text style={styles.slotSymbol}>{slotSymbols[0]}</Text>
        </Animated.View>

        <Animated.View style={[styles.slotSymbolContainer, getSlotStyle(animatedValue2)]}>
          <Text style={styles.slotSymbol}>{slotSymbols[1]}</Text>
        </Animated.View>

        <Animated.View style={[styles.slotSymbolContainer, getSlotStyle(animatedValue3)]}>
          <Text style={styles.slotSymbol}>{slotSymbols[2]}</Text>
        </Animated.View>
      </View>

      {/* Result message */}
      {resultMessage ? <Text style={styles.resultText}>{resultMessage}</Text> : null}

      
      <TextInput
          placeholder="Enter Amount"
          value={bidAmount}
          onChangeText={setBidAmount}
          keyboardType="numeric"
          placeholderTextColor="#ffd700"
          style={styles.input}
        />
      <TouchableOpacity style={styles.btn} onPress={spinSlots}>
        <Text style={styles.btntext}>Spin</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={styles.btn1} onPress={() => setBidAmount(bidAmount + 5)}>
          <Text style={styles.btntext}>Increase Bet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn1} onPress={() => setBidAmount(bidAmount > 5 ? bidAmount - 5 : 5)}>
          <Text style={styles.btntext}>Decrease Bet</Text>
        </TouchableOpacity>
      </View>

      {/* Footer with navigation */}
      <Footer />
    </View>
  );
};

// Footer Component
const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('SlotGame1')}
      >
        <Text style={styles.footerButtonText}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Lottery')}
      >
        <Text style={styles.footerButtonText}>Lottery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Wallet')}
      >
        <Text style={styles.footerButtonText}>Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Setting')}
      >
        <Text style={styles.footerButtonText}>Setting</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#021324',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    color: '#ffd700',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  balance: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    height: 100, // Fixed height for slots
    width: width * 0.9, // 90% of screen width
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 'auto',
  },
  slotSymbolContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotSymbol: {
    fontSize: 50,
    color: '#ffd700',
  },
  betText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    padding: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  btn: {
    padding: 16,
    backgroundColor: '#ffd700',
    borderRadius: 10,
  },
  btn1: {
    paddingVertical: 12,
    paddingHorizontal: 26,
    width: '100',
    backgroundColor: '#ffd700',
    borderRadius: 10,
  },
  btntext: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  resultText: {
    fontSize: 24,
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '110%',
    backgroundColor: '#ffd700',
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius:15,
    
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerButtonText: {
    color: '#021324',
    fontSize: 16,
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
});

export default SlotGame;
