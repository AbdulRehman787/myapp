import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const HomeScreen1 = () => {
    const navigation= useNavigation()
    
    const abc=()=>{
        navigation.navigate('HomeScreentwo')
    }

  return (
    <View style={styles.container}>
        <View>
            <Image style={styles.image} source={require('../../assets/images/homeScreen1.png')}  />
        </View>
    <View>
        <Text style={styles.head}>Big Lottery Win</Text>
        <Text style={styles.desc}>Join Millions of Winners! 🌟 Play Smart, Win Big, and Make Dreams Come True.</Text>
    </View>
    <View style={styles.cont}>
        <TouchableOpacity style={styles.btn} onPress={()=> abc()}>
            <Text style={styles.btntext}>Get Started</Text>
        </TouchableOpacity>
    </View>
</View>
  )
}

export default HomeScreen1

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#021324',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,

    },
    image:{
        width: 400,
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