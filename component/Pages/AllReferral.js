import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react'

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
      },
      {
        name: 'Sushant Sing',
        email: 'sushantsing1986@gmail.com',
        level:2,
        joiningDate : '17/ August / 2024'
      },
  ]
const AllReferral = () => {
  return (
    
    <View style={styles.container}>
      <Text style={styles.head}>AllReferral</Text>
      <ScrollView>
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
</ScrollView>
    </View>
   
  )
}

export default AllReferral

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