import { useEffect, useState, useCallback } from 'react';
import type { Transaction } from '../types/Transaction';
import { getTransactions } from '../api/transactionService';
import TransactionForm from '../components/TransactionForm';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(Array.isArray(data) ? data : []);
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
      <h2>Transações</h2>
      {error && <div className="error-message">{error}</div>}
      <TransactionForm onTransactionCreated={fetchTransactions} />
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <table>
          <thead>
            <tr><th>Descrição</th><th>Valor</th><th>Tipo</th><th>Pessoa</th></tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr><td colSpan={4} className="empty-message">Nenhuma transação.</td></tr>
            )}
            {transactions.map(t => (
              <tr key={t.id}>
                <td>{t.description}</td>
                <td>R$ {t.value.toFixed(2)}</td>
                <td>
                  {t.type === 'Receita' ? (
                    <><FiArrowUpCircle className="text-success" /> Receita</>
                  ) : (
                    <><FiArrowDownCircle className="text-danger" /> Despesa</>
                  )}
                </td>
                <td>{t.personId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}