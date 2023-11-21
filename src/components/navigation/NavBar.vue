<template>
  <header>
    <nav class="fixed right-0 bg-darkHunt top-0 w-4/5 flex justify-end h-16 items-center">
      <div class="flex flex-wrap justify-center items-center gap-4 w-[30%]">
        <h1 class=" text-white font-semibold" v-text="user.username ? user.username : 'User'"></h1>
        <div class="border rounded-full w-10 h-10 flex justify-center items-center">
          <font-awesome-icon icon="fa-solid fa-user" size="lg" />
      </div>
      <div class="">
        <button @click="logout"
          class="text-white border-2 border-white rounded p-2 text-[12px] font-semibold hover:bg-white hover:text-black hover:font-bold  hover:transition-all">logout</button>
      </div>
    </div>
  </nav>
</header></template>

<script setup>
import { loginStore } from '@/store/UserStore/loginStore'
import { reactive } from 'vue'

const auth = loginStore()
const user = reactive({
  username: ''
})
if (auth) {
  user.username = auth.user.username
}

const logout = () => {
  auth.logout()
}

</script>