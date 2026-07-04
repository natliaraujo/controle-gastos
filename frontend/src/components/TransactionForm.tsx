import { useState, useEffect, useRef } from 'react';
import { createTransaction } from '../api/transactionService';
import { getPersons } from '../api/personService';
import type { Person } from '../types/Person';
import { AxiosError } from 'axios';
import { FiPlusCircle } from 'react-icons/fi';

interface Props { onTransactionCreated: () => void; }

export default function TransactionForm({ onTransactionCreated }: Props) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [type, setType] = useState('Despesa');
  const [personNameInput, setPersonNameInput] = useState('');
  const [persons, setPersons] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getPersons().then(setPersons).catch(() => setError('Erro ao carregar pessoas.'));
  }, []);

  const selectedPerson = persons.find(p => p.name.toLowerCase() === personNameInput.trim().toLowerCase());
  const isUnder18 = selectedPerson ? selectedPerson.age < 18 : false;

  const handlePersonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPersonNameInput(input);
    setShowSuggestions(true);
    setFilteredPersons(input.trim() === '' ? [] : persons.filter(p => p.name.toLowerCase().includes(input.toLowerCase())));
  };

  const selectPerson = (person: Person) => {
    setPersonNameInput(person.name);
    setFilteredPersons([]);
    setShowSuggestions(false);
  };

  const handleBlur = () => setTimeout(() => setShowSuggestions(false), 150);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!description || value === '' || personNameInput.trim() === '') return setError('Preencha todos os campos.');
    const matched = persons.find(p => p.name.toLowerCase() === personNameInput.trim().toLowerCase());
    if (!matched) return setError('Pessoa não encontrada. Cadastre na aba Pessoas.');
    if (matched.age < 18 && type === 'Receita') return setError('Menores de idade só podem ter despesas.');
    setSubmitting(true);
    try {
      await createTransaction({ description, value: Number(value), type, personId: matched.id });
      setDescription('');
      setValue('');
      setType('Despesa');
      setPersonNameInput('');
      onTransactionCreated();
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      setError(axiosError.response?.data?.error || axiosError.message || 'Erro ao criar transação.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Descrição (ex.: Conta de luz)" value={description} onChange={e => setDescription(e.target.value)} required />
      <input placeholder="Valor" type="number" step="0.01" value={value} onChange={e => setValue(e.target.value === '' ? '' : Number(e.target.value))} required min="0.01" />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="Despesa">Despesa</option>
        <option value="Receita" disabled={isUnder18}>Receita {isUnder18 && '(menor)'}</option>
      </select>
      <div style={{ position: 'relative', flex: '1 1 200px', minWidth: '160px' }}>
        <input ref={inputRef} placeholder="Nome da pessoa" value={personNameInput} onChange={handlePersonNameChange} onFocus={() => setShowSuggestions(true)} onBlur={handleBlur} required autoComplete="off" />
        {showSuggestions && filteredPersons.length > 0 && (
          <ul className="autocomplete-suggestions" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', zIndex: 10, listStyle: 'none', maxHeight: 150, overflowY: 'auto' }}>
            {filteredPersons.map(person => (
              <li key={person.id} onMouseDown={() => selectPerson(person)} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                {person.name} ({person.age} anos)
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" disabled={submitting}><FiPlusCircle /> {submitting ? 'Salvando...' : 'Adicionar'}</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}