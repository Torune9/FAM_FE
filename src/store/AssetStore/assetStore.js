import api from '../../service/api'
import {defineStore} from 'pinia'

export const assetStore = defineStore('asset',{
    actions :{
        async getAsset(payload){
            return api.get('asset',{
                params : payload
            })
            .then(res => {
                return res.data
            })
        },
        async getStatus(){
            return api.get('asset/status').then(res => {
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
        async trueDeleted(id){
            return api.delete(`asset/${id}/deleted`)
            .then(res => {
                return res.data
            })
        },
        async restoreAsset(id){
            return api.put(`asset/restore/${id}`)
            .then(res => {
                return res.data
            })
        }
    }
})