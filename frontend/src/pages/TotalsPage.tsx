import { useEffect, useState } from 'react';
import type { GeneralTotals } from '../types/Totals';
import { getTotals } from '../api/totalsService';

export default function TotalsPage() {
  const [totals, setTotals] = useState<GeneralTotals | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTotals()
      .then(data => setTotals(data))
      .catch(() => setError('Erro ao carregar totais.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Consulta de Totais</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : totals && Array.isArray(totals.pessoas) ? (
        <table>
          <thead>
            <tr>
              <th>Pessoa</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {totals.pessoas.map(p => (
              <tr key={p.personId}>
                <td data-label="Pessoa">{p.name}</td>
                <td data-label="Receitas" className="text-success">R$ {p.totalReceitas.toFixed(2)}</td>
                <td data-label="Despesas" className="text-danger">R$ {p.totalDespesas.toFixed(2)}</td>
                <td data-label="Saldo" className={p.saldo >= 0 ? 'text-success' : 'text-danger'}>
                  R$ {p.saldo.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td data-label="">TOTAL GERAL</td>
              <td data-label="Receitas" className="text-success">R$ {totals.totalGeralReceitas.toFixed(2)}</td>
              <td data-label="Despesas" className="text-danger">R$ {totals.totalGeralDespesas.toFixed(2)}</td>
              <td data-label="Saldo" className={totals.saldoLiquidoGeral >= 0 ? 'text-success' : 'text-danger'}>
                R$ {totals.saldoLiquidoGeral.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div className="empty-message">Nenhum dado disponível.</div>
      )}
    </div>
  );
}