import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCountry } from 'react-native-localize';

const DepositOption = () => {
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    const [countryCode, setCountryCode] = useState(getCountry());

    useEffect(() => {
        console.log(`Country Code: ${countryCode}`);
        console.log(`Available Deposit Amounts: ${depositAmounts[countryCode] || 'None'}`);
    }, [countryCode]);

    const depositAmounts = {
        IN: [5000, 1200, 800, 500, 250, 120, 80, 40], // India
        PK: [5000, 1200, 500, 500, 250,100, 70, 35], // Pakistan
        US: [100, 50, 25, 10, 5, 2, 1], // United States
        // Add more countries as needed
    };

    const handleAmountPress = (value) => {
        setAmount(value.toString());
    };

    const handleSelectAmount = () => {
        if (amount) {
            navigation.navigate('DepositPage', { selectedAmount: amount });
        } else {
            alert('Please select an amount.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
               
                <Text style={styles.headerText}>Deposit</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Select the deposit amount</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Amount,${countryCode}</Text>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    {depositAmounts[countryCode]?.map((value) => (
                        <TouchableOpacity
                            key={value}
                            style={styles.amountButton}
                            onPress={() => handleAmountPress(value)}
                        >
                            <Text style={styles.amountText}>{value.toLocaleString()}</Text>
                        </TouchableOpacity>
                    )) || (
                        <Text style={styles.noOptionText}>
                            No deposit options available for your region.
                        </Text>
                    )}
                </View>

                <TouchableOpacity style={styles.confirmButton} onPress={handleSelectAmount}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
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
    noOptionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
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
});

export default DepositOption;
