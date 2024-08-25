// src/services/binancePayService.js
import axios from 'axios';
import CryptoJS from 'crypto-js';

const BINANCE_PAY_API_KEY = 'fgckwkpwmlyapw0paatqdyroaesa8ls7wrrcljopratvm0xagfb5g73bdxzx9ouq';
const BINANCE_PAY_SECRET_KEY = 'bxwdkkd8fbmkt5wlzphuyjbawjt0fcgbcwwbsrcxpuvyr2uisljtbb5ttyz3zdya';
const BINANCE_PAY_BASE_URL = 'https://bpay.binanceapi.com';

// Generate a unique nonce
const generateNonce = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2);
};

const generateSignature = (payload, nonce) => {
  return CryptoJS.HmacSHA512(nonce + payload, BINANCE_PAY_SECRET_KEY).toString();
};

const binancePayClient = axios.create({
  baseURL: BINANCE_PAY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createOrder = async (amount, currency, tradeType) => {
  const nonce = generateNonce();
  const timestamp = Date.now().toString();
  const payload = JSON.stringify({
    merchantId: 'your_merchant_id', // Replace with your actual merchant ID
    amount,
    currency,
    tradeType, // 'APP'
  });

  const signature = generateSignature(payload, nonce);

  console.log('Creating order with payload:', payload);
  console.log('Nonce:', nonce);
  console.log('Timestamp:', timestamp);
  console.log('Signature:', signature);

  try {
    const response = await binancePayClient.post('/binancepay/openapi/v2/order', payload, {
      headers: {
        'BinancePay-Signature': signature,
        'BinancePay-Timestamp': timestamp,
        'BinancePay-Nonce': nonce,
        'BinancePay-Certificate-SN': BINANCE_PAY_API_KEY,
      },
    });
    console.log('Order created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

export const queryOrder = async (prepayId) => {
  const nonce = generateNonce();
  const timestamp = Date.now().toString();
  const payload = JSON.stringify({ prepayId });
  const signature = generateSignature(payload, nonce);

  console.log('Querying order with payload:', payload);
  console.log('Nonce:', nonce);
  console.log('Timestamp:', timestamp);
  console.log('Signature:', signature);

  try {
    const response = await binancePayClient.post('/binancepay/openapi/v2/order/query', payload, {
      headers: {
        'BinancePay-Signature': signature,
        'BinancePay-Timestamp': timestamp,
        'BinancePay-Nonce': nonce,
        'BinancePay-Certificate-SN': BINANCE_PAY_API_KEY,
      },
    });
    console.log('Order status:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error querying order:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to query order');
  }
};
