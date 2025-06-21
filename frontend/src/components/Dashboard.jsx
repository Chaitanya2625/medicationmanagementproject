import React, { useState } from 'react';
import MedForm from './MedForm';
import MedList from './MedList';

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h2>Medication Dashboard</h2>
      <MedForm onAdded={() => setRefresh(!refresh)} />
      <hr />
      <MedList refresh={refresh} />
    </div>
  );
}
