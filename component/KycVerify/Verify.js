import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image , SafeAreaView } from 'react-native';

const Verify = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View>
            </View>
            <View>
                <Text style={styles.head1}>Please Verify you are 18+</Text>
                <Text style={styles.head2}>Real Time tracking of your food on the app once you placed the order</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("GetDocuments")} style={styles.btn}><Text style={styles.btn_head}>Verify</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 30,
        backgroundColor: '#021324',
        height: '100%'
    },
    head1: {
        fontSize: 26,
        textAlign: "center",
        color: "#fff",
        fontFamily: "Poppins-Regular"
    },
    head2: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        color: "#fff",
        fontFamily: "Poppins-Regular"
    },
    btn: {
        backgroundColor: "#FFD700",
        borderRadius: 50,
        padding: 15,
        borderWidth: 1,
        borderColor: "#FFD700",
        marginVertical: 20
    },
    btn_head: {
        fontSize: 16,
        color: 'white',
        textAlign: "center",
        fontFamily: "Poppins-Regular"
    },
    img1: {
        resizeMode: "cover",
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginVertical: 10,
    }

})

export default Verify;