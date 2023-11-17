<template>
  <main>
    <LoadingSpinner :show-load="loading"/>
    <div class=" w-screen h-screen flex justify-center items-center bg-slate-300">
       <div class="rounded-md flex justify-center items-center flex-wrap h-[300px] w-[300px] shadow-lg bg-slate-700 text-zinc-200">
        <h1 class=" text-2xl font-semibold ">Reset password</h1>
        <small>Fill up the field to change it  your password</small>
        <form @submit.prevent="resetPassword">
            <label for="password" class=" font-semibold ">Password</label>
            <br>
            <input  v-model="payload.newPassword"  type="password" id = "password" class=" w-60 h-8 outline-none border rounded-md text-center bg-transparent" required>
            <br>
            <br>
            <div>
              <button class=" bg-red-500 w-40  rounded-md h-10 font-semibold text-sm text-zinc-100">
                Reset password
              </button>
            </div>
            <button class="p-1 rounded border mt-2 hover:bg-white/30 duration-300 transition-all" type="button">
              <router-link to="/">
                <small>
                  back
                </small>
              </router-link>
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { forgotPassword } from '@/store/UserStore/forgotPassword';
  import { reactive,ref} from 'vue';
  import { useRoute,useRouter } from 'vue-router';
  import { useNotification } from '@kyvg/vue3-notification';
  import LoadingSpinner from '../../components/utilComponent/LoadingSpinner.vue';

  const notification = useNotification()
  const route = useRoute()
  const router = useRouter()
  const forgot = forgotPassword()
  const loading = ref(false)
  const payload = reactive({
    newPassword : ''
  })
  const infoSuccess = (message)=>{
    notification.notify({
      title : 'Success',
      text : message
    })
  }
  const infoError = (message)=>{
    notification.notify({
      title : 'Failed',
      text : message,
      type : 'error'
    })
  }

  const resetPassword = ()=>{
    loading.value = true
    forgot.resetPassword(route.params.token,payload)
    .then(res => {
      infoSuccess(res.data.message)
      router.replace({
        path : '/'
      })
    }).catch(error => {
      infoError(error.response.data.message)
    }).finally(()=>{
      loading.value = false
    })
  }
</script>

<style>
</style>