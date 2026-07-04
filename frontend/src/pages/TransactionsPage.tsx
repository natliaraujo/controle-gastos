import { useEffect, useState, useCallback } from 'react';
import type { Transaction } from '../types/Transaction';
import { getTransactions } from '../api/transactionService';
import TransactionForm from '../components/TransactionForm';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(data);
    } catch {
      setError('Erro ao carregar transações.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div>
      <h2>Cadastro de Transações</h2>
      {error && <div className="error-message">{error}</div>}
      <TransactionForm onTransactionCreated={fetchTransactions} />
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Pessoa ID</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(transactions) || transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty-message">Nenhuma transação cadastrada.</td>
              </tr>
            ) : (
              transactions.map(t => (
                <tr key={t.id}>
                  <td data-label="Descrição">{t.description}</td>
                  <td data-label="Valor">R$ {t.value.toFixed(2)}</td>
                  <td data-label="Tipo">{t.type}</td>
                  <td data-label="Pessoa ID">{t.personId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}