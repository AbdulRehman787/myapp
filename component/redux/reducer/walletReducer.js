import { SET_BALANCE, SET_TRANSACTIONS } from '../actions/walletActions';

const initialState = {
  balance: 0.0,
  transactions: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BALANCE:
      return { ...state, balance: action.payload };
    case SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
};

export default walletReducer;
