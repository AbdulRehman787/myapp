  // src/components/Dashboard.js
  import React, { useEffect } from 'react';
  import { View, Text, FlatList, StyleSheet } from 'react-native';
  import { useSelector, useDispatch } from 'react-redux';
  import axios from 'axios';

  const HomeScreen = () => {
    const dispatch = useDispatch();
    const balance = useSelector((state) => state.balance.balance);
    const transactions = useSelector((state) => state.transactions.transactions);

    useEffect(() => {
      // Fetch the balance and transactions from the backend (mocking it here)
      const fetchData = async () => {
        const balanceResponse = await axios.get('/api/balance');
        const transactionsResponse = await axios.get('/api/transactions');
        
        dispatch({ type: 'SET_BALANCE', payload: balanceResponse.data.balance });
        dispatch({ type: 'SET_TRANSACTIONS', payload: transactionsResponse.data.transactions });
      };

      fetchData();
    }, [dispatch]);

    return (
      <View style={styles.container}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Current Balance</Text>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        </View>

        <Text style={styles.transactionTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionType}>{item.type}</Text>
              <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#021324',
      padding: 20,
    },
    balanceContainer: {
      backgroundColor: '#ffd700',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    balanceText: {
      color: '#021324',
      fontSize: 18,
      fontFamily: 'Poppins-Regular',
    },
    balanceAmount: {
      color: '#021324',
      fontSize: 36,
      fontFamily: 'Poppins-Regular',
      fontWeight: 'bold',
    },
    transactionTitle: {
      color: '#ffd700',
      fontSize: 20,
      marginVertical: 10,
      fontFamily: 'Poppins-Regular',
    },
    transactionItem: {
      backgroundColor: '#fff',
      padding: 15,
      marginVertical: 5,
      borderRadius: 10,
      borderColor: '#ffd700',
      borderWidth: 1,
    },
    transactionType: {
      color: '#021324',
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
    },
    transactionAmount: {
      color: '#021324',
      fontSize: 18,
      fontFamily: 'Poppins-Regular',
      fontWeight: 'bold',
    },
    transactionDate: {
      color: '#021324',
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      marginTop: 5,
    },
  });

  export default HomeScreen;
