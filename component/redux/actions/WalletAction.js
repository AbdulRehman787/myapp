// actions/walletActions.js
import axios from 'axios';

export const depositAmount = (userId, amount) => async (dispatch) => {
    try {
        const response = await axios.post('https://mint-legible-coyote.ngrok-free.app/wallet/deposit', { userId, amount });
        dispatch({ type: 'DEPOSIT_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'DEPOSIT_FAILURE', payload: error.response.data });
    }
};

export const withdrawAmount = (userId, amount) => async (dispatch) => {
    try {
        const response = await axios.post('https://mint-legible-coyote.ngrok-free.app/withdraw', { userId, amount });
        dispatch({ type: 'WITHDRAW_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'WITHDRAW_FAILURE', payload: error.response.data });
    }
};

export const getBalance = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`https://mint-legible-coyote.ngrok-free.app/wallet/balance/${userId}`);
        dispatch({ type: 'GET_BALANCE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_BALANCE_FAILURE', payload: error.response.data });
    }
};
