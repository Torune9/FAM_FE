import api from '../service/api'
import { defineStore } from 'pinia'
export const categoryStore = defineStore('category', {
    actions: {
        async getCategory(payload){
            return api.get('/asset/categories',   { params: payload } )
            .then(res => {
                return res.data
            })
            .catch(eror => eror)
        },
        
        async addCategory(payload){
            return api.post('asset/categories',payload)
            .then(res => {
                switch (res.data.code) {
                    case 200:
                        alert(res.data.message)                       
                        break;
                    case 409:
                        alert(res.data.message)
                        break;
                    default:
                        break;
                }
            })
            .catch(eror =>  console.log(eror))
        },
        
        async updateCategory (id,payload){
            return api.put(`asset/categories/${id}`,payload)
            .then(res => alert(res.data.message))
            .catch(error => console.log(error))
        },

        async deleteCategory(payload){
            return api.delete(`asset/categories/${payload}`)
            .then(res => {
                return res.data
            })
            .catch(eror =>  console.log(eror))
        }
    },
  })