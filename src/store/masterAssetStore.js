import { defineStore } from 'pinia';

import api from '../service/api'

export const masterStore = defineStore('master',{
    actions :{
        async getMasterData(payload){
            return api.get('master-asset',{params : payload})
            .then(res => res.data)
        },
        async addMaster (payload){
            return api.post('master-asset',payload)
        },
        async updateMaster (id,payload){
            return api.put(`master-asset/${id}`,payload)
            
        }
    }
})