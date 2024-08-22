import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';


const EditProfile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneno, setPhoneNo] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [imageUri, setImageUri] = useState(null);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const navigation = useNavigation()

  const openImagePicker = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const openCamera = () => {
    launchCamera({}, (response) => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };
  const data = {
    name: name,
    email: email,
    phoneno: phoneno,
    country: country,
    city: city
  }
  const saveData = async () => {
    try {
      if (!name || !email || !phoneno || !country || !city) {
        Alert.alert('All Input requires');
        return;
      }
  
      const storedData = await AsyncStorage.getItem('UserData');
      if (storedData) {
        const storedUser = JSON.parse(storedData);
  
        // Check if the email matches
        if (storedUser.email === email) {
          // Update data on the backend
          axios
            .post('https://mint-legible-coyote.ngrok-free.app/update-profile', data)
            .then(response => {
              if (response.data.success) {
                Alert.alert('Profile updated successfully');
                navigation.navigate('My Profile')
                // Optionally, update AsyncStorage with the new data
                AsyncStorage.setItem('UserData', JSON.stringify(data));
              
                
              } else {
                Alert.alert('Failed to update profile');
              }
            })
            .catch(err => {
              console.error(err);
              Alert.alert('An error occurred while updating profile');
            });
        } else {
          Alert.alert('Email does not match');
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <View style={styles.imgcont}>
        <TouchableOpacity style={styles.imageget}onPress={openImagePicker}>
        <Image source={require('../../assets/images/camera.png')} />
        </TouchableOpacity>
          <Text style={styles.imagbtntext}>Add Picture</Text>
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
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

      <PhoneInput
              defaultValue={phoneno}
              defaultCode={'IN'}
              onChangeFormattedText={text => setFormattedPhoneNumber(text)}
              onChangeText={text => setPhoneno(text)}
              withDarkTheme
              withShadow
              placeholder="Enter phone number"
              containerStyle={style.phoneInputContainer}
              textContainerStyle={style.phoneInputTextContainer}
              textInputStyle={style.phoneInputText}
              codeTextStyle={style.phoneInputCodeText}
              flagButtonStyle={style.phoneInputFlag}
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
  imgcont:{
    justifyContent:"center",
    alignItems:'center',
    textAlign:'center'
  },
  imageget:{
    width: 70,
    height:70,
    borderRadius: 50,
    justifyContent:"center",
    alignItems:'center',
    textAlign:'center',
    borderColor: "#ffd700",
    borderWidth: 1,
    borderStyle:'solid'
  },
  imagbtntext:{
    color:"#fff",
    fontFamily:"Poppins-regular",
    marginVertical: 10,
  },phoneInputContainer: {
    backgroundColor: '#cfcfcf',
    marginVertical: 10,
    padding: 15,
    height: 55,
    borderRadius: 25,
    fontFamily: 'Poppins-Regular',
    width: "100%",
color:"#000"

  },
  phoneInputTextContainer: {
    borderRadius: 25,
    backgroundColor: '#cfcfcf',
    paddingVertical: 0,
    color: '#000',
  },
  phoneInputText: {
    fontSize: 16,
    color: "#000",
    fontFamily: 'Poppins-Regular',
  },
  phoneInputCodeText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  phoneInputFlag: {
    marginLeft: 10,
  },
});

export default EditProfile;