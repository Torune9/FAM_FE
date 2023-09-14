import api from '../service/api'
import { defineStore } from 'pinia'
export const categoryStore = defineStore('category', {
    state: () => ({ 
       categories : [],
       eror:'',
       success:''
    }),
    actions: {
        async getCategory(){
            return api.get('/asset/categories')
            .then(res => {
                const {data:{result:{content}}} = res
                this.categories = content
                return this.categories
            })
            .catch(eror => eror)
        },
        
        async addCategory(payload){
            return api.post('asset/categories',payload)
            .then(res => {
                switch (res.data.code) {
                    case 200:
                        this.success = res.data.message                        
                        break;
                    case 409:
                        this.eror = res.data.message
                        break;
                    default:
                        break;
                }
            })
            .catch(eror =>  console.log(eror))
        }
    },
  })