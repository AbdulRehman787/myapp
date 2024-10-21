import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Footer from '../Games/Footer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Lotteries = () => {
  const [email, setEmail] = useState('')
  const [data, setData] = useState([])
  const [walletBalance,setWalletBalance] = useState('')
 
  useEffect(() => {
    axios.get("https://bulldog-solid-bream.ngrok-free.app/signup")
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('emailId')
      .then(email => {
        if (email !== null) {
          setEmail(email);
        }
      })
      .catch(error => {
        console.error('Failed to retrieve email from AsyncStorage', error);
      });
  }, []);


  const filteredData=data.filter(item=>item.email===email)
  useEffect(()=>{
    if(filteredData.length>0){
      const userData= filteredData[0];
      setWalletBalance(userData.wallet_balance)

    }
  },[filteredData])

  const navigation = useNavigation();
  const [lotteries, setLotteries] = useState([]);

  useEffect(() => {
    const fetchLotteries = async () => {
      const response = await axios.get('https://bulldog-solid-bream.ngrok-free.app/lotteries');
      setLotteries(response.data);
    };
    fetchLotteries();
  }, []);





  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Lotteries</Text>
      <Text style={styles.balance}>Your Currrent Wallet Amount {walletBalance}</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Lottery',{wallet_Balance:walletBalance})}><Text style={styles.btntext}>Number Lottery</Text></TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ScratchLottery',{wallet_Balance:walletBalance})}><Text style={styles.btntext}>ScratchLottery</Text></TouchableOpacity>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#021324',
    paddingTop: 40
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: "center"
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 10,
  },
  btn: {
    padding: 14,
    marginVertical: 20,
    backgroundColor: "#ffd700",
    borderRadius: 10, justifyContent: "center"
  }, btntext: {
    color: "#021324",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
  balance:{
    fontSize: 22,
    fontFamily:"Poppins-Regular",
    color:"#fff",
    textAlign:"center"
  }
});

export default Lotteries;
