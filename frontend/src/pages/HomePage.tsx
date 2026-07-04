import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTotals } from '../api/totalsService';
import type { GeneralTotals } from '../types/Totals';
import { FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

export default function HomePage() {
  const [totals, setTotals] = useState<GeneralTotals | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTotals()
      .then(setTotals)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="grid">
        <div className="stat-card">
          <FiUsers className="icon" style={{color: 'var(--primary)'}} />
          <h3>Pessoas cadastradas</h3>
          <div className="value">{loading ? '...' : totals ? totals.pessoas.length : 0}</div>
          <Link to="/persons" style={{marginTop: 'auto', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500}}>Gerenciar →</Link>
        </div>
        <div className="stat-card">
          <FiTrendingUp className="icon" style={{color: 'var(--success)'}} />
          <h3>Receitas totais</h3>
          <div className="value text-success">
            {loading ? '...' : totals ? `R$ ${totals.totalGeralReceitas.toFixed(2)}` : '—'}
          </div>
          <Link to="/transactions" style={{marginTop: 'auto', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500}}>Ver transações →</Link>
        </div>
        <div className="stat-card">
          <FiDollarSign className="icon" style={{color: 'var(--danger)'}} />
          <h3>Despesas totais</h3>
          <div className="value text-danger">
            {loading ? '...' : totals ? `R$ ${totals.totalGeralDespesas.toFixed(2)}` : '—'}
          </div>
          <Link to="/transactions" style={{marginTop: 'auto', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500}}>Ver transações →</Link>
        </div>
      </div>
      {totals && (
        <div className="card">
          <h3 style={{marginBottom: '1rem'}}>Resumo Geral</h3>
          <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
            <div><strong>Receitas:</strong> <span className="text-success">R$ {totals.totalGeralReceitas.toFixed(2)}</span></div>
            <div><strong>Despesas:</strong> <span className="text-danger">R$ {totals.totalGeralDespesas.toFixed(2)}</span></div>
            <div><strong>Saldo líquido:</strong> <span className={totals.saldoLiquidoGeral >= 0 ? 'text-success' : 'text-danger'}>
              R$ {totals.saldoLiquidoGeral.toFixed(2)}
            </span></div>
          </div>
          <Link to="/totals" style={{display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', fontWeight: 500}}>Ver detalhes →</Link>
        </div>
      )}
    </div>
  );
}