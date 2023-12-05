<template>
    <nav class="fixed w-4/5 right-0 bg-darkHunt top-0 flex justify-end h-[10%] items-center z-50">
      <div class="flex flex-wrap sm:justify-center items-center gap-4 sm:w-1/2 lg:w-[30%] min-[300px]:w-full min-[300px]: justify-around">
        <h1 @click="isShowDrop" class=" text-white font-semibold cursor-pointer" v-text="user.username ? user.username : 'User'"></h1>
        <div class="border rounded-full w-10 h-10 flex justify-center items-center">
          <font-awesome-icon icon="fa-solid fa-user" size="lg" />
        </div>
        <div class="">
          <button @click="logout"
          class="text-white border-2 border-white rounded p-2 text-[12px] font-semibold hover:bg-white hover:text-black hover:font-bold  hover:transition-all">logout</button>
        </div>
      </div>
      <div>
        <slot name="dropdown"/>
      </div>
    </nav>

</template>

<script setup>
import { loginStore } from '@/store/UserStore/loginStore'
import { reactive,provide, ref} from 'vue'

const auth = loginStore()
const user = reactive({
  username: ''
})
const isActive = ref(false)
const isShowDrop = ()=> isActive.value = !isActive.value

if (auth) {
  user.username = auth.user.username
}

const logout = () => {
  auth.logout()
}

provide('isDropDown',isActive)
</script>