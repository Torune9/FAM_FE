import api from '../../service/mainService/api'
import { defineStore } from 'pinia';

export const useUser = defineStore('User', {
    state: () => ({}),
    getters: {},
    actions: {
        async getUser(payload){
          return api.get('/api/users',{params: payload})
          .then(res => res.data)
          .catch(err => console.log(err))
        },
        async manageUser(payload,username){
          return api.post(`/api/image/${username}/upload`,payload)
          .then(res => res.data)
        }
    }
})