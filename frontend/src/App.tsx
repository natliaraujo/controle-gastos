import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import PersonsPage from './pages/PersonsPage';
import TransactionsPage from './pages/TransactionsPage';
import TotalsPage from './pages/TotalsPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/persons" end>Pessoas</NavLink>
        <NavLink to="/transactions">Transações</NavLink>
        <NavLink to="/totals">Totais</NavLink>
      </nav>
      <main>
        <Routes>
          {/* Redireciona a raiz para /persons */}
          <Route path="/" element={<Navigate to="/persons" replace />} />
          <Route path="/persons" element={<PersonsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/totals" element={<TotalsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;