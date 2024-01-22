import { defineStore } from 'pinia';
import { infoError,infoSuccess } from '../../service/commonService/notification';

import router from '../../router';

import jwtDecode from 'jwt-decode';
import api from '../../service/mainService/api'


export const loginStore = defineStore('login', {
  state: () => ({
    error: '',
    token: null,
    user: {},
    id : '',
    profile:''
  }),

  persist: {
    paths : ['user','token','id','profile']
  },

  getters: {
    isLogged: state => !!state.token,
    getProfile : state => state.profile,
    getUsername : state => state.user.username
  },

  actions: {
    async signIn(payload) {
      try {
        const response = await api.post(`api/authentication/login`, payload)
        const { data: 
          { token,
            user : {id,image} 
          },
          message,
        } = response.data
        const decoded = jwtDecode(token);

        this.token = token
        this.user = decoded
        this.id = id
        this.profile = image
        
        if (this.user.username == payload.username) {
        infoSuccess(message)
          return router.push({
            path: '/dashboard'
          })
        }
        
      } catch (error) {
          const err = error.response.data.message
          infoError(err)
          return error
      }


    },
    async signUp(payload) {
      return api.post('api/register',payload)
      .then(res => {
        if (res.data.status) {
          this.message = res.data.message
          infoSuccess(this.message)
          return router.push({
              path: '/'
            })
        }
      })
      .catch(error => {
       this.error = error.response.data.message
       infoError(this.error)
       return error
      })
    },
    logout() {
      setTimeout(()=>{
        localStorage.clear()
        this.token = ''
        this.user = {}
        this.error = ''
        router.replace('/')
       },500)
       
    },
    async getImage(id){
      return api.get(`/api/image/${id}`)
      .then(res => {
        const {data:{user:{image:{img}}}} = res.data
        this.profile = img
      })
    },
    async getUsernameById(id){
      return api.get(`/api/username/${id}`)
      .then(res => {
        const {data:{user:{username}}} = res.data
        this.user.username = username
      })
    }
  },
  
});
