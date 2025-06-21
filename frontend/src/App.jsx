import React from 'react';
import { useAuth } from './context/AuthContext';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import PatientDashboard from './components/PatientDashboard';
import CaretakerDashboard from './components/CaretakerDashboard';
import {
  HeartIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
} from '@heroicons/react/24/solid';

function App() {
  const { token, role } = useAuth();

  const backgroundStyle = {
    minHeight: '100vh',
    backgroundImage:
      'url("https://images.unsplash.com/photo-1588776814546-ec7d9f2c0d8d?auto=format&fit=crop&w=1470&q=80")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    fontFamily: 'system-ui, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '2rem',
    borderRadius: '1rem',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(8px)',
  };

  const iconStyle = {
    width: 28,
    height: 28,
    color: '#00796b',
    marginRight: '0.5rem',
  };

  const sectionHeader = (Icon, label) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <Icon style={iconStyle} />
      <h2 className="text-xl font-semibold">{label}</h2>
    </div>
  );

  // Unauthenticated View
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
          {sectionHeader(HeartIcon, 'Meds Buddy Login')}
          <SignupForm />
          <hr className="my-6" />
          <LoginForm />
        </div>
      </div>
    );
  }

  // Authenticated View
  return (
    <div style={backgroundStyle}>
      <div style={cardStyle}>
        {role === 'patient' && (
          <>
            {sectionHeader(ClipboardDocumentCheckIcon, 'Patient Dashboard')}
            <PatientDashboard />
          </>
        )}

        {role === 'caretaker' && (
          <>
            {sectionHeader(UserIcon, 'Caretaker Dashboard')}
            <CaretakerDashboard />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
