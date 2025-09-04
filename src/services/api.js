import axios from 'axios';

const API_BASE_URL = 'https://sirawdev.com.et/asset-management/api/login.php';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // This is crucial for sending session cookies
});

export default api;
