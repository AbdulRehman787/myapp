import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../Screen/Home'
import HomeScreen1 from '../Screen/HomeScreen1'
import HomeScreen2 from '../Screen/HomeScreen2'
import HomeScreen3 from '../Screen/HomeScreen3'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import ForgotPassword from '../Auth/ForgotPassword'
import NewPassword from '../Auth/NewPassword'
import Verify from '../KycVerify/Verify'
import GetDocuments from '../KycVerify/GetDocuments'


import Lottery from '../Lotteries/Lottery'
import AllGames from '../Games/AllGames'
import ScratchLottery from '../Lotteries/ScratchLottery'
import HeadandTail from '../Games/HeadandTail'
import DiceGame from '../Games/Diece'

import RockPaper from '../Games/RockPaper'
import Spinner from '../Games/Spinner'
import NumberSlot from '../Games/NumberSlot'
import Setting from '../Pages/Setting'
import Profile from '../Pages/Profile'
import EditProfile from '../Pages/EditProfile'
import TopWinner from '../Pages/TopWinner'
import Transaction from '../Pages/Transaction'
import Privacy from '../Pages/Privacy'
import TermsCondition from '../Pages/TermsCondition'
import HelpSupport from '../Pages/HelpSupport'
import Notification from '../Pages/Notification'
import Referral from '../Pages/Referral'
import MyReferrals from '../Pages/MyReferrals'
import AllReferral from '../Pages/AllReferral'
import Deposit from '../Wallet/Deposit'
import DepositPage from '../Wallet/DepositPage'
import DepositOption from '../Wallet/DepositOption'
import PaymentOptions from '../Wallet/PaymentsOption'
import UsdtPayment from '../Wallet/UsdtPayment'
import UsdtTransfer from '../Wallet/UsdtTransfer'
import CardPayment from '../Wallet/CardPayment'
import HomeScreen from '../Screen/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from './../Pages/Dashborad';
import UpComingLottery from './../Pages/UpcomingLottery';
import Signout from '../Pages/Signout'
import DemoAccount from '../Wallet/DemoAccount'
import RealAccount from '../Wallet/RealAccount'
const Stack = createNativeStackNavigator()
const AuthNavigation = () => {
  return (

          <Stack.Navigator initialRouteName='Home'  screenOptions={{
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
        <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='Lottery' component={Lottery} />
        <Stack.Screen name='AllGames' component={AllGames} />
        <Stack.Screen name='ScratchLottery' component={ScratchLottery} />
        <Stack.Screen name='Diece' component={DiceGame} />
        <Stack.Screen name='HeadandTail' component={HeadandTail} />
        <Stack.Screen name='RockPaper' component={RockPaper} />
        <Stack.Screen name='Spinner' component={Spinner} />
        <Stack.Screen name='NumberSlot' component={NumberSlot} /> 
        <Stack.Screen name='Setting' component={Setting} /> 
        <Stack.Screen name='My Profile' component={Profile} /> 
        <Stack.Screen name='EditProfile' component={EditProfile} /> 
        <Stack.Screen name='Top Winner' component={TopWinner} /> 
        <Stack.Screen name='Upcoming Lottery' component={UpComingLottery} /> 
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
      
    
  )
}

export default AuthNavigation

const styles = StyleSheet.create({})