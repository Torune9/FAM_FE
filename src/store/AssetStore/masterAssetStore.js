import { defineStore } from 'pinia';

import api from '../../service/mainService/api'

export const masterStore = defineStore('master',{
    actions :{
        async getMasterData(payload){
            return api.get('master-assets',{params : payload})
            .then(res => res.data)
        },
        async addMaster (payload){
            return api.post('master-asset',payload)
        },
        async updateMaster (id,payload){
            return api.put(`master-asset/${id}`,payload)
        },
        async deleteMaster(id){
            return api.delete(`master-asset/${id}`)
            .then(res => {
                return res.data
            })
        },
        async restoreMaster(id){
            return api.put(`master-asset/${id}/restore`)
            .then(res => {
                return res.data
            })
        }
    }
})