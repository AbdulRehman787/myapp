import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

   
// Footer Component
const Footer = () => {
    
    const navigation = useNavigation();
  
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('SlotGame1')}
        >
          <Text style={styles.footerButtonText}>Dashboard</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Lottery')}
        >
          <Text style={styles.footerButtonText}>Lottery</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Deposit')}
        >
          <Text style={styles.footerButtonText}>Wallet</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Setting')}
        >
          <Text style={styles.footerButtonText}>Setting</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

export default Footer

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '110%',
        backgroundColor: '#ffd700',
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius:15,
        
      },
      footerButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
      },
      footerButtonText: {
        color: '#021324',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
      },
})