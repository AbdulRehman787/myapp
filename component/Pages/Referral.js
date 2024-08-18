import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const data =[
  {
    name: 'Sushant Sing',
    email: 'sushantsing1986@gmail.com',
    level:2,
    joiningDate : '17/ August / 2024'
  },
  {
    name: 'Sushant Sing',
    email: 'sushantsing1986@gmail.com',
    level:2,
    joiningDate : '17/ August / 2024'
  },  {
    name: 'Sushant Sing',
    email: 'sushantsing1986@gmail.com',
    level:2,
    joiningDate : '17/ August / 2024'
  },  {
    name: 'Sushant Sing',
    email: 'sushantsing1986@gmail.com',
    level:2,
    joiningDate : '17/ August / 2024'
  },
]

const Referral = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.head}>Referral</Text>
      </View>
      
      <View style={styles.cont1}>
        <Text style={styles.head1}>Invite your friend</Text>
        <View style={styles.cont1_1}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntext}>Copy Link</Text>
          </TouchableOpacity>
          <View style={styles.value}>
          <Text style={styles.link}>https://mui.com/material-ui/customization/color/</Text>
        </View>
        </View>
        <Text style={styles.sharehead}>Or</Text>
        <Text style={styles.sharehead}>Share with your Social friend</Text>

        <View style={styles.cont1_2}>
          <TouchableOpacity style={styles.btn1}><Text style={styles.btntext}>Facebook</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn1}><Text style={styles.btntext}>Whatspp</Text></TouchableOpacity>
        </View>
        <View style={styles.cont1_3}>
          <Text style={styles.head1}>My Referrals</Text>
       <Text onPress={()=>navigation.navigate('AllReferral')} style={styles.head1}>See All</Text>
        </View>
      </View>
<View >

<View>
  {data.map((curelem,index)=>{
    return(
      <>
      <View style={styles.cont2_1}>
      <Text style={styles.head1}>Name {curelem.name}</Text>
      <Text style={styles.head1}>Email {curelem.email}</Text>
      <Text style={styles.head1}>Joining Date{curelem.joiningDate}</Text>
      </View>
      </>
    )
  })}
</View>
</View>
    </View>
  )
}

export default Referral

const styles = StyleSheet.create({
  container:{
    height: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor:"#021324"
  },
  head:{
    fontSize:22,
    fontFamily:'Poppins-Regular',
    textAlign: 'center',
    color:"#fff"
  },
  head1:{
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color:"#fff"
  },
  btn:{
    padding: 12,
    backgroundColor:"#ffd700",
    borderRadius: 10,
    textAlign:"center",
    justifyContent:'center',
    width:'30%'
  },btntext:{
    color:"#fff",
    textAlign:'center'
  },
  value:{
    borderColor:'#ffd700',
    borderWidth:1,
    borderStyle:'solid',
    padding: 10,
    width: '70%',
    borderRadius:10
  },link:{
    color:"#ffd700"
  },
  cont1_1:{
    flexDirection:"row",
    justifyContent:'space-between',
    marginVertical:10
  },
  sharehead:{
    fontSize: 18,
    color:"#fff"
  },
  cont1_2:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  btn1:{
    backgroundColor:"#ffd700",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 20,
  },btntext:{
    color:"#fff",
    textAlign:'center',
    fontSize: 18,
    fontFamily:"Poppins-Regular"
  },
  cont1_3:{
    flexDirection:"row",
    justifyContent:'space-between',
    paddingVertical: 10
  },
  cont2:{
    padding: 10,
    borderRadius : 10,
    backgroundColor:"#000",
    flexDirection:"row",
    justifyContent:'space-around'
  },
  cont2_1:{
    backgroundColor:'#000',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10
  }
  
})