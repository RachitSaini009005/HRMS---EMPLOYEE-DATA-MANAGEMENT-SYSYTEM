import axios from "axios"

// export const API = axios.create({
//     baseURL : "http://127.0.0.1:8000/",
// });
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
});