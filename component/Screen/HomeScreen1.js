import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen1 = () => {
  const navigation = useNavigation();

  const abc = () => {
    navigation.navigate('HomeScreentwo');
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../../assets/images/homeScreen1.png')} />
      </View>
      <View>
        <Text style={styles.head}>Big Lottery Win</Text>
        <Text style={styles.desc}>
          Join Millions of Winners! 🌟 Play Smart, Win Big, and Make Dreams Come True.
        </Text>
      </View>
      <View style={styles.cont}>
        <TouchableOpacity style={styles.btn} onPress={abc}>
          <Text style={styles.btntext}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#021324',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05, // 5% of screen width
  },
  image: {
    width: width * 0.9, // 90% of screen width
    height: height * 0.4, // 40% of screen height
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
  },
  btn: {
    backgroundColor: '#FFD700',
    paddingHorizontal: width * 0.1, // 10% of screen width
    paddingVertical: height * 0.015, // 1.5% of screen height
    borderRadius: 10,
    marginVertical: height * 0.02, // 2% of screen height
  },
  btntext: {
    color: '#fff',
    fontSize: width * 0.045, // 4.5% of screen width
  },
});
