import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
const Deposit = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Deposit</Text>
            <View style={styles.btncont}>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('DepositPage')}>
                    <Text style={styles.btntext}>Deposit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntext}>Withdraw</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntext}>Transfer</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default Deposit;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#021324",
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    head: {
        fontSize: 24,
        fontFamily: "Poppins-Regular",
        textAlign: "left",
        color: "#fff"
    },
    btncont: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20
    },
    btn: {
        padding: 12,
        height: 60,
        backgroundColor: "#ffd700",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ffd700",
        borderStyle: "solid"
    },
    btntext: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Poppins-Regular",
        fontSize: 18
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#021324",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        borderColor: "#ffd700",
        borderWidth: 1,
    },
    modalTitle: {
        fontSize: 20,
        color: "#fff",
        fontFamily: "Poppins-Regular",
        marginBottom: 10,
    },
    modalSubTitle: {
        fontSize: 18,
        color: "#fff",
        fontFamily: "Poppins-Regular",
        marginTop: 20,
    },
    addressInput: {
        width: "100%",
        height: 50,
        backgroundColor: "#021324",
        color: "#fff",
        borderColor: "#ffd700",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    picker: {
        width: "100%",
        height: 50,
        color: "#ffd700",
        backgroundColor: "#021324",
    },
    confirmBtn: {
        width: "100%",
        backgroundColor: "#ffd700",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    cancelBtn: {
        width: "100%",
        backgroundColor: "#021324",
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ffd700",
    }
});
