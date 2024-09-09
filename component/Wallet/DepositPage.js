import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const DepositPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedAmount = route.params?.selectedAmount || 0;
  const selectedPaymentMethod = route.params?.selectedPaymentMethod || 'None';
  const [data, setData] = useState([]);
  
  const [email, setEmail] = useState('');
  const [newData, setNewData] = useState('')
  const [error, setError] = useState('')
  const [user_id,setUserId] = useState('')
  const [user_name,setUser_name] = useState('')
  const [user_email,setUser_email] = useState('')

  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserData');
      if (jsonValue != null) {
        setNewData(JSON.parse(jsonValue));
        
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    // Fetch data from the database
    const getData = () => {
      axios
        .get('https://mint-legible-coyote.ngrok-free.app/signup')
        .then((res) => {
       
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };

    getData();
  }, []);


  const filterData = data.filter((item) => item.email === email)

  useEffect(() => {
    if (filterData.length > 0) {
      const user = filterData[0]; // Assuming the filter will return only one user
      setUserId(user.user_id); // Update user_id state
      setUser_name(user.name); // Update username state
      setUser_email(user.email); // Update userEmail state
    }
  }, [filterData]);


  const handleDeposit = () => {
    if (selectedPaymentMethod === 'UPID') {
      navigation.navigate('UpiPayment', { amount: selectedAmount, paymentMethod: selectedPaymentMethod,user_id:user_id,user_name:user_name,user_email:user_email });
    } else if (selectedPaymentMethod === 'Card Payment') {
      navigation.navigate('Card Payment', { amount: selectedAmount, paymentMethod: selectedPaymentMethod,user_id:user_id,user_name:user_name,user_email:user_email });
    } else if (selectedPaymentMethod === 'USDT') {
      navigation.navigate('UsdtPayment', { amount: selectedAmount, paymentMethod: selectedPaymentMethod,user_id:user_id,user_name:user_name,user_email:user_email});
    } else if (selectedPaymentMethod === 'Google Pay') {
      navigation.navigate('GooglePayPayment', { amount: selectedAmount, paymentMethod: selectedPaymentMethod,user_id:user_id,user_name:user_name,user_email:user_email });
    } else if (selectedPaymentMethod === 'Phone Pay') {
      navigation.navigate('Phone Pay', { amount: selectedAmount, paymentMethod: selectedPaymentMethod,user_id:user_id,user_name:user_name,user_email:user_email });
    } else {
      console.log('No payment method selected');
    }
  };
 
  
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Deposit Amount</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('DepositOptions', { selectedPaymentMethod })}
      >
        <Text style={styles.btntext}>
          Deposit Amount {"\n"} {selectedAmount}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('PaymentOptions', { selectedAmount })}
      >
        <Text style={styles.btntext}>
          Payment Method {"\n"} {selectedPaymentMethod}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.btn} onPress={handleDeposit}>
        <Text style={styles.btntext}>Deposit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: "#021324",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  head: {
    fontSize: 22,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#fff",
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#ffd700",
    borderRadius: 10,
    marginVertical: 20,
  },
  btntext: {
    color: "#021324", // Ensure the text color is readable
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});

export default DepositPage;
