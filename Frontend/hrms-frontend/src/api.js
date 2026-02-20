
  

 {/* import axios from "axios"

// export const API = axios.create({
//     baseURL : "http://127.0.0.1:8000/",
// });
export const API = axios.create({
  baseURL: "https://hrms-backend-6d6q.onrender.com" */}
{/* }); */}

import axios from 'axios';

const API = axios.create({
  baseURL: "https://hrms-backend-6d6q.onrender.com",
});

export default {
  methods: {
    async fetchData() {
      try {
        const response = await API.get('/data');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
}