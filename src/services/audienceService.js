import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchAudiences = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/users/`);
        return response.data;  // Assuming the server responds with the array of vehicles
    } catch (error) {
        console.error('Error fetching audiences:', error);
        throw error;
    }
};


export const deleteAudience = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/users/${id}/`);
        return response.status === 204;  // Assuming 204 No Content on successful deletion
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        throw error;
    }
};

export const addAudience = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/users/`, userData);
        return response.data;  // Assuming the server returns the added user data
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const updateUser = async (id, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/users/${id}/`, data);
        return response.data;  // This should return the updated user data if successful
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};




