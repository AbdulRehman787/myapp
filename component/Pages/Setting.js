import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // If you are using vector icons
import { useNavigation } from '@react-navigation/native';
const Setting = () => {

  const navigation  = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Setting</Text>
      
      <View style={styles.profileContainer}>
        <Image 
          source={{uri: 'https://example.com/your-profile-image-url'}} 
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Pooja Sharma</Text>
          <Text style={styles.profileEmail}>poojasharma19@gmail.com</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem icon="person-outline" text="My Profile" />
        <MenuItem icon="trophy-outline" text="Top Winner" />
        <MenuItem icon="calendar-outline" text="Upcoming Lottery" />
        <MenuItem icon="card-outline" text="Transactions" />
        <MenuItem icon="document-text-outline" text="Privacy & Policy" />
        <MenuItem icon="document-text-outline" text="Terms & Condition" />
        <MenuItem icon="help-circle-outline" text="Help & Support" />
        <MenuItem icon="log-out-outline" text="Sign Out" />
      </View>

    </View>
  );
}

const MenuItem = ({ icon, text }) => {
  const navigation  = useNavigation()

  return (
    <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate(text)}>
      <Icon name={icon} size={24} color="#FFFFFF" />
      <Text style={styles.menuText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021324', // Background color as requested
    paddingHorizontal: 20,
    paddingVertical: 40,
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
    borderBottomColor: '#FFFFFF', // White border for separation
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#FFFFFF',
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
