<template>
  <main> 
    <LoadingSpinner :showLoad="loading"/> 
    <SuccessInfo :showSuccess="success" :data="data"/>
        <div class=" w-screen h-screen flex justify-center items-center">
           <div class="rounded-md flex justify-center items-center flex-wrap h-[400px] w-[400px] max-[450px]:w-[350px] max-[450px]:h-[350px] p-4 shadow-lg bg-slate-800 text-zinc-200 relative">
            <h1 class=" text-2xl font-semibold mb-9">Forgot password</h1>
            <small class=" mb-4">Please provide your email addres that you used when you signed up for your account.</small>
            <form @submit.prevent="forgotPw" class="flex flex-wrap gap-5">
                <div>
                    <label for="email" class=" font-semibold ">Email</label>
                    <br>
                    <input v-model="payload.email" type="text" id = "email" class=" w-60 h-9 outline-none border border-slate-600 rounded-md text-center text-sm bg-transparent" required placeholder="email">
                </div>
                <small>We will send you and email that will allow you to reset password.</small>
                <div><button class=" bg-yellow-500 w-40  rounded-md h-10 font-semibold text-sm text-zinc-100">Send</button>
                </div>
              </form>
              <div class="relative">
               <small class="text-white before:absolute before:bottom-0 before:contents[''] before:bg-white before:h-[2px] before:w-[34px] before:mr-3 active:text-slate-400 before:scale-x-0 hover:before:scale-x-100 before:transition-transform active:scale-x-100 font-semibold"><router-link to="/">Login</router-link></small>
              </div>
           </div>
        </div>
  </main>
</template>

<script setup>
import {ref,reactive} from 'vue'
import { forgotPassword } from '@/store/UserStore/forgotPassword';
import { useNotification } from '@kyvg/vue3-notification';
import LoadingSpinner from '../../components/utilComponent/LoadingSpinner.vue';
import SuccessInfo from '../../components/utilComponent/SuccessInfo.vue'
const forgot = forgotPassword()
const payload = reactive({
  email  :''
})
const loading = ref(false)
const success = ref(false)
const data = ref(null)
const notification = useNotification()
const infoError = (message)=>{
  notification.notify({
    title  : message,
    type : 'error'
  })
}

const forgotPw = ()=>{
  loading.value = true
  forgot.sendForgotPassword(payload)
  .then(res => {
    success.value = true
    data.value = res.data
  })
  .catch(error => {
    const {response:{data:{message}}}= error
    infoError(message)
  }).finally(()=>{
    loading.value = false
  })
}

</script>

<style> 
  div {
    font-family: 'prompt', sans-serif;
  }
</style>