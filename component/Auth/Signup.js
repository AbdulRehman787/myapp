import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from 'axios';


const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  
  const [error, setError] = useState('');



  const data = {
    name: name,
    email: email,
    phoneno: phoneno,
    password: password
};
  

const AccountCreated = () => {
  if (!name || !email || !phoneno || !password || !confirmPassword) {
      setError('All Fields are Required');
  } else if (password !== confirmPassword) {
      setError('Passwords Do Not Match');
  } else {
      console.log(data);
      axios.post('https://155f-2a00-f28-4e3-e536-c1d0-f631-a95a-7f61.ngrok-free.app/register', data)
          .then(res => {
              console.log(res.data);
              navigation.navigate('Dashborad')
              // You can display a success message or redirect the user after successful registration
          })
          .catch(err => {
              if (err.response) {
                  // Handle specific error messages from the server
                  if (err.response.status === 400) {
                      setError(err.response.data.message); // Display "Email is already in use" message
                  } else {
                      setError("An error occurred. Please try again.");
                  }
                  console.error("Error response:", err.response.data);
              } else if (err.request) {
                  // No response was received
                  setError("No response from the server. Please try again.");
                  console.error("Error request:", err.request);
              } else {
                  // Something happened in setting up the request
                  setError("An error occurred. Please try again.");
                  console.error("Error message:", err.message);
              }
          });
  }
}



  return (
    <SafeAreaView style={style.cont}>
      <View style={style.container1}>
        <ScrollView>
          <View style={style.textStyle}>
            <Text style={style.heading1}>SignUp</Text>
            <Text style={style.heading2}>Add Your Details to signup </Text>
          </View>
          <View>
            <Text>Enter Name </Text>
            <TextInput
              style={style.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={'#000'}

            />
            <Text>Enter Email </Text>

            <TextInput
              style={style.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={'#000'}

            />
            <Text>Enter Phone no </Text>

            <TextInput
              style={style.input}
              placeholder="Phone Number"
              value={phoneno}
              onChangeText={event => setPhoneno(event)}
              keyboardType="phone-pad"
              placeholderTextColor={'#000'}

            />
          
            <Text>Enter Password </Text>

            <TextInput
              style={style.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={'#000'}

            />
            <Text>Enter Confirm Password </Text>

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
            <TouchableOpacity style={style.button3} onPress={()=>AccountCreated()}>
              <Text style={style.textbtn}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={style.heading3}>
              Already have a Account?{' '}
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
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor:'#021324',
    height: '100%',
   
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
  input: {
    backgroundColor: '#cfcfcf',
    marginVertical: 10,
    padding: 15,
    height: 55,
    borderRadius: 25,
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
  },
  pageNavigate: {
    color: 'red',
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