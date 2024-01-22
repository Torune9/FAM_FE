import api from '../../service/mainService/api'
import {defineStore} from 'pinia'

export const assetStore = defineStore('asset',{
    actions :{
        async getAsset(payload){
            return api.get('assets',{
                params : payload
            })
            .then(res => {
                return res.data
            })
        },
        async getStatus(){
            return api.get('asset/statuses').then(res => {
                return res.data
            })
        },
        async addAsset(payload){
            return api.post('asset',payload)
        },
        async updateAsset(id,payload){
            return api.put(`asset/${id}`,payload)
        },
        async deleteAsset(id){
            return api.delete(`asset/${id}`)
            .then(res => {
                return res.data
            })
        },
        async restoreAsset(id){
            return api.put(`asset/${id}/restore`)
            .then(res => {
                return res.data
            })
        }
    }
})