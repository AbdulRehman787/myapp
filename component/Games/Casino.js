import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Footer from './Footer';
const Casino = ({ route }) => {
    const { wallet_Balance } = route.params;
    const [walletBalance, setWalletBalance] = useState(wallet_Balance); // Set initial balance to 100
    const [betAmount, setBetAmount] = useState(''); 
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [rouletteNumber, setRouletteNumber] = useState(null);
    const [result, setResult] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [user_id, setUserId] = useState('');
    const [username, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

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
    

      const handleBet = () => {
        if (inProgress) return;
    
        const parsedBetAmount = parseFloat(betAmount); // Rename to avoid name conflict
    
        // Validate bet amount
        if (isNaN(parsedBetAmount) || parsedBetAmount <= 0 || parsedBetAmount > walletBalance) {
            Alert.alert('Invalid Bet', 'Please enter a valid bet amount.');
            return;
        }
    
        // Validate number selection
        if (selectedNumber === null) {
            Alert.alert('No Number Selected', 'Please select a number on the roulette table.');
            return;
        }
    
        // Start the betting process
        setInProgress(true);
        const newBalance = walletBalance - parsedBetAmount; // Deduct the bet amount from balance
        setWalletBalance(newBalance);
        AsyncStorage.setItem('userBalance', newBalance.toString()); // Save updated balance
        updateWalletBalance(newBalance); // Update balance on the backend
    
        // Generate a random number for the roulette
        const generatedNumber = Math.floor(Math.random() * 37); // 0 to 36
        setRouletteNumber(generatedNumber);
    
        // Simulate the result after 10 seconds
        setTimeout(() => {
            setBetAmount(''); // Clear bet input after the round
            if (selectedNumber === generatedNumber) {
                const winnings = parsedBetAmount * 2; // Example: double the bet amount
                const updatedBalance = walletBalance + winnings;
                setWalletBalance(updatedBalance);
                updateWalletBalance(updatedBalance); // Update backend
                AsyncStorage.setItem('userBalance', updatedBalance.toString()); // Save balance
                setResult(`You won! Profit: $${winnings.toFixed(2)}. Casino number was ${generatedNumber}.`);
            } else {
                setResult(`You lost. Casino number was ${generatedNumber}. Better luck next time!`);
            }
            setInProgress(false);
        }, 10000);
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
          game_name: 'Spinner',
          game_status: result,
          bet_price: betAmount,
        };
    
        axios.post('https://bulldog-solid-bream.ngrok-free.app/games/data', data1)
          .then(res => console.log("GameData Added"))
          .catch(err => console.log('Error while posting data:', err));
      };


    const renderRouletteTable = () => {
        let numbers = [];
        for (let i = 0; i <= 36; i++) {
            let backgroundColor;
            if (i === 0) {
                backgroundColor = 'green';
            } else if (i % 2 === 0) {
                backgroundColor = 'red';
            } else {
                backgroundColor = 'black';
            }

            numbers.push(
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.numberCircle,
                        {
                            backgroundColor: selectedNumber === i ? '#ffd700' : backgroundColor,
                            borderColor: selectedNumber === i ? '#ffd700' : '#021324',
                        }
                    ]}
                    onPress={() => setSelectedNumber(i)}
                    disabled={inProgress}
                >
                    <Text style={styles.numberText}>{i}</Text>
                </TouchableOpacity>
            );
        }
        return numbers;
    };

   

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Casino</Text>
            <Text style={styles.balance}>Wallet Balance: {walletBalance}</Text>
        <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor="#ffd700"
                keyboardType="numeric"
                value={betAmount}
                onChangeText={(value) => {
                    // Allow only numbers and up to two decimal places
                    const newBet = value.replace(/[^0-9.]/g, '');
                    const validBet = newBet.match(/^\d*\.?\d{0,2}$/);
                    if (validBet) {
                        setBetAmount(newBet);
                    }
                }}
            />
            <Text style={styles.label}>Select a number:</Text>
            <View style={styles.rouletteTable}>
                {renderRouletteTable()}
            </View>
            <TouchableOpacity title="Place Bet" onPress={handleBet} disabled={inProgress}  style={styles.btn}><Text style={styles.btntext}>Place Bet</Text></TouchableOpacity>
           
            {inProgress && <Text style={styles.result}>Waiting for result...</Text>}
            {!inProgress && result && (
                <Text style={styles.result}>
                    {result} Your number: {selectedNumber}, Casino number: {rouletteNumber}
                </Text>
            )}
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        height: "100%",
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#021324',
    },
    title: {
        fontSize: 32,
        color: '#ffd700',
        fontFamily: 'Poppins-Regular',
        textAlign: "center"
    },
    balance: {
        fontSize: 20,
        marginBottom: 16,
        color: '#ffd700',
        fontFamily: 'Poppins-Regular',
        textAlign: "center"

    },
    label: {
        fontSize: 18,
        color: '#ffd700',
        fontFamily: 'Poppins-Regular',
        textAlign: "center"

    },
    input: {
        padding: 12,
        borderColor: '#ffd700',
        marginVertical: 10,
        borderWidth: 1,
        color: '#ffd700',
        borderRadius: 10,
    },
    rouletteTable: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 16,
    },
    numberCircle: {
        width: 40,
        height: 40,
        borderRadius: 25,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    numberText: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    result: {
        fontSize: 18,
        marginTop: 16,
        color: '#ffd700',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
    },
    btn:{
        padding: 16,
        backgroundColor:"#ffd700",
        borderRadius: 10,
        fontFamily:"Poppins-Regular"

    },btntext:{

        color:"#021324",
        textAlign:"center"
    }
});

export default Casino;
