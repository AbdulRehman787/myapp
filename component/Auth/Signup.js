import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const data = {
    name: name,
    email: email,
    phoneno: formattedPhoneNumber,
    password: password,
  };


  const AccountCreated = () => {
    if (!name || !email || !phoneno || !password || !confirmPassword) {
      setError('All Fields are Required');
    } else if (password !== confirmPassword) {
      setError('Passwords Do Not Match');
    } else {
      console.log(data);
      axios
        .post('https://mint-legible-coyote.ngrok-free.app/signup', data)
        .then(res => {
          console.log(res.data);
          navigation.navigate('Dashboard');
          AsyncStorage.setItem("UserData",JSON.stringify(data))
          .then(res=>console.log('Data Saved'))
          .catch(err=> console.log(err))
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 400) {
              setError(err.response.data.message);
            } else {
              setError('An error occurred. Please try again.');
            }
            console.error('Error response:', err.response.data);
          } else if (err.request) {
            setError('No response from the server. Please try again.');
            console.error('Error request:', err.request);
          } else {
            setError('An error occurred. Please try again.');
            console.error('Error message:', err.message);
          }
        });
    }
  };

  return (
    <SafeAreaView style={style.cont}>
      <View style={style.container1}>
        <ScrollView>
          <View style={style.textStyle}>
            <Text style={style.heading1}>SignUp</Text>
            <Text style={style.heading2}>Add Your Details to Signup</Text>
          </View>
          <View>
            <Text style={style.inputLabel}>Enter Name</Text>
            <TextInput
              style={style.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={'#000'}
            />
            <Text style={style.inputLabel}>Enter Email</Text>
            <TextInput
              style={style.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={'#000'}
            />
            <Text style={style.inputLabel}>Enter Phone no</Text>
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
            <Text style={style.inputLabel}>Enter Password</Text>
            <TextInput
              style={style.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={'#000'}
            />
            <Text style={style.inputLabel}>Enter Confirm Password</Text>
            <TextInput
              style={style.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor={'#000'}
            />
          </View>
          <View>
            <Text style={style.error}>{error}</Text>
            <TouchableOpacity style={style.button3} onPress={AccountCreated}>
              <Text style={style.textbtn}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={style.heading3}>
              Already have an Account?{' '}
              <Text
                style={style.pageNavigate}
                onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container1: {
    paddingTop: 40,
    textAlign: 'center',
    resizeMode: 'cover',
    height: '100%',
    backgroundColor: '#021324',
    paddingHorizontal: 20,
    marginTop: -10
  },
  textStyle: {
    width: '100%',
    textAlign: 'center',
  },
  heading1: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  heading2: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
  },
  heading3: {
    textAlign: 'center',
    fontSize: 18,
    color: '#eeeeee',
    marginVertical: 20,
  },
  inputLabel: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#cfcfcf',
    marginVertical: 10,
    padding: 15,
    height: 55,
    borderRadius: 25,
    fontFamily: 'Poppins-Regular',
    width: "100%"
  },
  phoneInputContainer: {
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
  button3: {
    marginTop: -10,
    borderRadius: 50,
    padding: 12,
    backgroundColor: '#FFD700',
  },
  textbtn: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  pageNavigate: {
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  cont: {
    paddingTop: 10,
    backgroundColor: '#fff',
    height: '100%',
  },
});

export default Signup;
