import { defineStore } from 'pinia'
import jwt_decode from "jwt-decode";

import api from '../service/api';

export const useAuth = defineStore('Auth', {
  state: () => ({
        token: null,
        user: {
            username: "",
            email: "",
            role: "",
        },
        eror :''
 }),

getters: {
    isAuthenticated: (state) => !!state.token,
},

actions: {
        async login(payload) {
            return api
                .post("api/authentication/login", payload)
                .then((res) => {
                    const { token } = res.data.data;
                    const decoded = jwt_decode(token);

                    this.token = token
                    this.user = decoded
                    console.log(this.user);

                    return res.data;
                })
                .catch((err) => {
                    console.error('Kesalahan saat login:', err); 
                    return Promise.reject(err);
                });
        },
}
})