<template>
    <nav class="max-[800px]:w-full fixed w-4/5 right-0 bg-darkHunt top-0 flex justify-end h-[10%] items-center z-50 p-5">
      <div class="flex max-[800px]:w-[60%] max-[700px]:w-full w-[30%] justify-around items-center">
        <div v-if="showToggleBtn" @click="sendSidebarData" class="cursor-pointer text-white">
          <font-awesome-icon icon="fa-solid fa-bars"/>
        </div>
          <div class="flex flex-row w-full justify-center items-center gap-4 max-[700px]:w-1/2">
            <h1 @click="authDropDown" class=" text-white font-semibold cursor-pointer" v-text="user.username ? auth.getUsername : 'User'"/>
              <div class="relative">
                <div class="rounded-full overflow-hidden w-12 h-12 flex justify-center items-center">
                  <figure class="h-full w-full flex justify-center items-center" v-if="auth.profile || fileUpload.length > 0">
                    <img class="w-full h-full" :src="src" alt="your profile image">
                  </figure>
                  <font-awesome-icon icon="fa-solid fa-user" size="lg" v-else/>
                </div>
                <button class="absolute text-white -bottom-1 -right-1">
                  <router-link to="/manage-profile">
                    <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
                  </router-link>
                </button>
              </div>
              <div>
                <button @click="logout"
                class="text-white border-2 border-white rounded p-2 text-[12px] font-semibold hover:bg-white hover:text-black hover:font-bold  hover:transition-all">logout</button>
              </div>
          </div>
      </div>
      <div>
        <slot name="dropdown"/>
      </div>
    </nav>

</template>

<script setup>
import { reactive,provide, ref, onMounted, watchEffect } from 'vue'
import { loginStore } from '@/store/UserStore/loginStore'

const auth = loginStore()
const user = reactive({
  username: ''
})

const isActive = ref(false)
const fileUpload = ref([])
const src = ref('')
const isShowDrop = ()=> isActive.value = !isActive.value
const authDropDown =()=>{
  if (auth.user.role != 'SYSADMIN') return 
  isShowDrop()
} 

const logout = () => {
   return auth.logout()
}

const showToggleBtn = ref(true)
const monitScreen = ()=>{
  showToggleBtn.value = window.innerWidth <= 700
}
const resize = ()=> {
  window.addEventListener('resize',monitScreen)
}

const getUsername = ()=>{
    auth.getUsernameById(auth.id)
}

const emit = defineEmits(['sendSidebarData'])
const sendSidebarData = ()=>{
  emit('sendSidebarData',true)
}



watchEffect(()=> src.value = import.meta.env.VITE_APP_BASE_URL + `resources/${auth.getProfile}`)

onMounted(()=> {
  if (auth) {
  user.username = auth.user.username
  getUsername()
  src.value = import.meta.env.VITE_APP_BASE_URL + `resources/${auth.getProfile}`
}
  monitScreen()
  resize()
})

provide('isDropDown',isActive)
</script>
<style scoped>

.btnSub-enter-active,
.btnSub-leave-active {
  transition: opacity 0.5s ease;
}

.btnSub-enter-from,
.btnSub-leave-to {
  opacity: 0;
}
</style>