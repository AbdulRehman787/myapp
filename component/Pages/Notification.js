import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const Notification = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>

<View>
<Text style={styles.head}>Notification</Text>

</View>
<View style={styles.cont1}>
<Text style={styles.head1}>Your account not verified please verify your account</Text>
</View>
<View>
  <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('Verify')}>
    <Text style={styles.btntext}>Verify</Text>
  </TouchableOpacity>
</View>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container:{
    paddingVertical:30,
    paddingHorizontal:20,
    backgroundColor:'#021324',
    height:"100%"
  },
  cont1:{
    marginVertical: 20,

  },
  head:{
    fontSize:22,
     fontFamily:"Poppins-Regular",
    textAlign:'center',
    color:'#fff',
  },
  head1:{
    fontSize:18,
     fontFamily:"Poppins-Regular",
    textAlign:'center',
    color:'#fff'
  },
  btn:{
    padding: 16,
    backgroundColor:"#ffd700",
    borderRadius: 10
  },
  btntext:{
    color:"#fff",
    textAlign:"center",
  }
})