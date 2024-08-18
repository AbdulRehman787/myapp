import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Image, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const Spinner = () => {
  const [spinValue] = useState(new Animated.Value(0));
  const [result, setResult] = useState('');
  const [userSelect, setUserSelect] = useState('');
const [error,setError] = useState('')
  const prizes = ['Car', 'Bike', 'Phone', 'Laptop', 'Watch', 'Camera', 'House', 'Macbook'];

  const startSpin = () => {
    // Reset spin value to 0
    spinValue.setValue(0);

    // Calculate a random spin duration and final spin position
    const duration = 4000;
    const endValue = Math.floor(Math.random() * prizes.length);

    // Start spinning animation
    Animated.timing(spinValue, {
      toValue: 1 + endValue / prizes.length,
      duration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setResult(prizes[endValue]);

      // Check if the user selection matches the result
      if (prizes[endValue] === userSelect) {
        setError(`Congratulations! You won: ${userSelect}`);
      } else {
        setError(`Better luck next time! You selected: ${userSelect}, but the result was: ${prizes[endValue]}`);
      }
    });
  };

  const spinRotation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spinner Game</Text>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spinRotation }] }]}>
        <Image source={require('../../assets/images/spinner.png')} style={styles.spinnerImage} />
      </Animated.View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select an Item:</Text>
        <SelectList
          setSelected={val => setUserSelect(val)}
          data={prizes}
          save="value"
          dropdownTextStyles={styles.dropdownText}
          dropdownItemStyles={styles.dropdownItem}
          dropdownItemSelectedStyles={styles.selectedItem}
          boxStyles={styles.dropdownBox} // White container for the dropdown
        />
      </View>

      <TouchableOpacity style={styles.spinButton} onPress={startSpin} disabled={!userSelect}>
        <Text style={styles.spinButtonText}>SPIN</Text>
      </TouchableOpacity>

      {result ? <Text style={styles.resultText}>{error}!</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#021324',
    paddingVertical: 30,
    paddingHorizontal: 20,
    height: '100%',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  spinner: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  spinnerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  spinButton: {
    marginTop: 30,
    backgroundColor: '#f0b000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  spinButtonText: {
    color: '#021324',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  dropdownContainer: {
    marginVertical: 20,
  },
  dropdownLabel: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownText: {
    color: '#021324', // Adjusted for visibility on a white background
  },
  dropdownItem: {
    backgroundColor: '#fff',
    color: "#021324",
  },
  selectedItem: {
    backgroundColor: '#fff',  // Selected item color
    color: '#021324',  // Text color for the selected item
  },
  dropdownBox: {
    backgroundColor: '#fff',  // White background for the dropdown container
    borderRadius: 8,
  },
  resultText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Spinner;
