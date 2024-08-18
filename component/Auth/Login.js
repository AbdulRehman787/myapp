import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [errmsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const data={
    email,password
  }

  const handleLogin = () => {
    if (!email || !password) {
        setError('Both email and password are required');
        return;
    }

    const data = {
        email,
        password
    };

    axios.post('https://b56b-2a00-f29-2c8-c685-504f-d568-c93-1878.ngrok-free.app/login', data)
        .then(res => {
            console.log(res.data);
            navigation.navigate('Dashborad')
            // Redirect to dashboard or perform other actions upon successful login
        })
        .catch(err => {
            if (err.response) {
                setError(err.response.data.message);
            } else if (err.request) {
                setError("No response from the server. Please try again.");
            } else {
                setError("An error occurred. Please try again.");
            }
        });
};

 
  return (
    <SafeAreaView style={styles.container1}>
      <ScrollView>
        <View style={styles.container2}>
          <Text style={styles.head1}>Login</Text>
          <Text style={styles.head2}>Add your details to login</Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.input1}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input1}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View>
         
          <TouchableOpacity style={styles.buttons} onPress={()=>handleLogin()}>
            <Text style={styles.head3}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.head4}>
          <Text
            style={styles.head5}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forget Your Password
          </Text>
        </View>
        <Text style={styles.error}>{errmsg}</Text>
       
        <View style={styles.head6}>
          <Text style={styles.head6}>Or login with</Text>
        </View>
        <View style={styles.head7}>
          <Text style={styles.head7_1}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={()=>navigation.navigate('Signup')}><Text 
              style={styles.head7_2}
             >
              Signup
            </Text></TouchableOpacity>
            {' '}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container1: {
    paddingTop: 40,
    textAlign: 'center',
    resizeMode: 'cover',
    height: '100%',
    backgroundColor: '#021324',
    paddingHorizontal: 20,
  },
  container2: {
    textAlign: 'center',
    alignItems: 'center',
  },
  head1: {
    fontSize: 36,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  head2: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
    color: '#fff'
  },
  input: {

    marginVertical: 30,
  },
  input1: {
    backgroundColor: '#eeeeee',
    marginVertical: 10,
    padding: 15,
    height: 55,
    borderRadius: 25,
  },
  buttons: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  head3: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 14
  },
  head4: {
    marginVertical: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14

  },
  head5: {
    color: '#fff',
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  head6: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
 

  },
  morebtn: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  btn1: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 25,
    color: '#fff',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
    fontSize: 14

  },
  btn2: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 25,
    color: '#fff',
    marginVertical: 10,
    borderColor: '#FFD700',
    fontSize: 14

  },
  head7: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  head7_1: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: "#fff"
  },
  head7_2: {
    fontFamily: 'Poppins-Regular',
    color: '#FFD700',
    textAlign: "center"

  },
  error: {
    color: 'red',
   
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
  },
}); 
 