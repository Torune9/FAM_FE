import axios from "axios"
import { useAuth } from '../store/Auth'

const instance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_URL,
  baseURL: 'http://localhost:3000/',
});

instance.interceptors.request.use(
  (set) => {
    // set interceptor request config here
     if (useAuth.isAuthenticated) {
       set.headers = { 
         Authorization: `Bearer ${useAuth.token}`,  
        }
      }
      return set
   },
      (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) {
      console.log("Please check your internet connection.");
    }
    throw error;
  }
)

export default instance;