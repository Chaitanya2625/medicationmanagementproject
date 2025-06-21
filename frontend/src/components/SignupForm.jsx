// Signup form component placeholder
import React, { useState } from 'react';
import { signup } from '../api/auth';
import { useAuth } from '../context/AuthContext';

function SignupForm() {
  const [form, setForm] = useState({ username: '', password: '', role: 'patient' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, role } = await signup(form);
      loginUser(token, role);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="patient">Patient</option>
        <option value="caretaker">Caretaker</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default SignupForm;
