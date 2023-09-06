import { defineStore } from "pinia";

const apiStore = defineStore('api',{
    state:()=>({
        API_URL : 'http://localhost:3000/api/'
    }),
})

export default apiStore