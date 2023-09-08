<template>
  <main>
    <div class="flex justify-center items-center  w-screen h-screen">
    <div class="h-[400px] w-[400px] bg-slate-800 rounded-md flex flex-wrap justify-center items-center text-zinc-100 shadow-xl">
    
        <div class=" w-[20%]  mt-6 rounded-md bg-red-300 flex justify-center items-center text-red-600 h-8 absolute top-4" v-if="auth.eror"><small class=" font-bold">{{ auth.eror}}</small></div>

        <p class="text-center w-full font-extrabold text-2xl">Login Form</p>
        
        <form @submit.prevent="login" class="grid grid-rows-3 h-44 gap-10 justify-items-center">
            
        <div :class="{ error: v$.username.$errors.length }">
            <label class="font-bold" for="username">username</label>
            <br>
            <input type="text" name="username" id="username" class="h-8 w-[250px] text-center text-sm border-2 rounded-md border-slate-200 bg-transparent outline-none" v-model="form.username" >
            <div class="input-errors" v-for="error of v$.username.$errors" >
                <div class=" text-red-600"><small>{{ '*' + error.$message }}</small></div>
            </div>
        </div>

        <div :class="{ error: v$.password.$errors.length }">
            <label class="font-bold" for="password">password</label>
            <br>
            <input type="password" name="password" id="password" class="w-[250px] text-center text-sm border-2 h-8 rounded-md border-slate-200 bg-transparent outline-none" v-model="form.password" >
            <div class="input-errors" v-for="error of v$.password.$errors" >
                <div class=" text-red-600"><small>{{ '*' + error.$message }}</small></div>
            </div>
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

<script setup>
 import {useVuelidate} from '@vuelidate/core';
 import { required } from '@vuelidate/validators';
 import {loginStore} from '../store/loginStore'

 import { reactive, computed } from "vue"
    
 const auth = loginStore()
 
 const form = reactive({
     username : '',
     password : '',
    })
    
    
 const rules = computed(()=> {
    return {
        username : {required},
        password : {required}
        }
    })
 const v$ = useVuelidate(rules,form)
 

 const login =async () => {
    v$.value.$touch()

    if(v$.value.$invalid) return
    auth.signIn(form)
 }

</script>

<style>
</style>