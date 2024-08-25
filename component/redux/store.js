// src/store.js
import { createStore, combineReducers } from 'redux';
import { balanceReducer,transactionsReducer } from './reducer';

const rootReducer = combineReducers({
  balance: balanceReducer,
  transactions: transactionsReducer,
});

const store = createStore(rootReducer);

export default store;
