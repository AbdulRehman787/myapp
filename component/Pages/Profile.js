import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [newData, setNewData] = useState('')
  const [error, setError] = useState('')
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
          console.log('Fetched Data:', res.data); // Debugging line
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };

    getData();
  }, []);


  const filterData = data.filter((item) => item.email === email)

  const nav = () => {
    navigation.navigate('Dashboard')
  }

  useEffect(() => {
    if (filterData) {
      filterData.map((curelem)=>{
        if(curelem.status===""){
          console.log('account status',filterData)
          setError('Verify your account');
        } else {
          setError('Verified');
        }
      })
    }
  }, [filterData]);
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => nav()}>
          <Image source={require('../../assets/images/arrow.png')} />
        </TouchableOpacity>
        <Text style={styles.head}>My Profile</Text>
      </View>
      <View style={styles.cont1}>
        <View style={styles.details}>
          <Text style={styles.accounthead}>Account Details</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.accountdetails}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>Full Name</Text>
          <Text style={styles.accountdetails}>
            {filterData[0]?.name || 'John Doe'}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>Email Address</Text>
          <Text style={styles.accountdetails}>
            {filterData[0]?.email || 'abc@gmail.com'}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>Phone No</Text>
          <Text style={styles.accountdetails}>
            {filterData[0]?.phoneno || '+0 123 456 789'}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>Country</Text>
          <Text style={styles.accountdetails}>
            {filterData[0]?.country || 'Add Country Name'}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>City</Text>
          <Text style={styles.accountdetails}>
            {filterData[0]?.city || 'Add City Name'}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>Account Status</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Verify')}>
          <Text style={styles.accountdetails}>{error || 'Unverified'}</Text>

          </TouchableOpacity>
         
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#021324',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  head: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20
  },
  cont1: {
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  accounthead: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
  accountdetails: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
});
