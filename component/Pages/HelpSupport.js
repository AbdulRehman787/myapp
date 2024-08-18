import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'

const HelpSupport = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.head}>HelpSupport</Text>
      </View>

      <View style={styles.cont1}>
        <View style={styles.details}>
          <Text style={styles.accounthead}>My Account</Text>
          <TouchableOpacity style={styles.btn}><Image source={require('../../assets/images/right-arrow.png')} /></TouchableOpacity>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>My Lottery</Text>
          <TouchableOpacity style={styles.btn}><Image source={require('../../assets/images/right-arrow.png')} /></TouchableOpacity>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>Payment</Text>
          <TouchableOpacity style={styles.btn}><Image source={require('../../assets/images/right-arrow.png')} /></TouchableOpacity>
        </View>
        <View style={styles.details}>
          <Text style={styles.accounthead}>Voucher</Text>
          <TouchableOpacity style={styles.btn}><Image source={require('../../assets/images/right-arrow.png')} /></TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default HelpSupport

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: "100%",
    backgroundColor: "#021324"
  },
  head: {
    fontSize: 24,
    fontFamily: "Poppins-Regular",
    color: "#fff",
    textAlign: "center"
  },  
  details:{
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: "#ffd700",
    borderStyle: "solid",
    alignItems: "center",
    marginVertical: 10,
    borderRadius:10
  },
  accounthead:{
    fontSize: 18,
    fontFamily:"Poppins-Regular",
    color: "white"
  },
  btn:{
    borderColor: '#ffd700',
    borderWidth: 1,
    borderStyle: 'solid',
    width: 40,height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent:"center"
  }
})