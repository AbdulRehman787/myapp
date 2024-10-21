import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Alert } from 'react-native';
import Svg, { Path, G, Circle } from 'react-native-svg';

const outcomes = [
  { name: 'Red', color: '#FF6347', multiplier: 2 }, // Red
  { name: 'Green', color: '#32CD32', multiplier: 15 }, // Green
  { name: 'Black', color: '#2F4F4F', multiplier: 2 }, // Black
];


export default function WheelGame() {
  const [balance, setBalance] = useState(19999); // Initial balance
  const [bet, setBet] = useState({ red: 1, green: 1, black: 1 });
  const [currentBet, setCurrentBet] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
 // Spin the wheel function
 const spinWheel = () => {
  if (currentBet <= 0) {
    Alert.alert('Please place a bet!');
    return;
  }

  setSpinning(true);
  const randomSpin = Math.floor(Math.random() * 3600) + 360;
  Animated.timing(spinValue, {
    toValue: randomSpin,
    duration: 3000,
    useNativeDriver: true,
    easing: Easing.out(Easing.quad),
  }).start(() => {
    setSpinning(false);
    const result = calculateResult(randomSpin % 360);
    checkBetOutcome(result);
  });
};

// Calculate the result based on the spinner's angle
const calculateResult = (angle) => {
  if (angle >= 0 && angle < 120) return outcomes[0]; // Red
  if (angle >= 120 && angle < 240) return outcomes[1]; // Green
  return outcomes[2]; // Black
};

// Check the result and update balance
const checkBetOutcome = (result) => {
  const betAmount = bet[result.name.toLowerCase()];
  const winnings = betAmount * result.multiplier;

  if (winnings > 0) {
    Alert.alert(`You won ${winnings} DMO on ${result.name}!`);
    setBalance(balance + winnings);
  } else {
    Alert.alert(`You lost! The result was ${result.name}`);
  }

  setBet({ red: 1, green: 1, black: 1 });
  setCurrentBet(0);
};

// Handle placing bets
const placeBet = (color, amount) => {
  if (balance < amount) {
    Alert.alert('Insufficient funds!');
    return;
  }
  setBet({ ...bet, [color]: bet[color] + amount });
  setBalance(balance - amount);
  setCurrentBet(currentBet + amount);
};

// Interpolation for spinner rotation
const rotate = spinValue.interpolate({
  inputRange: [0, 360],
  outputRange: ['0deg', '360deg'],
});


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Double X Spinner Game</Text>

      {/* Spinner */}
      <View style={styles.spinnerContainer}>
        <Animated.View style={{ transform: [{ rotate }], position: 'absolute' }}>
          <Svg width="200" height="200" viewBox="0 0 100 100">
            <Path
              d="M50 50 L50 0 A50 50 0 0 1 97.55 26.14 Z"
              fill="#FF0000"
            />
            <Path
              d="M50 50 L97.55 26.14 A50 50 0 0 1 50 100 Z"
              fill="#00FF00"
            />
            <Path
              d="M50 50 L50 100 A50 50 0 0 1 2.45 26.14 Z"
              fill="#000000"
            />
          </Svg>
        </Animated.View>
      </View>

      <View style={styles.betContainer}>
        <Text style={styles.label}>Balance: {balance} DMO</Text>

        {/* Red Bet */}
        <View style={styles.betSection}>
          <Text style={styles.betLabel}>Red (x2)</Text>
          <TouchableOpacity onPress={() => placeBet('red', 1)} style={styles.betButton}>
            <Text>+</Text>
          </TouchableOpacity>
          <Text style={styles.betAmount}>{bet.red}</Text>
          <TouchableOpacity onPress={() => placeBet('red', -1)} style={styles.betButton}>
            <Text>-</Text>
          </TouchableOpacity>
        </View>

        {/* Green Bet */}
        <View style={styles.betSection}>
          <Text style={styles.betLabel}>Green (x15)</Text>
          <TouchableOpacity onPress={() => placeBet('green', 1)} style={styles.betButton}>
            <Text>+</Text>
          </TouchableOpacity>
          <Text style={styles.betAmount}>{bet.green}</Text>
          <TouchableOpacity onPress={() => placeBet('green', -1)} style={styles.betButton}>
            <Text>-</Text>
          </TouchableOpacity>
        </View>

        {/* Black Bet */}
        <View style={styles.betSection}>
          <Text style={styles.betLabel}>Black (x2)</Text>
          <TouchableOpacity onPress={() => placeBet('black', 1)} style={styles.betButton}>
            <Text>+</Text>
          </TouchableOpacity>
          <Text style={styles.betAmount}>{bet.black}</Text>
          <TouchableOpacity onPress={() => placeBet('black', -1)} style={styles.betButton}>
            <Text>-</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={spinWheel} style={styles.spinButton} disabled={spinning}>
          <Text style={styles.spinText}>{spinning ? 'Spinning...' : 'Spin the Wheel'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#ffd700',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  spinnerContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  betContainer: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  betSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  betLabel: {
    fontSize: 18,
    color: '#fff',
    width: 100,
  },
  betButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  betAmount: {
    color: '#fff',
    fontSize: 18,
  },
  spinButton: {
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  spinText: {
    color: '#021324',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
