import React from 'react';
import MedForm from './MedForm';
import MedList from './MedList';
import AdherenceCalendar from './AdherenceCalendar';
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth(); // assumes user has { id }

  return (
    <>
      <h2>✅ Patient Dashboard is rendering</h2>
      <h3>Add Medication</h3>
      <MedForm />
      <h3>Add Medication</h3>
      <MedList />
      <AdherenceCalendar patientId={user?.id} />
    </>
  );
};

export default PatientDashboard;
