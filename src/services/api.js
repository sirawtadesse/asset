import axios from 'axios';

// CORRECT: The URL must be the base folder of your API
const API_BASE_URL = 'https://sirawdev.com.et/asset-management/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // This is crucial for sending session cookies
});

export default api;
