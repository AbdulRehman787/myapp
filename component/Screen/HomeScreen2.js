import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const HomeScreen2 = () => {
    const navigation = useNavigation()



    const nav= ()=>{
        navigation.navigate('HomeScreenthree')
    }

    const back=()=>{
        navigation.navigate('HomeScreenone')
    }
  return (
    <View style={styles.container}>
        <View>
            <Image style={styles.image} source={require('../../assets/images/homeScreen2.png')}  />
        </View>
    <View>
        <Text style={styles.head}>Big Supero Lottery </Text>
        <Text style={styles.desc}>Join Millions of Winners! 🌟 Play Smart, Win Big, and Make Dreams Come True.</Text>
    </View>
    <View style={styles.cont}>
        <TouchableOpacity style={styles.btn1} onPress={()=> back()} >
            <Text style={styles.btntext}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=> nav()}>
            <Text style={styles.btntext}>Next</Text>
        </TouchableOpacity>
    </View>
</View>
  )
}

export default HomeScreen2

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#021324',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,

    },
    image:{
        width: 350,
        height: 350,
        justifyContent: 'center'
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
        flexDirection:"row",
        justifyContent:"space-between",
        width: '60%'
        
    },
    btn:{
        backgroundColor :"#FFD700",
       width: 100,
       height: 40,
        borderRadius: 10,
        justifyContent:"center",
    alignItems:"center"

    },
    btntext: {
        color: '#fff'
    },
    btn1:{
        backgroundColor :"#000",
        width: 100,
        height: 40,
         borderRadius: 10,
         justifyContent:"center",
     alignItems:"center",
     borderWidth: 1,
     borderColor:"#ffd700",
    borderStyle:"solid"
    },
})