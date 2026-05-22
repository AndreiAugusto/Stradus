import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://caminhao-api.vercel.app',
    headers: {
        "Content-Type": "application/json"
    }
});
