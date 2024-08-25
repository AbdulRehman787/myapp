import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React, { useEffect,useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const { width, height } = Dimensions.get('window');


const imgdata=[
  {
    id: 1,
    img1: require('../../assets/images/diece.jpg')
  },
  {
    id: 2,
    img1: require('../../assets/images/headtail.jpg')
  },
  {
    id: 3,
    img1: require("../../assets/images/numbermatch.jpg")
  },
  {
    id: 4,
    img1: require("../../assets/images/pool.jpg")
  },
  {
    id: 5,
    img1: require("../../assets/images/spinner.jpg")
  },
]
const winnerdata=[
  {
    id: 1,
    img1: require('../../assets/images/student1.png')
  },
  {
    id: 2,
    img1: require('../../assets/images/sudent2.png')
  },
  {
    id: 3,
    img1: require("../../assets/images/student3.png")
  },
  {
    id: 4,
    img1: require("../../assets/images/student4.png")
  },
  {
    id: 5,
    img1: require("../../assets/images/student5.png")
  },
]
const Dashboard = () => {
  const navigation = useNavigation();
  const [newData,setNewData]= useState('')

  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.balance);
  const transactions = useSelector((state) => state.transactions.transactions);

  useEffect(() => {
    // Fetch the balance and transactions from the backend (mocking it here)
    const fetchData = async () => {
      const balanceResponse = await axios.get('/api/balance');
      const transactionsResponse = await axios.get('/api/transactions');
      
      dispatch({ type: 'SET_BALANCE', payload: balanceResponse.data.balance });
      dispatch({ type: 'SET_TRANSACTIONS', payload: transactionsResponse.data.transactions });
    };

    fetchData();
  }, [dispatch]);


  useEffect(() => {
    getData();
  }, []);
 

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserData');
      if (jsonValue != null) {
        setNewData(JSON.parse(jsonValue));
      }
    } catch (err) {
      console.log(err);
    }
  };

        const userNameInitials = newData.name ? newData.name.slice(0, 2).toUpperCase() : '';


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cont1}>
          <TouchableOpacity style={styles.cont1img} onPress={()=> navigation.navigate('My Profile')}>
          <Text style={styles.cont1imgtext} >{userNameInitials}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('Notification')}>
            
            <Image source={require('../../assets/images/notification.jpg')} style={styles.notificationImg} />
          </TouchableOpacity>
        </View>

        <View style={styles.cont2}>
          <View>
            <Text style={styles.wallethead}>Wallet OverView</Text>
            <Text style={styles.walletprice}>${balance.toFixed(2)}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Deposit')}><Text style={styles.btntext}>Deposit</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.cont3}>
          <View style={styles.cont3_1}>
            {imgdata.map((curelem,index)=>{
              return(
                <View key={curelem.id}>
                <Image source={curelem.img1} style={styles.gameimg} />
              </View>
              )
            })}
          
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('AllGames')}>
              <Text style={styles.seeallgame}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cont4}>
          <View style={styles.cont4_1}>
            <Text style={styles.wallethead}>Number Lottery</Text>
            <Text style={styles.mainhead}>Win {"\n"}$10000 </Text>
            <Text style={styles.desc}>of prices guranted every month</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Lottery')}><Text style={styles.btntext}>PlayNow</Text></TouchableOpacity>
          </View>
          <View>
            <Image source={require('../../assets/images/coin.png')} style={styles.coinimg} />
          </View>
        </View>

        <View style={styles.cont2}>
          <View>
            <Text style={styles.mainhead}>Spin Wheel</Text>
            <TouchableOpacity style={styles.btn}><Text style={styles.btntext}>PlayNow</Text></TouchableOpacity>
          </View>
          <View>
            <Image source={require('../../assets/images/spinner.jpg')} style={styles.coinimg1} />
          </View>
        </View>

        <View style={styles.cont3}>
          <View><Text style={styles.winnerhead}>Our Recent Winners</Text></View>
          <View style={styles.cont3_1}>
            {winnerdata.map((curelem,index)=>{
              return(
                <View key={curelem.id}>
                <Image source={curelem.img1} style={styles.gameimg} />
              </View>
              )
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#021324',
    flex: 1,
  },
  cont1: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  cont1img: {
    width: width * 0.12,
    height: width * 0.12,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: (width * 0.12) / 2,
    borderWidth: 2,
    borderColor: "#ffd700",
  },
  cont1imgtext: {
    color: "#ffd700",
    fontSize: width * 0.035,
    fontFamily: 'Poppins-Regular',
  },
  notificationImg: {
    width: 30,
    height: 30,
  },
  cont2: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ffd700',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.015,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  btn: {
    backgroundColor: "#ffd700",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: 10,
  },
  btntext: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: width * 0.035,
    textAlign: "center",
  },
  wallethead: {
    fontSize: width * 0.05,
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  walletprice: {
    fontSize: width * 0.045,
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  cont3: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderWidth: 1,
    borderColor: "#ffd700",
    borderRadius: 10,
    marginVertical: 10,
  },
  cont3_1: {
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: "center",
  },
  gameimg: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    borderWidth: 1,
    borderColor: "#ffd700",
  },
  seeallgame: {
    color: "#ffd700",
    textAlign: "right",
    fontWeight: "bold",
  },
  cont4: {
    borderWidth: 1,
    borderColor: "#ffd700",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
  },
  coinimg: {
    width: width * 0.4,
    height: width * 0.4,
  },
  cont4_1: {
    width: '50%',
  },
  mainhead: {
    color: "#ffd700",
    fontSize: width * 0.055,
    fontFamily: "Poppins-Regular",
  },
  desc: {
    fontSize: width * 0.035,
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },
  coinimg1: {
    width: width * 0.3,
    height: width * 0.3,
  },
  winnerhead: {
    color: "#fff",
    textAlign: "center",
    paddingBottom: 10,
  },
})
