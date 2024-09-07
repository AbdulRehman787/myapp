// reducers/walletReducer.js
const initialState = {
  balance: 0,
  transactions: [],
  loading: false,
  error: null,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'GET_BALANCE_SUCCESS':
          return { ...state, balance: action.payload.balance, loading: false };
      case 'DEPOSIT_SUCCESS':
      case 'WITHDRAW_SUCCESS':
          return { ...state, loading: false };
      case 'GET_BALANCE_FAILURE':
      case 'DEPOSIT_FAILURE':
      case 'WITHDRAW_FAILURE':
          return { ...state, error: action.payload.error, loading: false };
      default:
          return state;
  }
};

export default walletReducer;
