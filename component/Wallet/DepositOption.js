import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const DepositOption = () => {
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');

    const handleAmountPress = (value) => {
        setAmount(value.toString());
    };

    const handleSelectAmount = () => {
        navigation.navigate('DepositPage', { selectedAmount: amount });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Deposit</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Select the deposit amount</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Amount, AED</Text>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    {[8000, 1200, 800, 400, 120, 80, 40].map((value) => (
                        <TouchableOpacity
                            key={value}
                            style={styles.amountButton}
                            onPress={() => handleAmountPress(value)}
                        >
                            <Text style={styles.amountText}>AED {value.toLocaleString()}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.confirmButton} onPress={handleSelectAmount}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#021324',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#021324',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 16,
    },
    content: {
        padding: 16,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 24,
    },
    inputLabel: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#1c1c1c',
        color: '#fff',
        fontSize: 16,
        padding: 12,
        borderRadius: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    amountButton: {
        backgroundColor: '#1c1c1c',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        width: '48%',
        alignItems: 'center',
    },
    amountText: {
        color: '#fff',
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DepositOption;
