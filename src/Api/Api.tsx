import axios from "axios";

export const Api= axios.create({
    baseURL:import.meta.env.VITE_API_URL
   
})
Api.interceptors.request.use(async config=>{
    const token = await localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['access_token'] = `Bearer ${token}`;
    }
    return config;
},error=>{
    return Promise.reject(error);
})