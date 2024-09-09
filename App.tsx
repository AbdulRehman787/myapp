import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './component/navigation/AuthNavigation';
import { Provider } from 'react-redux';
import store from './component/redux/store';
import BottomTab from './component/Pages/BottomTab';

import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
 
  return (
    <>
    <StripeProvider publishableKey='pk_test_51N29LQHV5zgJG4s6oXgnWKNHfpetnIQl3uXpvQWjbZXtcDkX7D10NMW7Z8CTj8Q0E4wP63TojKJdMKR3JY7hmkyb00TfMEV9t6'> 
    <Provider store={store}>
    <NavigationContainer>
    <AuthNavigation />

    </NavigationContainer>
    </Provider>
    </StripeProvider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})  