import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MedForm = ({ onAdd }) => {
  const { user } = useAuth(); // assume user has { id, name, ... }
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [message, setMessage] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      if (!user || !user.id) {
        setMessage('User not logged in');
        return;
      }

      const res = await axios.post(`/api/patients/${user.id}/medications`, {
        name,
        dosage,
        frequency,
      });

      setMessage('✅ Medication added!');
      setName('');
      setDosage('');
      setFrequency('');

      if (onAdd) onAdd(); // to refresh the list
    } catch (err) {
      console.error('Failed to add medication:', err);
      setMessage('❌ Failed to add medication');
    }
  };

  return (
    <div>
      <h4>Add Medication</h4>
      <form onSubmit={handleAdd}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />
        <input
          placeholder="Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MedForm;
