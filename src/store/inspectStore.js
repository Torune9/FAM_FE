import api from '../service/api'
import {defineStore} from 'pinia'

export const inspectStore = defineStore('inspection',{
    actions : 
    {
        async addInspect(code,payload){
                return api.post(`asset/${code}/inspection`,payload)
        },
        async getHistory(payload){
            return api.get(`asset/history/`,{params : payload})
            .then(res => {
                return res.data
            })
        },
        async createAttachment(code,payload){
            return api.post(`asset/attachment/${code}`,payload)
        },
        async getAttachments(code){
            return api.get(`asset/attachment/${code}`)
            .then(res => {
                return res.data
            })
        }
    }
})