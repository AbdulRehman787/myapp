import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Privacy = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headcont}>
        <Text style={styles.head}>Privacy & Policiy</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detailscontainer}>
          <Text style={styles.dataname}>Data Security</Text>
          <Text style={styles.datadesc}>We use industry-standard security measures to protect your information.
             However, no method of transmission over the internet or electronic storage is 100% secure.
              We cannot guarantee absolute security.</Text>
        </View>
        <View style={styles.detailscontainer}>
          <Text style={styles.dataname}>Payment Information</Text>
          <Text style={styles.datadesc}>If you engage in financial transactions through our wallet feature, we collect payment details such as credit/debit card information, bank account details, and transaction history.</Text>
        </View>
        <View style={styles.detailscontainer}>
          <Text style={styles.dataname}>Marketing</Text>
          <Text style={styles.datadesc}>To send promotional messages and offers related to SapnokiLottery, with your consent.</Text>
        </View>
        <View style={styles.detailscontainer}>
          <Text style={styles.dataname}>Legal Requirements</Text>
          <Text style={styles.datadesc}>We may disclose your information if required by law or to protect the rights, property, or safety of SapnokiLottery, our users, or others.</Text>
        </View>
        <View style={styles.detailscontainer}>
          <Text style={styles.dataname}>Children's Privacy</Text>
          <Text style={styles.datadesc}>SapnokiLottery is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you believe we have collected such information, please contact us so we can delete it.</Text>
        </View>
      </View>
    </View>
  )
}

export default Privacy

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: "100%",
    backgroundColor: "#021324"
  },
  head:{
    fontSize: 22,
    fontFamily: "Poopins-Regular",
    textAlign: "center",
    color: "#fff"

  },
  headcont:{ 
    paddingBottom: 20,
  },

  dataname:{
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#fff"
  },
  datadesc:{
    color: "#fff",
    fontSize: 14
  },
  detailscontainer:{
    paddingVertical : 10,
  }
})