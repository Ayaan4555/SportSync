import axios from 'axios';

const API_URL = 'https://sportsync-backend-ap3i.onrender.com/api/auth';

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  const data = res.data;

  localStorage.setItem('userInfo', JSON.stringify(data));

  return data;
};
