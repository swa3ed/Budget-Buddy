import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(localStorage.getItem('userToken'))

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
    }
});

export const fetchMission = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Missions/missions/`);
        return response.data;  // Assuming the server responds with the array of vehicles
    } catch (error) {
        console.error('Error fetching audiences:', error);
        throw error;
    }
};


export const deleteMission = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/Missions/missions/${id}/`,authHeader());
        return response.status === 204;  // Assuming 204 No Content on successful deletion
    } catch (error) {
        console.error('Error deleting mission:', error);
        throw error;
    }
};

export const addMission = async (MissionData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Missions/missions/`, MissionData,authHeader());
        return response.data;  // Assuming the server returns the added Mission data
    } catch (error) {
        console.error('Error adding Mission:', error);
        throw error;
    }
};

export const updateMission = async (id, data) => {
    try {
        console.log('Updating Mission 1:', data);
        const response = await axios.put(`${API_BASE_URL}/Missions/missions/${id}/`, data, authHeader());
        return response.data;  // This should return the updated Mission data if successful
    } catch (error) {
        console.error('Error updating Mission:', error);
        throw error;
    }
};




