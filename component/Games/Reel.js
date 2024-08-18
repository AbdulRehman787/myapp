import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

const Reel = ({ symbols, speed, onReelStop }) => {
  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: symbols.length * 100, // Adjust for your desired height
        duration: speed,
        useNativeDriver: true,
      }).start(() => {
        const newIndex = (currentSymbolIndex + 1) % symbols.length;
        setCurrentSymbolIndex(newIndex);
        onReelStop(newIndex);
      });
    };

    const intervalId = setInterval(spin, speed);
    return () => clearInterval(intervalId);
  }, [symbols, speed, onReelStop]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, symbols.length * 100],
    outputRange: [0, -symbols.length * 100],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {symbols.map((symbol, index) => (
          <View key={index} style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{symbol}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default Reel;