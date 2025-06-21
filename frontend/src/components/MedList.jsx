import React, { useEffect, useState } from 'react';
import { getMedications, markAsTaken } from '../api/meds';
import { useAuth } from '../context/AuthContext';

function MedList({ reloadFlag }) {
  const { token } = useAuth();
  const [meds, setMeds] = useState([]);
  const [error, setError] = useState({});

  const fetchMeds = async () => {
    try {
      const data = await getMedications(token);
      setMeds(data);
    } catch (err) {
      setError({ global: 'Failed to load medications' });
    }
  };

  useEffect(() => {
    fetchMeds();
  }, [reloadFlag]);

  const handleMark = async (id, file) => {
    try {
      await markAsTaken(id, token, file);
      fetchMeds();
    } catch {
      alert('Error marking medication as taken');
    }
  };

  return (
    <div>
      <h3>Your Medications</h3>
      {error.global && <p style={{ color: 'red' }}>{error.global}</p>}
      {meds.map((med) => (
        <div key={med.id} style={{ marginBottom: 16 }}>
          <strong>{med.name}</strong> – {med.dosage} / {med.frequency}
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleMark(med.id, e.target.files[0])}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MedList;
