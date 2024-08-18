import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Animated } from 'react-native';

const HeadandTail = () => {
  const [selectedSide, setSelectedSide] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [animationValue] = useState(new Animated.Value(0)); // Animation value for flipping
  const [flippedSide, setFlippedSide] = useState(null);

  const selectHead = () => setSelectedSide('Head');
  const selectTail = () => setSelectedSide('Tail');

  const handleFlip = () => {
    // Start the flipping animation
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 2000, // 2 seconds flip
      useNativeDriver: true,
    }).start(() => {
      // Reset animation after completion
      animationValue.setValue(0);
      // Simulate a random coin flip outcome
      const outcome = Math.random() < 0.5 ? 'Head' : 'Tail';
      setFlippedSide(outcome);
      setSelectedSide(null); // Reset the selection
    });
  };

  const animatedRotation = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '360deg', '720deg'], // Two full rotations
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Head or Tail</Text>

      <View style={styles.imageContainer}>
        <Animated.View style={{ transform: [{ rotateY: animatedRotation }] }}>
          <Image
            source={
              flippedSide === 'Head'
                ? require('../../assets/images/head.png') // Ensure this path is correct
                : require('../../assets/images/tail.png') // Ensure this path is correct
            }
            style={styles.image}
          />
        </Animated.View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedSide === 'Head' && styles.selectedButton]}
          onPress={selectHead}
        >
          <Text style={styles.buttonText}>Head</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedSide === 'Tail' && styles.selectedButton]}
          onPress={selectTail}
        >
          <Text style={styles.buttonText}>Tail</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.noteText}>Select either Head or Tail and press to confirm.</Text>

      <TextInput
        placeholder="Enter amount"
        value={bidAmount}
        onChangeText={setBidAmount}
        keyboardType='numeric'
        placeholderTextColor="#888"
        style={styles.input}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleFlip}>
        <Text style={styles.addButtonText}>Add Bet</Text>
      </TouchableOpacity>

      <Text style={styles.noteText}>Minimum: 3 | Maximum: 1M | Win Amount: 100%</Text>

      <View style={styles.navBar}>
        <Text style={styles.navText}>Home</Text>
        <Text style={styles.navText}>Lottery</Text>
        <Text style={styles.navText}>Wallet</Text>
        <Text style={styles.navText}>Setting</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginTop: 40,
  },
  imageContainer: {
    marginVertical: 20,
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  selectText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a4a4a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#f0b000',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  noteText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 30,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#f0b000',
    paddingVertical: 15,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    marginHorizontal: -20,
  },
  navText: {
    color: '#021324',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#4a4a4a',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#f0b000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#021324',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default HeadandTail;
