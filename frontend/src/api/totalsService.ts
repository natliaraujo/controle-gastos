import api from './api';
import type { GeneralTotals } from '../types/Totals';

export const getTotals = async (): Promise<GeneralTotals> => {
  const response = await api.get('/totals');
  const data = response.data;

  // Trata encapsulamento $values (System.Text.Json com ReferenceHandler.IgnoreCycles)
  let pessoas = data.pessoas;
  if (!Array.isArray(pessoas)) {
    if (pessoas && Array.isArray(pessoas.$values)) {
      pessoas = pessoas.$values;
    } else {
      pessoas = [];
    }
  }

  return {
    totalGeralReceitas: data.totalGeralReceitas ?? 0,
    totalGeralDespesas: data.totalGeralDespesas ?? 0,
    saldoLiquidoGeral: data.saldoLiquidoGeral ?? 0,
    pessoas,
  };
};