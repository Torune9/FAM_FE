import api from '../../service/mainService/api'
import { defineStore } from 'pinia'

export const forgotPassword = defineStore('forgot',{
    actions :{
        async sendForgotPassword(payload){
            return api.post('api/forgot',payload)
        },
        async resetPassword (token,payload){
            return api.put(`api/password/${token}`,payload)
        }
    }
})
