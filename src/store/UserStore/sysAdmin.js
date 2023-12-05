import { defineStore } from "pinia";
import api from "../../service/api";

export const sysAdminStore = defineStore('sysadmin',{
    actions:{
        async resetPassword(id,payload){
            return api.put(`api/users/reset-password/${id}`,payload)
            .then(res => res.data)
            .catch(error => console.log(error))
        },
        async deactivateAccount(id,value){
            return api.get(`api/users/deactivate-account/${id}/${value}`)
        } 
    }
})