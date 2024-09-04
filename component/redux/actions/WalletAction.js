import axios from 'axios';

// Define action types
export const SET_BALANCE = 'SET_BALANCE';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

// Fetch wallet balance
export const fetchWalletBalance = (token) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/wallet', {
      headers: { Authorization: token },
    });
    dispatch({ type: SET_BALANCE, payload: response.data.balance });
  } catch (error) {
    console.error('Failed to fetch balance:', error);
  }
};

// Fetch transaction history
export const fetchTransactions = (token) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/transactions', {
      headers: { Authorization: token },
    });
    dispatch({ type: SET_TRANSACTIONS, payload: response.data });
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
  }
};
