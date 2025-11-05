
import axios from 'axios';

// const BASE_URL = 
//     import.meta.env.MODE === 'development'
//     ? 'http://localhost:5001/api': 'http://slack-backend-omega-one.vercel.app/api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// learn about it more