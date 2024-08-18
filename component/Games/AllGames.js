import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const imgdata=[
    {
      id: 1,
      img1: require('../../assets/images/diece.jpg'),
      name:"Diece"
    },
    {
      id: 2,
      img1: require('../../assets/images/headtail.jpg'),
      name:'HeadandTail'
    },
    {
      id: 3,
      img1: require("../../assets/images/numbermatch.jpg"),
      name:'NumberSlot'
    },
    {
      id: 4,
      img1: require("../../assets/images/pool.jpg"),
      name:'Pool'
    },
    {
      id: 5,
      img1: require("../../assets/images/spinner.jpg"),
      name:'Spinner'
    }, 
    {
        id: 6,
        img1: require("../../assets/images/rock.jpg"),
        name:'RockPaper'
      },
  ]

const AllGames = () => {
    const navigation = useNavigation();

    return (
      <ScrollView contentContainerStyle={styles.container}>
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
  
        <View style={styles.allGamesContainer}>
          <Text style={styles.sectionHeader}>All Games</Text>
          <View style={styles.gamesGrid}>
            {imgdata.map((curelem,index)=>{
                return(
                    <>
                    <TouchableOpacity key={index} style={styles.gameItem} onPress={()=>navigation.navigate(curelem.name)}>
                <Image  source={curelem.img1} style={styles.gameImage} />
               
              </TouchableOpacity>
                    </>
                )
            })}
           
          </View>
        </View>
  
        <View style={styles.footer}>
          {['Dashborad', 'Lottery', 'Wallet', 'Setting'].map((tab, index) => (
            <TouchableOpacity onPress={()=>navigation.navigate(tab)} key={index} style={styles.footerTab}>
              <Text style={styles.footerText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
};


export default AllGames
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
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
    allGamesContainer: {
      width: '100%',
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
    },
    footerText: {
      fontSize: 16,
      color: '#000',
    },
  });