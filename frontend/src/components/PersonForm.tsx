import { useState } from 'react';
import { createPerson } from '../api/personService';
import { AxiosError } from 'axios';
import { FiUserPlus } from 'react-icons/fi';

interface Props { onPersonCreated: () => void; }

export default function PersonForm({ onPersonCreated }: Props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || age === '') return;
    setSubmitting(true);
    setError('');
    try {
      await createPerson({ name, age: Number(age) });
      setName('');
      setAge('');
      onPersonCreated();
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      setError(axiosError.response?.data?.error || axiosError.message || 'Erro ao criar pessoa.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Idade" type="number" value={age} onChange={e => setAge(e.target.value === '' ? '' : Number(e.target.value))} required min="0" />
      <button type="submit" disabled={submitting}>
        <FiUserPlus /> {submitting ? 'Salvando...' : 'Adicionar'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}