// frontend/src/components/CaretakerDashboard.jsx
import React, { useEffect, useState } from 'react';

function CaretakerDashboard() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error('Error fetching patients:', err));
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Patient Adherence Overview</h3>

      <input
        type="text"
        placeholder="Search patients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 mb-4 w-full"
      />

      {filteredPatients.length === 0 && <p>No patients found.</p>}

      {filteredPatients.map((patient) => (
        <div
          key={patient.id}
          className="border rounded p-4 mb-4 bg-white shadow-sm"
        >
          <h4 className="text-md font-bold">{patient.name}</h4>
          <p>📅 Streak: {patient.streak} days</p>
          <p>📈 Adherence: {patient.adherence}%</p>

          <div className="mt-2">
            <p className="text-sm text-gray-600">Adherence Calendar:</p>
            <div className="flex gap-1 mt-1">
              {patient.adherenceDots?.map((status, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    status === 'taken'
                      ? 'bg-green-500'
                      : status === 'missed'
                      ? 'bg-red-500'
                      : 'bg-gray-300'
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CaretakerDashboard;
