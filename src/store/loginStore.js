import { defineStore } from 'pinia';

import router from '../router';

import jwtDecode from 'jwt-decode';
import api from '../service/api'

export const loginStore = defineStore('login', {
    state: () => ({
        eror : '',
        token : null
      }),
     
    actions:{
    async signIn(payload) {
        const response = await api.post(`/authentication/login`,payload)
        
        if (response.data.code == 406) {
          this.eror = response.data.message
          return this.eror
        }
        
        const {data:{token}} = response.data
        this.token = jwtDecode(token)
        
        if (this.token.username == payload.username) {
          return  router.push({
                    path : '/dashboard'
                })
        }

      },
    }
});

