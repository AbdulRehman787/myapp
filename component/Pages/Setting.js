import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../Games/Footer';
const Setting = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Setting</Text>
      
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://example.com/your-profile-image-url' }} 
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Pooja Sharma</Text>
          <Text style={styles.profileEmail}>poojasharma19@gmail.com</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem icon={require('../../assets/images/user.png')} text="My Profile" />
        <MenuItem icon={require('../../assets/images/trophy.png')} text="Top Winner" />
        <MenuItem icon={require('../../assets/images/upcoming.png')} text="Upcoming Lottery" />
        <MenuItem icon={require('../../assets/images/transaction1.png')} text="Transactions" />
        <MenuItem icon={require('../../assets/images/insurance.png')} text="Privacy & Policy" />
        <MenuItem icon={require('../../assets/images/renewable.png')} text="Terms & Condition" />
        <MenuItem icon={require('../../assets/images/support.png')} text="Help & Support" />
        <MenuItem icon={require('../../assets/images/logout.png')} text="Sign Out" />
      </View>
      <Footer />
    </View>
  );
}

const MenuItem = ({ icon, text }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(text)}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.menuText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324',
    paddingHorizontal: 20,
    paddingTop: 30
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  profileEmail: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#FFFFFF',
  },
  icon: {
    width: 30, // Set the desired width
    height: 30, // Set the desired height
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#021324',
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default Setting;
