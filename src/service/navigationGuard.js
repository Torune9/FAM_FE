import { loginStore } from "../store/UserStore/loginStore"
const navGuard = (to,from,next)=>{
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (to.name !== 'login' && !loginStore().isLogged){
        next({ name: 'login' })
      }
      next()
    }else{
      if(loginStore().isLogged && to.name == 'login'){
        next({
          name : 'dashboard'
        })
      }else{
        next()
      }
    }
  }

  export default navGuard