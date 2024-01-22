import { defineStore } from "pinia";
import api from "../../service/api";

export const sysAdminStore = defineStore('sysadmin',{
    actions:{
        async updateUser(id,role){
            return api.put(`/api/update/${id}`,role)
            .then(res => res.data)
          },
        async resetPassword(id,payload){
            return api.put(`api/users/${id}/reset-password`,payload)
            .then(res => res.data)
        },
        async deactivateAccount(id,value){
            return api.get(`api/users/${id}/${value}/deactivate-account`)
            .then(res => res.data)
        } 
    }
})