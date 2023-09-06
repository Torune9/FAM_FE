
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAlert: true,
        eror : ''
      }),
    actions:{
    async signIn(username,password) {
        const response = await axios.post('http://localhost:3000/api/authentication/login',{
            username,password
        })
        if(response.data.statusCode == 200){
            alert('Login Success.')
            router.push({
                path : '/dashboard'
            })
        }
        if (response.data.code == 406) {
            this.eror = response.data.message
            this.isAlert = false
        }
      },
    }
});
