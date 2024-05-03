import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function login(username, password) {
    const payload = {
        username: username,
        password: password,
      };
        const response = await axios.post(`${API_BASE_URL}/users/login/`, payload);
        console.log('response:', response.data.access);
        return response.data.access;
};
export const verifyToken = async (token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/verify/`, { token });
      return response.data.valid;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false; 
    }
  };