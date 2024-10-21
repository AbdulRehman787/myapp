import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('authToken');
        if (jsonValue != null) {
          // Token exists, navigate to Dashboard
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            })
          );
        } else {
          // No token, navigate to Login page
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );
        }
      } catch (err) {
        // In case of an error, navigate to Login page
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
        console.error('Data fetch error:', err);
      }
    };

    getData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Welcome to this app</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#021324',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  head: {
    fontSize: 32,
    textAlign: 'center',
    color: "#fff",
  },
  desc: {
    color: '#fff',
    textAlign: "center",
    lineHeight: 20,
    paddingVertical: 10,
  },
  cont: {
    paddingVertical: 20,
  },
  btn: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginVertical: 10,
  },
  btntext: {
    color: '#fff',
  },
});
