import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
const Home = () => {

    const navigation = useNavigation()

   const abc=()=>{
   navigation.navigate('HomeScreenone')
   }
   useEffect(() => {
    const timer = setTimeout(() => {
      abc();
    }, 5000);

   
    return () => clearTimeout(timer)
  }, []); 
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Welcome to this app</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#021324',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,

    },
    head: {
        fontSize: 32,
        textAlign: 'center',
        color: "#fff"
    },
    desc: {
        color: '#fff',
        textAlign: "center",
        lineHeight: 20,
        paddingVertical: 10
    },
    cont:{
        paddingVertical: 20,

    },
    btn:{
        backgroundColor :"#FFD700",
        paddingHorizontal : 16,
        paddingVertical: 8,
        borderRadius: 10,
        marginVertical: 10,

    },
    btntext: {
        color: '#fff'
    }
})