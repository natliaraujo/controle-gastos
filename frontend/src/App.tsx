import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiCreditCard, FiBarChart2 } from 'react-icons/fi';
import HomePage from './pages/HomePage';
import PersonsPage from './pages/PersonsPage';
import TransactionsPage from './pages/TransactionsPage';
import TotalsPage from './pages/TotalsPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" end><FiHome /> Início</NavLink>
        <NavLink to="/persons"><FiUsers /> Pessoas</NavLink>
        <NavLink to="/transactions"><FiCreditCard /> Transações</NavLink>
        <NavLink to="/totals"><FiBarChart2 /> Totais</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/persons" element={<PersonsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/totals" element={<TotalsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;