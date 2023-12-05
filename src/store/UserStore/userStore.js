import api from '../../service/api'
import { defineStore } from 'pinia';

export const useUser = defineStore('User', {
    state: () => ({}),
    getters: {},
    actions: {
        async getUser(payload){
          return api.get('/api/listUser',{params: payload})
          .then(res => res.data)
          .catch(err => console.log(err))
        },
        async updateUser(id,role){
          return api.put(`/api/update/${id}`,role)
        }
    }
})