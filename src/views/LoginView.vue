<template>
  <main>
    <div class="flex justify-center items-center  w-screen h-screen">
    <div class="h-[400px] w-[400px] bg-slate-800 rounded-md flex flex-wrap justify-center items-center text-zinc-100 shadow-xl">
        <div class=" w-[20%]  mt-6 rounded-md bg-red-300 flex justify-center items-center text-red-600 h-8 absolute top-4" v-if="auth.eror"><small class=" font-bold">{{ auth.eror }}</small></div>
        <p class="text-center w-full font-extrabold text-2xl">Login Form</p>
        <form @submit.prevent="login" class="grid grid-rows-4 h-44 gap-10 justify-items-center">
        <div>
            <label class="font-bold" for="username">username</label>
            <br>
            <input type="text" name="username" id="username" class="h-8 w-[250px] text-center text-sm border-2 rounded-md border-slate-200 bg-transparent outline-none" v-model="username" >
        </div>

        <div>
            <label class="font-bold" for="password">password</label>
            <br>
            <input type="password" name="password" id="password" class="w-[250px] text-center text-sm border-2 h-8 rounded-md border-slate-200 bg-transparent outline-none" v-model="password" >
        </div>
        <div class="flex justify-center items-center">      
            <button class=" bg-blue-600 w-[250px] h-9 mt-20 rounded-md text-white font-semibold">Login</button>
        </div>
        </form>
        <!-- login -->
        <p class=" w-full text-center text-sm"><router-link to ="/forgot-password">Forgot password?</router-link></p>
    </div>
</div>
  </main>
  <router-view/>)
</template>

<script>
    import {useVuelidate} from '@vuelidate/core';
    import { required } from '@vuelidate/validators';
    import {loginStore} from '../store/loginStore'

    export default{
        setup(){
            const auth = loginStore()
            return{
                v$ : useVuelidate(),
                auth,
            }
        },
        data(){
            return{
                username : '',
                password : '',
            }
        },
        validations(){
            return {
              username : {required},
              password : {required}
            }
        },
        methods:{
          login(){
            this.v$.$validate()
            this.auth.signIn(this.username,this.password)
          }
        },
    }
    
</script>

<style>
</style>