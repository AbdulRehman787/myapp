import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const TransferBalance = ({ route }) => {
    const [friendid, setFriendId] = useState('')

    const { user_id, walletBalance } = route.params;
    const [transferAmount, setTransferAmount] = useState('');
const [wallet_Balance,setWalletBalance] = useState(walletBalance)

    const handleTransfer = async () => {
        const amount = parseFloat(transferAmount);
        if (!friendid || !amount) {
            Alert.alert('Please fill all input');
            return;
        }
        if (amount <= 0 || amount > walletBalance) {
            Alert.alert('Error', "Invalid Transfer Amount");
            return;
        }
    
        try {
            const data = {
                senderId: user_id,
                receiverId: friendid,
                amount: transferAmount
            };
            
            // Wait for the Axios call to complete
            const response = await axios.post('https://bulldog-solid-bream.ngrok-free.app/transferbalance', data);
    
            // Check if the response data has the success property
            if (response.data && response.data.success) {
                Alert.alert('Success', `Transferred $${amount} to ${friendid}.`);
                setWalletBalance(walletBalance-transferAmount)
            } else {
                Alert.alert('Error', response.data.message || 'Transfer failed.');
            }
        } catch (err) {
            console.log('Error Messaging', err);
            Alert.alert('Error', 'An error occurred while transferring balance.');
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.head}>TransferBalance</Text>
            <Text style={styles.balance}>Wallet Balance is {wallet_Balance}</Text>
            <View>
                <TextInput value={friendid} onChangeText={setFriendId} style={styles.input} keyboardType={'number-pad'} placeholder='Enter User Id' placeholderTextColor={'#ffd700'} />
            </View>
            <View>
                <TextInput value={transferAmount} onChangeText={setTransferAmount} style={styles.input} keyboardType={'number-pad'} placeholder='Enter Amount for your friend' placeholderTextColor={'#ffd700'} />
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => handleTransfer()}><Text style={styles.btntext}>Send Balance</Text></TouchableOpacity>
        </View>
    )
}

export default TransferBalance

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#021324",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    head: {
        fontSize: 22,
        fontFamily: "Poppins-Regular",
        textAlign: 'center',
        color: "#fff",
        marginBottom: 30,
    },
    balance:{
        fontSize: 18,fontFamily:"Poppins-Regular",
        textAlign:'center',
        color:"#fff",
        marginBottom : 20,
    },
    input: {
        padding: 12,

        borderRadius: 10,
        color: "#ffd700",
        borderWidth: 1,
        borderColor: "#ffd700",
        borderStyle: 'solid',
        fontFamily: "Poppins-Regular",
        marginBottom: 20,
    },
    btn: {

        backgroundColor: "#ffd700",
        borderRadius: 12,
        marginVertical: 30,
        width: '100%',
        height: 60,
        justifyContent: "center"
    },
    btntext: {
        color: "#fff",
        textAlign: "center",
    }
})