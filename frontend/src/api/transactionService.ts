import api from './api';
import type { Transaction } from '../types/Transaction';

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions');
  const data = response.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.$values)) return data.$values;
  return [];
};

export const createTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  const response = await api.post('/transactions', transaction);
  return response.data;
};