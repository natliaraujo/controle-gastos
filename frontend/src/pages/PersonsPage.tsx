import { useEffect, useState, useCallback } from 'react';
import type { Person } from '../types/Person';
import { getPersons, deletePerson } from '../api/personService';
import PersonForm from '../components/PersonForm';
import { FiTrash2 } from 'react-icons/fi';

export default function PersonsPage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPersons = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPersons();
      setPersons(Array.isArray(data) ? data : []);
    } catch {
      setError('Erro ao carregar pessoas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPersons();
  }, [fetchPersons]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir esta pessoa e todas as suas transações?')) return;
    try {
      await deletePerson(id);
      setPersons(prev => prev.filter(p => p.id !== id));
    } catch {
      setError('Erro ao excluir.');
    }
  };

  return (
    <div>
      <h2>Pessoas</h2>
      {error && <div className="error-message">{error}</div>}
      <PersonForm onPersonCreated={fetchPersons} />
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <ul>
          {persons.length === 0 && <li className="empty-message">Nenhuma pessoa cadastrada.</li>}
          {persons.map(p => (
            <li key={p.id}>
              <span><strong>{p.name}</strong> — {p.age} anos</span>
              <button onClick={() => handleDelete(p.id)}><FiTrash2 /> Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}