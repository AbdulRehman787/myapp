import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
const RockPaper = () => {
  const [selectedChoice, setSelectedChoice] = useState('');

  const selectChoice = (choice) => {
    setSelectedChoice(choice);
  };

  const getImageSource = () => {
    switch (selectedChoice) {
      case 'Rock':
        return require('../../assets/images/rock.png');
      case 'Paper':
        return require('../../assets/images/paper.png');
      case 'Scissors':
        return require('../../assets/images/scissors.png');
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Paper Scissors</Text>

      <View style={styles.imageContainer}>
        {selectedChoice ? (
          <>
            <Image source={getImageSource()} style={styles.image} />
            <Text style={styles.choiceText}>{selectedChoice.toUpperCase()}</Text>
          </>
        ) : (
          <Text style={styles.selectText}>Choose your option</Text>
        )}
      </View>

      <View style={styles.choiceContainer}>
        <TouchableOpacity style={styles.choiceButton} onPress={() => selectChoice('Rock')}>
          <Image
            source={require('../../assets/images/rock.png')} // Replace with your Rock image URL
            style={styles.choiceImage}
          />
          <Text style={styles.choiceText}>ROCK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceButton} onPress={() => selectChoice('Paper')}>
          <Image
            source={require('../../assets/images/paper.png')} // Replace with your Paper image URL
            style={styles.choiceImage}
          />
          <Text style={styles.choiceText}>PAPER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceButton} onPress={() => selectChoice('Scissors')}>
          <Image
            source={require('../../assets/images/scissors.png')} // Replace with your Scissors image URL
            style={styles.choiceImage}
          />
          <Text style={styles.choiceText}>SCISSORS</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} placeholder="Enter amount" placeholderTextColor="#888" />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Bit</Text>
      </TouchableOpacity>

      <Text style={styles.noteText}>minimum: 3 | maximum is 1M | Win Amount 100%</Text>

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
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  choiceButton: {
    alignItems: 'center',
  },
  choiceImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  choiceText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#4a4a4a',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#ffd700',
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
    backgroundColor: '#ffd700',
    paddingVertical: 15,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
  
  },
  navText: {
    color: '#021324',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});

export default RockPaper;
