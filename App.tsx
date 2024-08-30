import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './component/navigation/AuthNavigation';
import { Provider } from 'react-redux';
import store from './component/redux/store';
import BottomTab from './component/Pages/BottomTab';
const App = () => {
 
  return (
    <>
    <Provider store={store}>
    <NavigationContainer>
    <AuthNavigation />

    </NavigationContainer>
    </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})  