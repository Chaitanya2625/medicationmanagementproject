// Auth API logic placeholder
import axios from 'axios';

const API = 'http://localhost:5000/auth';

export const signup = async (user) => {
  const res = await axios.post(`${API}/signup`, user);
  return res.data;
};

export const login = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials);
  return res.data;
};
