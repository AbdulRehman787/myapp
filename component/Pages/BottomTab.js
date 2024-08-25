import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './Dashborad';
import Profile from './Profile';
import Wallet from './Wallet';
import Setting from './Setting';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Dashborad'  component={Dashboard}/>
        <Tab.Screen name='Wallet'  component={Wallet}/>
        <Tab.Screen name='Profile'  component={Profile}/>
        <Tab.Screen name='Setting'  component={Setting}/>
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})