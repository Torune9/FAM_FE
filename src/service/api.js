import axios from "axios"
import { loginStore } from '../store/loginStore'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

instance.interceptors.request.use(
  (set) => {
     if (loginStore().isLogged) {
       set.headers = { 
         Authorization: `Bearer ${loginStore().token}`,  
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