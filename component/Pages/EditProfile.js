import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneno, setPhoneNo] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  const data = {
    name: name,
    email: email,
    phoneno: phoneno,
    country: country,
    city: city
  }


  const saveData = () => {
    if (!name || !email || !phoneno || !country || !city) {
      Alert.alert('All Input requires')
    }
    else {
      AsyncStorage.setItem('newData', JSON.stringify(data))
        .then(res => console.log('data Add'))
        .catch(err => console.log(err))
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <Text style={styles.head1}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.head1}>Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}

      />
      <Text style={styles.head1}>Phone No</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#ccc"
        keyboardType="phone-pad"
        value={phoneno}
        onChangeText={setPhoneNo}
      />
      <Text style={styles.head1}>Country Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Country"
        placeholderTextColor="#ccc"
        value={country}
        onChangeText={setCountry}
      />
      <Text style={styles.head1}>City Name</Text>

      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="#ccc"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={() => saveData()}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#021324',


    height: '100%'
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  head1: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,

  },
  buttonText: {
    color: '#021324',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default EditProfile;
