import api from './api';
import type { Person } from '../types/Person';

export const getPersons = async (): Promise<Person[]> => {
  const response = await api.get('/persons');
  // Garante que sempre retorna um array
  const data = response.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.$values)) return data.$values;
  return [];
};

export const createPerson = async (person: Omit<Person, 'id'>): Promise<Person> => {
  const response = await api.post('/persons', person);
  return response.data;
};

export const deletePerson = async (id: number): Promise<void> => {
  await api.delete(`/persons/${id}`);
};