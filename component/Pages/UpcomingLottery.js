import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const data = [
  {
    id: '1',
    name: 'Blockchain Lottery Club',
    desc: "Draw took place on",
    date : 'Tuesday 22/08/2024',
    timeLeft: '1d 24:40',
    jackpot: '$1M',
    image: require('../../assets/images/lottery1.png')
  },
  {
    id: '2',
    name: 'Mirage Lottery Project',
    timeLeft: '1d 24:40',
    desc: "Draw took place on",
    date : 'Tuesday 22/08/2024',
    jackpot: '$1M',

    image: require('../../assets/images/spinner.png')

  },
  {
    id: '3',
    name: 'Euro Lottery',
    desc: "Draw took place on",
    date : 'Tuesday 22/08/2024',
    timeLeft: '1d 24:40',
    jackpot: '$1M',
    image: require('../../assets/images/numberslot.png')

  },
  {
    id: '4',
    name: 'Blockchain Lottery Club',
    desc: "Draw took place on",
    date : 'Tuesday 22/08/2024',
    timeLeft: '1d 24:40',
    jackpot: '$1M',
    image: require('../../assets/images/lottery1.png')

  },
];

const UpComingLottery = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
    <View style={styles.card1}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.time}>{item.desc}</Text>
        <Text style={styles.jackpot}>{item.date}</Text>
      </View>
    </View>
    <View style={styles.line}></View>
    <View style={styles.card2}> 
      <Text style={styles.time}>{item.timeLeft}</Text>
      <Text style={styles.jackpot}>{item.jackpot}</Text>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Lottery</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-Regular"
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: '#ffd700',
    borderWidth: 1,
    
  },
  image: {
    width: 100,
    height: 70,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  jackpot: {
    fontSize: 16,
    color: '#ffd700',
    fontWeight: 'bold',
  },
  card1:{
    flexDirection:"row",
    justifyContent: 'space-between',
  },
  card2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  line:{
    backgroundColor:"#ffd700",
    height: 2,
    marginVertical: 10
  }
 
});

export default UpComingLottery;
