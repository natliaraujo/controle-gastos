import { useState, useEffect, useRef } from 'react';
import { createTransaction } from '../api/transactionService';
import { getPersons } from '../api/personService';
import type { Person } from '../types/Person';
import { AxiosError } from 'axios';

interface Props {
  onTransactionCreated: () => void;
}

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
    getPersons()
      .then(setPersons)
      .catch(() => setError('Erro ao carregar pessoas.'));
  }, []);

  const selectedPerson = persons.find(p => p.name.toLowerCase() === personNameInput.trim().toLowerCase());
  const isUnder18 = selectedPerson ? selectedPerson.age < 18 : false;

  const handlePersonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPersonNameInput(input);
    setShowSuggestions(true);

    if (input.trim() === '') {
      setFilteredPersons([]);
      return;
    }

    const filtered = persons.filter(p =>
      p.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredPersons(filtered);
  };

  const selectPerson = (person: Person) => {
    setPersonNameInput(person.name);
    setFilteredPersons([]);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!description || value === '' || personNameInput.trim() === '') {
      setError('Preencha todos os campos.');
      return;
    }

    const matchedPerson = persons.find(
      p => p.name.toLowerCase() === personNameInput.trim().toLowerCase()
    );

    if (!matchedPerson) {
      setError('Pessoa não encontrada. Cadastre-a na aba "Pessoas" primeiro.');
      return;
    }

    if (matchedPerson.age < 18 && type === 'Receita') {
      setError('Menores de 18 anos só podem cadastrar despesas.');
      return;
    }

    setSubmitting(true);
    try {
      await createTransaction({
        description,
        value: Number(value),
        type,
        personId: matchedPerson.id,
      });
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
      <input
        placeholder="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <input
        placeholder="Valor"
        type="number"
        step="0.01"
        value={value}
        onChange={e => setValue(e.target.value === '' ? '' : Number(e.target.value))}
        required
        min="0.01"
      />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="Despesa">Despesa</option>
        <option value="Receita" disabled={isUnder18}>
          Receita {isUnder18 && '(menor de idade)'}
        </option>
      </select>
      <div style={{ position: 'relative', flex: '1 1 200px', minWidth: '140px' }}>
        <input
          ref={inputRef}
          placeholder="Nome da pessoa"
          value={personNameInput}
          onChange={handlePersonNameChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
          required
          autoComplete="off"
        />
        {showSuggestions && filteredPersons.length > 0 && (
          <ul className="autocomplete-suggestions">
            {filteredPersons.map(person => (
              <li key={person.id} onMouseDown={() => selectPerson(person)}>
                {person.name} ({person.age} anos)
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Salvando...' : 'Adicionar'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}