import { defineStore } from 'pinia';

import router from '../router';

import jwtDecode from 'jwt-decode';
import api from '../service/api'


export const loginStore = defineStore('login', {
  state: () => ({
    eror: '',
    token: null,
    user: {}
  }),

  persist: true,

  getters: {
    isLogged: state => !!state.token
  },

  actions: {
    async signIn(payload) {
      const response = await api.post(`api/authentication/login`, payload)

      if (response.data.code == 406) {
        this.eror = response.data.message
        return this.eror
      }

      const { data: { token } } = response.data
      const decoded = jwtDecode(token);
      this.token = token
      this.user = decoded

      if (this.user.username == payload.username) {
        return router.push({
          path: '/dashboard'
        })
      }
    },

    logout() {
      this.token = null;
      this.user = {};
      this.eror = null
      if (this.isLogged == false) {
        router.replace("/")
      }
    }
  },
});
