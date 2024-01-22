import api from '../../service/api'
import {defineStore} from 'pinia'

export const inspectStore = defineStore('inspection',{
    actions : 
    {
        async addInspect(id,payload){
                return api.post(`asset/${id}/inspection`,payload)
        },
        async getHistory(payload){
            return api.get(`asset/histories/`,{params : payload})
            .then(res => {
                return res.data
            })
        },
        async createAttachment(id,code,payload){
            return api.post(`asset/attachment/${id}/${code}`,payload)
        },
        async getAttachments(code){
            return api.get(`asset/attachment/${code}`)
            .then(res => {
                return res.data
            })
        },
    }
})