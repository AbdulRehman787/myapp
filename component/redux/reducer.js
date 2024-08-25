// src/reducers.js
const initialBalanceState = {
    balance: 0,
  };
  
  const initialTransactionsState = {
    transactions: [],
  };
  
  export const balanceReducer = (state = initialBalanceState, action) => {
    switch (action.type) {
      case 'SET_BALANCE':
        return { ...state, balance: action.payload };
      default:
        return state;
    }
  };
  
  export const transactionsReducer = (state = initialTransactionsState, action) => {
    switch (action.type) {
      case 'SET_TRANSACTIONS':
        return { ...state, transactions: action.payload };
      default:
        return state;
    }
  };
  