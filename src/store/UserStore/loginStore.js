import { defineStore } from 'pinia';

import router from '../../router';

import jwtDecode from 'jwt-decode';
import api from '../../service/api'


export const loginStore = defineStore('login', {
  state: () => ({
    eror: '',
    token: null,
    user: {},
    message : ''
  }),

  persist: true,

  getters: {
    isLogged: state => !!state.token,
  },

  actions: {
    async signIn(payload,info) {
      const response = await api.post(`api/authentication/login`, payload)

      if (response.data.code == 406) {
        this.eror = response.data.message
        return this.eror
      }else{
        response.data.message
      }

      const { data: { token},message } = response.data
      const decoded = jwtDecode(token);
      this.token = token
      this.user = decoded
      this.message = message
      
      if (this.user.username == payload.username) {
        info()
        return router.push({
          path: '/dashboard'
        })
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.eror = null
       setTimeout(()=>{
        localStorage.clear()
        router.replace("/")
       },500)
       
    },
    async signUp(payload,info) {
      return api.post('api/register',payload)
      .then(res => {
        console.log(res.data);
        if (res.data.status) {
          this.message = res.data.message
          info()
            return router.push({
              path: '/'
            })
        }
      })
      .catch(error => {
       this.eror = error.response.data.message
      })
    }
  },
});
