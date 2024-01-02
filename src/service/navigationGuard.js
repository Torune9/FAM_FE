import { loginStore } from "../store/UserStore/loginStore"
const navGuard = (to,from,next)=>{
    if (to.matched.some(record => record.meta.requiresAuth) && !loginStore().isLogged) {
      next('home')
    }else{
      if(loginStore().isLogged && (to.name == 'login' || to.name == 'home')){
        next({
          name : 'dashboard'
        })
      }else{
        next()
      }
    }
  }

  export default navGuard