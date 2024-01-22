import axios from "axios"
import { loginStore } from '../../store/UserStore/loginStore'
const VUE_BASE_URL = import.meta.env.VITE_APP_BASE_URL
const api = axios.create({
  baseURL: VUE_BASE_URL,
});

api.interceptors.request.use(
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

api.interceptors.response.use(
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

export default api;