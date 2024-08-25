import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './component/Screen/Home';
import HomeScreen from './component/Screen/HomeScreen';
import HomeScreen1 from './component/Screen/HomeScreen1';
import HomeScreen2 from './component/Screen/HomeScreen2';
import HomeScreen3 from './component/Screen/HomeScreen3';
import Login from './component/Auth/Login';
import Signup from './component/Auth/Signup';
import ForgotPassword from './component/Auth/ForgotPassword';
import NewPassword from './component/Auth/NewPassword';
import Verify from './component/KycVerify/Verify';
import GetDocuments from './component/KycVerify/GetDocuments';
import Dashborad from './component/Pages/Dashborad';
import Lottery from './component/Lotteries/Lottery';
import AllGames from './component/Games/AllGames';
import ScratchLottery from './component/Lotteries/ScratchLottery';
import Diece from './component/Games/Diece';
import HeadandTail from './component/Games/HeadandTail';
import RockPaper from './component/Games/RockPaper';
import Spinner from './component/Games/Spinner';
import NumberSlot from './component/Games/NumberSlot';
import Setting from './component/Pages/Setting';
import Profile from './component/Pages/Profile';
import EditProfile from './component/Pages/EditProfile';
import TopWinner from './component/Pages/TopWinner';
import UpcomingLottery from './component/Pages/UpcomingLottery';
import Transaction from './component/Pages/Transaction';
import Privacy from './component/Pages/Privacy';
import TermsCondition from './component/Pages/TermsCondition';
import HelpSupport from './component/Pages/HelpSupport';
import Signout from './component/Pages/Signout';
import Notification from './component/Pages/Notification';
import Referral from './component/Pages/Referral';
import AllReferral from './component/Pages/AllReferral';
import Deposit from './component/Wallet/Deposit';
import Wallet from './component/Pages/Wallet';
import DepositPage from './component/Wallet/DepositPage';
import DepositOption from './component/Wallet/DepositOption';
import PaymentOptions from './component/Wallet/PaymentsOption';
import DemoAccount from './component/Wallet/DemoAccount';
import RealAccount from './component/Wallet/RealAccount';
import UsdtPayment from './component/Wallet/UsdtPayment';
import UsdtTransfer from './component/Wallet/UsdtTransfer';
import CardPayment from './component/Wallet/CardPayment';


import { Provider } from 'react-redux';
import store from './component/redux/store';
import BottomTab from './component/Pages/BottomTab';
const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <>
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'  screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='HomeScreenone' component={HomeScreen1} />
        <Stack.Screen name='HomeScreentwo' component={HomeScreen2} />
        <Stack.Screen name='HomeScreenthree' component={HomeScreen3} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='NewPassword' component={NewPassword} />
        <Stack.Screen name='Verify' component={Verify} />
        <Stack.Screen name='GetDocuments' component={GetDocuments} />
        <Stack.Screen name='Dashboard' component={Dashborad} />
        <Stack.Screen name='Lottery' component={Lottery} />
        <Stack.Screen name='AllGames' component={AllGames} />
        <Stack.Screen name='ScratchLottery' component={ScratchLottery} />
        <Stack.Screen name='Diece' component={Diece} />
        <Stack.Screen name='HeadandTail' component={HeadandTail} />
        <Stack.Screen name='RockPaper' component={RockPaper} />
        <Stack.Screen name='Spinner' component={Spinner} />
        <Stack.Screen name='NumberSlot' component={NumberSlot} /> 
        <Stack.Screen name='Setting' component={Setting} /> 
        <Stack.Screen name='My Profile' component={Profile} /> 
        <Stack.Screen name='EditProfile' component={EditProfile} /> 
        <Stack.Screen name='Top Winner' component={TopWinner} /> 
        <Stack.Screen name='Upcoming Lottery' component={UpcomingLottery} /> 
        <Stack.Screen name='Transactions' component={Transaction} />
        <Stack.Screen name='Privacy & Policy' component={Privacy} />
        <Stack.Screen name='Terms & Condition' component={TermsCondition} />
        <Stack.Screen name='Help & Support' component={HelpSupport} />
        <Stack.Screen name='Sign Out' component={Signout} />
        <Stack.Screen name='Notification' component={Notification} />
        <Stack.Screen name='Referral' component={Referral} />
        <Stack.Screen name='AllReferral' component={AllReferral} />
        <Stack.Screen name='Deposit' component={Deposit} />
        <Stack.Screen name='DepositPage' component={DepositPage} />
        <Stack.Screen name='DepositOptions' component={DepositOption} />
        <Stack.Screen name='PaymentOptions' component={PaymentOptions} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='DemoAccount' component={DemoAccount} />
        <Stack.Screen name='RealAccount' component={RealAccount} />
        <Stack.Screen name='UsdtPayment' component={UsdtPayment} />
        <Stack.Screen name='UsdtTransfer' component={UsdtTransfer} />
        <Stack.Screen name='Card Payment' component={CardPayment} />
     
      </Stack.Navigator>
      
    </NavigationContainer>
    </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})  