import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';

const Lottery = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [amount, setAmount] = useState('');
  const [data,setData] = useState([]);

  useEffect(()=>{
   const getData=()=>{
    axios.get('https://mint-legible-coyote.ngrok-free.app/lotteryNumber')
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))
   }
   getData();
  },[])

  console.log(data)
  const toggleNumber = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Lottery</Text>
      <Text style={styles.subHeader}>Choose Number</Text>

      <View style={styles.numbersGrid}>
        {[...Array(30).keys()].map((num) => {
          const number = num + 1;
          const isSelected = selectedNumbers.includes(number);
          return (
            <TouchableOpacity
              key={number}
              style={[styles.number, isSelected && styles.selectedNumber]}
              onPress={() => toggleNumber(number)}
            >
              <Text style={[styles.numberText, isSelected && styles.selectedNumberText]}>{number}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        placeholderTextColor="#fff"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Bet</Text>
      </TouchableOpacity>

     
    </ScrollView>
  );
};

export default Lottery;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#021324',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  number: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 30,
    margin: 5,
  },
  selectedNumber: {
    backgroundColor: '#FFD700',
  },
  numberText: {
    color: '#fff',
    fontSize: 20,
  },
  selectedNumberText: {
    color: '#000',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#FFD700',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#000',
  },
});
