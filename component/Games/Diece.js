import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';

const diceImages = {
  1: require('../../assets/images/1.png'),
  2: require('../../assets/images/2.png'),
  3: require('../../assets/images/3.png'),
  4: require('../../assets/images/4.png'),
  5: require('../../assets/images/5.png'),
  6: require('../../assets/images/6.png'),
};

const DiceGame = () => {
  const [firstDice, setFirstDice] = useState(2);
  const [secondDice, setSecondDice] = useState(4);
  const [selectedFirstNumber, setSelectedFirstNumber] = useState('');
  const [selectedSecondNumber, setSelectedSecondNumber] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const [data,setData] = useState([])
  const [email,setEmail] = useState('')
  const [user_id,setUserId] = useState('')
  const [username,setUserName] = useState('')
  const [userEmail,setUserEmail] = useState('')


  const randomNum = (min = 1, max = 6) => Math.floor(Math.random() * (max - min + 1)) + min;

  const getDiceNum = (prev) => {
    let num = randomNum();
    if (prev === num) {
      return randomNum();
    }
    return num;
  };
  const rollDiceOnTap = () => {
    // Check if the user has selected any number
    if (!selectedFirstNumber && !selectedSecondNumber) {
      setError('Please select a number');
      return;
    }
  
    // Check if the bid amount is empty
    if (!bidAmount) {
      setError('Please enter your bid amount');
      return;
    }
  
    const newFirstDice = getDiceNum(firstDice);
    const newSecondDice = getDiceNum(secondDice);
  
    setFirstDice(newFirstDice);
    setSecondDice(newSecondDice);
  
    let gameResult = '';
    if (
      (parseInt(selectedFirstNumber) === newFirstDice && parseInt(selectedFirstNumber) === newSecondDice) ||
      (parseInt(selectedSecondNumber) === newFirstDice && parseInt(selectedSecondNumber) === newSecondDice)
    ) {
      gameResult = 'You Win!';
    } else {
      gameResult = 'You Lose!';
    }
  
    // Set the result state and use gameResult for posting data
    setResult(gameResult);
    postData(gameResult);
    setSelectedFirstNumber('');
    setSelectedSecondNumber('');
    setBidAmount('');
    setError(''); // Clear the error after the user makes a valid selection
  };

  useEffect(()=>{
    const getData=()=>{
       axios.get('https://mint-legible-coyote.ngrok-free.app/signup')
       .then(res=>setData(res.data))
       .catch(err=> console.log(err))
    }
    getData()
  },[])
  

  useEffect(()=>{
    AsyncStorage.getItem('emailId')
    .then(email =>{
     if(email !==null)
       setEmail(email)
    })
    .catch(err=>{
     console.log('Dont Fetch Email')
    })
   },[])

  const filterData = data.filter((item)=>item.email=== email)

  useEffect(() => {
    if (filterData.length > 0) {
      const user = filterData[0]; // Assuming the filter will return only one user
      setUserId(user.user_id); // Update user_id state
      setUserName(user.name); // Update username state
      setUserEmail(user.email); // Update userEmail state
    }
  }, [filterData]);

  
  
  const postData = (gameResult) => {
    const data1 = {
      user_id: user_id,
      user_name: username,
      user_email: userEmail,
      game_name: 'Dice Game',
      game_status: gameResult,  // use local variable instead of state
      bet_price: bidAmount,
    };
  
    axios
      .post('https://mint-legible-coyote.ngrok-free.app/games/data', data1)
      .then((res) => console.log(res))
      .catch((err) => console.log('Error while posting data:', err));
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dice Game</Text>

      <View style={styles.container1}>
        <View style={styles.diceContainer}>
          <Image
            style={styles.diceImage}
            source={diceImages[firstDice]}
          />
          <Image
            style={[
              styles.diceImage,
              styles.lite,
            ]}
            source={diceImages[secondDice]}
          />
        </View>
      
        {result && <Text style={styles.resultText}>{result}</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <Text style={styles.balanceText}>Current Balance: 0.00 USD</Text>

      <View style={styles.buttonContainer}>
        <TextInput
          placeholder='Select first Number'
          value={selectedFirstNumber}
          onChangeText={setSelectedFirstNumber}
          keyboardType='phone-pad'
          placeholderTextColor='#ffd700'
          style={styles.input}
        />
        <TextInput
          placeholder='Select second Number'
          value={selectedSecondNumber}
          onChangeText={setSelectedSecondNumber}
          keyboardType='phone-pad'
          placeholderTextColor='#ffd700'
          style={styles.input}
        />
      </View>

      <TextInput
        placeholder="Enter amount"
        value={bidAmount}
        onChangeText={setBidAmount}
        keyboardType='numeric'
        placeholderTextColor="#888"
        style={styles.input}
      />

      <TouchableOpacity style={styles.addButton} onPress={rollDiceOnTap}>
        <Text style={styles.addButtonText}>Add Bet</Text>
      </TouchableOpacity>

      <Text style={styles.noteText}>Minimum: 3 | Maximum: 1M | Win Amount: 100%</Text>

      <View style={styles.navBar}>
        <Text style={styles.navText}>Home</Text>
        <Text style={styles.navText}>Lottery</Text>
        <Text style={styles.navText}>Wallet</Text>
        <Text style={styles.navText}>Setting</Text>
      </View>
    </View>
  );
};

export default DiceGame;

const styles = StyleSheet.create({
  // Same styles as before
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
  balanceText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#4a4a4a',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#f0b000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#021324',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  noteText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 30,
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
  },
  navText: {
    color: '#021324',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  container1: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 2
  },
  diceContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  diceImage: {
    marginHorizontal: 10,
    width: 125,
    height: 125
  },
  lite: {
    opacity: 0.95,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    backgroundColor: '#333'
  },
  resultText: {
    fontSize: 20,
    color: '#ffd700',
    fontFamily: 'Poppins-Regular',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff4c4c',
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
  }
});
