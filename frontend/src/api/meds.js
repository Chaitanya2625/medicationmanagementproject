import axios from 'axios';

const API = 'http://localhost:5000/medications';

export const getMedications = async (token) => {
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addMedication = async (data, token) => {
  const res = await axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const markAsTaken = async (id, token, photoFile = null) => {
  const formData = new FormData();
  if (photoFile) {
    formData.append('photo', photoFile);
  }

  const res = await axios.post(`${API}/${id}/mark-taken`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};
