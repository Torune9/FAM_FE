import api from '../service/api'
import { defineStore } from 'pinia'

export const categoryStore = defineStore('category', {
    actions: {
        async getCategory(payload){
            return api.get(`asset/categories`, { params: payload })
            .then(res => {
                return res.data
            })
        },
        
        async addCategory(payload){
            return api.post('asset/categories',payload)
        },
        
        async updateCategory (id,payload){
            return api.put(`asset/categories/${id}`,payload)
        },

        async deleteCategory(id){
            return api.delete(`asset/categories/${id}`)
            
        },
        async restoreCategory(id){
            return api.get(`asset/categories/${id}`)
        }
    },
  })