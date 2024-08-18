import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('newData');
      if (jsonValue != null) {
        setProfileData(JSON.parse(jsonValue));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View>
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
            {profileData.name || 'Jhon Die'}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>Email Address</Text>
          <Text style={styles.accountdetails}>
            {profileData.email || 'abc@gmail.com'}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>PhoneNo</Text>
          <Text style={styles.accountdetails}>
            {profileData.phoneno || '+0 123 456 789'}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>Country</Text>
          <Text style={styles.accountdetails}>
            {profileData.country || 'Add Country Name'}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>City</Text>
          <Text style={styles.accountdetails}>
            {profileData.city || 'Add City Name'}
          </Text>
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
