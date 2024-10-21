import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Signout = () => {
  const navigation = useNavigation();

  const logout = () => {
    AsyncStorage.removeItem('authToken')
      .then(() => {
        Alert.alert(
          'Logout Successful',
          'You have been logged out successfully.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
            },
          ],
        );
      })
      .catch(err => Alert.alert('Error', err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Signout</Text>

      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Text style={styles.btntext}>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signout;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#021324",
  },
  head: {
    fontSize: 22,
    fontFamily: "Poppins-Regular",
    color: "#fff",
    textAlign: "center",
  },
  btn: {
    padding: 12,
    backgroundColor: "#ffd700",
    borderRadius: 10,
    marginVertical: 30,
  },
  btntext: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
});
