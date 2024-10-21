import axios from 'axios';
import React, { useState, useEffect ,useRef} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';
const RockPaper = ({route}) => {
  const {wallet_Balance } = route.params;
  const [selectedChoice, setSelectedChoice] = useState('');
  const [betAmount, setBetAmount] = useState('');
  const [result, setResult] = useState('');
  const [userBalance, setUserBalance] = useState(1000); // Starting balance
  const [countdown, setCountdown] = useState(5); // Countdown starting at 5 seconds
  const [isCountingDown, setIsCountingDown] = useState(false); // To control countdown visibility
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [bidAmount,setBidAmount] = useState('')
  const [walletBalance, setWalletBalance] = useState(wallet_Balance);
  const choices = ['Rock', 'Paper', 'Scissors'];
  const intervalid = useRef(null); // Use useRef for intervalid
  
  const selectChoice = (choice) => {
    setSelectedChoice(choice);
  };

  const getImageSource = () => {
    switch (selectedChoice) {
      case 'Rock':
        return require('../../assets/images/rock.png');
      case 'Paper':
        return require('../../assets/images/paper.png');
      case 'Scissors':
        return require('../../assets/images/scissors.png');
      default:
        return null;
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
      const user = filterData[0]; // Assuming the filter will return only one user
      setUserId(user.user_id); // Update user_id state
      setUserName(user.name); // Update username state
      setUserEmail(user.email); // Update userEmail state
    }
  }, [filterData]);

  // Post data when result changes
  useEffect(() => {
    if (result) { // Ensure result is not empty before posting
      postData();
    }
  }, [result]);



  const data1 = {
    user_id: user_id,
    user_name: username,
    user_email: userEmail,
    game_name: 'Rock Paper Scissors',
    game_status: result, // Use the updated result state to post
    bet_price: bidAmount
  };
  const postData = () => {
    axios.post('https://bulldog-solid-bream.ngrok-free.app/games/data', data1)
      .then(res => console.log("Data will be post"))
      .catch(err => console.log('Error while posting data:', err));
  };


  const handleAddBet = () => {
    if (!selectedChoice || !bidAmount) {
      Alert.alert('Error', 'Please select a choice and enter a bet amount.');
      return;
    }
  
    const betAmountNumber = parseFloat(bidAmount);
  
    // Ensure betAmount is a valid number and user has enough balance
    if (isNaN(betAmountNumber) || betAmountNumber <= 0) {
      Alert.alert('Error', 'Please enter a valid numeric bet amount.');
      return;
    }
  
    if (walletBalance < betAmountNumber) {
      Alert.alert('Error', 'Insufficient wallet balance.');
      return;
    }
  
    // Subtract bet amount from wallet balance
    const updatedBalance = walletBalance - betAmountNumber;
    setWalletBalance(updatedBalance);
    updateWalletBalance(updatedBalance);
  
    // Start countdown
    setIsCountingDown(true);
    setCountdown(5);
  
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  
    intervalid.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(intervalid.current); // Clear interval
          determineResult(computerChoice);
          setIsCountingDown(false); // Stop countdown when done
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  
    // Reset bet and choice
    setBetAmount('');
    setSelectedChoice('');
  };
  
  const determineResult = (computerChoice) => {
    const betAmountNumber = parseFloat(bidAmount);
  
    if (selectedChoice === computerChoice) {
      setResult('You Win!');
      const winnings = betAmountNumber;
      const updatedBalance = walletBalance + winnings;
      setWalletBalance(updatedBalance); // Update wallet balance
      updateWalletBalance(updatedBalance); // Update balance on backend
    } else {
      setResult('You Lose!');
      // Balance has already been updated in handleAddBet, no need to subtract again
    }
  };
  useEffect(() => {
    return () => clearInterval(intervalid.current); // Clean up interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Paper Scissors</Text>
<Text style={styles.balanceText}>Wallet Balance {walletBalance}</Text>
      <View style={styles.imageContainer}>
        {selectedChoice ? (
          <>
            <Image source={getImageSource()} style={styles.image} />
            <Text style={styles.choiceText}>{selectedChoice.toUpperCase()}</Text>
          </>
        ) : (
          <Text style={styles.selectText}>Choose your option</Text>
        )}
      </View>

      <View style={styles.choiceContainer}>
        <TouchableOpacity style={styles.choiceButton} onPress={() => selectChoice('Rock')}>
          <Image source={require('../../assets/images/rock.png')} style={styles.choiceImage} />
          <Text style={styles.choiceText}>ROCK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceButton} onPress={() => selectChoice('Paper')}>
          <Image source={require('../../assets/images/paper.png')} style={styles.choiceImage} />
          <Text style={styles.choiceText}>PAPER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceButton} onPress={() => selectChoice('Scissors')}>
          <Image source={require('../../assets/images/scissors.png')} style={styles.choiceImage} />
          <Text style={styles.choiceText}>SCISSORS</Text>
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddBet}>
        <Text style={styles.addButtonText}>Add Bet</Text>
      </TouchableOpacity>

      {isCountingDown ? (
        <Text style={styles.countdownText}>Result will be announced in {countdown} seconds</Text>
      ) : (
        result ? <Text style={styles.resultText}>{result}</Text> : null
      )}

    
      <Text style={styles.noteText}>Minimum: 3 | Maximum: 1M | Win Amount 100%</Text>

     <Footer />
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
    fontSize: 24,
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
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  choiceButton: {
    alignItems: 'center',
  },
  choiceImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  choiceText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#4a4a4a',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#ffd700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  countdownText: {
    color: '#ffd700',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    marginVertical: 10,
  },
  resultText: {
    color: '#ffd700',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    marginVertical: 10,
  },
  balanceText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    marginVertical: 10,
  },
  noteText: {
    color: '#ffd700',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: 20,
  },
  navBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '110%',
    backgroundColor: '#ffd700',
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius:15,
    

  },
  navText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',

  },
});

export default RockPaper;
