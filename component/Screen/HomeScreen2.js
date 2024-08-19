import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen2 = () => {
  const navigation = useNavigation();

  const nav = () => {
    navigation.navigate('HomeScreenthree');
  };

  const back = () => {
    navigation.navigate('HomeScreenone');
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../../assets/images/homeScreen2.png')} />
      </View>
      <View>
        <Text style={styles.head}>Big Supero Lottery</Text>
        <Text style={styles.desc}>
          Join Millions of Winners! 🌟 Play Smart, Win Big, and Make Dreams Come True.
        </Text>
      </View>
      <View style={styles.cont}>
        <TouchableOpacity style={styles.btn1} onPress={back}>
          <Text style={styles.btntext}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={nav}>
          <Text style={styles.btntext}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#021324',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05, // 5% of screen width
  },
  image: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.35, // 35% of screen height
    justifyContent: 'center',
  },
  head: {
    fontSize: width * 0.08, // 8% of screen width
    textAlign: 'center',
    color: '#fff',
  },
  desc: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: height * 0.025, // 2.5% of screen height
    paddingVertical: height * 0.015, // 1.5% of screen height
  },
  cont: {
    paddingVertical: height * 0.03, // 3% of screen height
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.6, // 60% of screen width
  },
  btn: {
    backgroundColor: '#FFD700',
    width: width * 0.25, // 25% of screen width
    height: height * 0.05, // 5% of screen height
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    color: '#fff',
    fontSize: width * 0.045, // 4.5% of screen width
  },
  btn1: {
    backgroundColor: '#000',
    width: width * 0.25, // 25% of screen width
    height: height * 0.05, // 5% of screen height
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderStyle: 'solid',
  },
});
