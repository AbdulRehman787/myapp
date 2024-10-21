import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Footer from './Footer';
const imgdata = [
  { id: 1, img1: require('../../assets/images/diece.jpg'), name: 'Diece' },
  { id: 2, img1: require('../../assets/images/headtail.jpg'), name: 'HeadandTail' },
  { id: 3, img1: require('../../assets/images/numbermatch.jpg'), name: 'NumberSlot' },
  { id: 4, img1: require('../../assets/images/casino.jpg'), name: 'Casino' },
  { id: 5, img1: require('../../assets/images/spinner.jpg'), name: 'Spinner' },
  { id: 6, img1: require('../../assets/images/rock.jpg'), name: 'RockPaper' },
  { id: 7, img1: require('../../assets/images/coinplt.jpg'), name: 'PokerGame' },
  { id: 8, img1: require('../../assets/images/puzzle.jpg'), name: 'PuzzleGame' },
  { id: 9, img1: require('../../assets/images/jetx.jpg'), name: 'JetX' },
  { id: 10, img1: require('../../assets/images/double.jpg'), name: 'DoubleGame' },
  { id: 10, img1: require('../../assets/images/mines.jpg'), name: 'MinesGame' },
  { id: 10, img1: require('../../assets/images/mines.jpg'), name: 'Color' },
];

const AllGames = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params;

  // State variables for wallet balance and loading status
  const [wallet_Balance, setWalletBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWalletBalance = async () => {
    try {
      if (!userId) {
        console.log("No user ID found!");
        setLoading(false);
        return;
      }

      const response = await axios.get(`https://bulldog-solid-bream.ngrok-free.app/wallet-balance/${userId}`);
      console.log("API Response:", response.data);

      if (response.data.wallet_balance !== undefined) {
        setWalletBalance(response.data.wallet_balance);
      } else {
        console.log("Wallet balance is not found or is null.");
        setWalletBalance(0);  // Set to 0 or another default if balance is null
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      setLoading(false);
    }
  };

  // Use useFocusEffect to refresh the screen when it comes back into focus
  useFocusEffect(
    useCallback(() => {
      fetchWalletBalance(); // Fetch wallet balance when the screen is focused
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Games</Text>

      <View style={styles.featuredContainer}>
        <Text style={styles.sectionHeader}>Featured Games</Text>
        <View style={styles.featuredGame}>
          <Image source={require('../../assets/images/spinner.jpg')} style={styles.featuredImage} />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredText}>Spin Wheel</Text>
            <TouchableOpacity style={styles.playNowButton}>
              <Text style={styles.playNowText}>Play Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.sectionHeader}>All Games</Text>
      <ScrollView contentContainerStyle={styles.allGamesContent}>
        <View style={styles.gamesGrid}>
          {imgdata.map((curelem, index) => (
            <TouchableOpacity key={index} style={styles.gameItem} onPress={() => navigation.navigate(curelem.name, { wallet_Balance: wallet_Balance })}>
              <Image source={curelem.img1} style={styles.gameImage} />
              <Text style={styles.gameTitle}>{curelem.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Footer />
  
    </View>
  );
};

export default AllGames;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
    backgroundColor: '#021324',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  featuredContainer: {
    width: '100%',
    marginBottom: 20,
  },
  featuredGame: {
    position: 'relative',
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  playNowButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
  },
  playNowText: {
    color: '#000',
    fontWeight: 'bold',
  },
  allGamesContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameItem: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  gameImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  gameTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#FFD700',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: -20,
  },
  footerText: {
    fontSize: 16,
    color: '#000',
  },
});
