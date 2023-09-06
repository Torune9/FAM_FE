
import { defineStore, mapState } from 'pinia';
import axios from 'axios';
import router from '../router';
import apiStore from './apiStore';
import jwtDecode from 'jwt-decode';

export const loginStore = defineStore('login', {
    state: () => ({
        eror : '',
        token : null
      }),
      getters: {
        ...mapState(apiStore,['API_URL'])
      },
    actions:{
    async signIn(username,password) {
        const response = await axios.post(`${this.API_URL}authentication/login`,{
            username,password
        })
        
        if (response.data.code == 406) {
          this.eror = response.data.message
          return this.eror
        }
        
        const {data:{token}} = response.data
        this.token = jwtDecode(token)
        if (this.token.username == username) {
          return  router.push({
                    path : '/dashboard'
                })
        }

      },
    }
});
