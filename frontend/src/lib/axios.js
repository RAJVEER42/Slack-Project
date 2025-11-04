
import axios from 'axios';

const BASE_URL = 
    import.meta.env.MODE === 'development'
    ? 'https://localhost:5001/api': 'https://slack-backend-omega-one.vercel.app/api';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// learn about htis code more ...