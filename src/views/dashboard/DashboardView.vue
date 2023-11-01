<template>
    <MainLayout>
      <div class="w-full h-full flex items-center justify-center text-[90px] font-bold text-slate-400 max-lg:text-6xl max-sm:text-4xl">
        <h1>Welcome,</h1>
        <span class="group" v-for="name of user" :key="name">
          <h1 class="group-hover:scale-75 group-hover:font-black group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300 group-hover:rounded group-hover:p-2 group-hover:animate-none ">{{ name }}
          </h1>
        </span>
      </div>
    </MainLayout>
</template>

<script setup>

import MainLayout from '../../layout/MainLayout.vue';

import { loginStore } from "@/store/loginStore"
import {onBeforeMount} from 'vue'
import { useRouter } from "vue-router";
const router = useRouter()
const login = loginStore()

const {user:{username}} = login
const user = [...username]
onBeforeMount(() => {
    if (!login.isLogged) {
        router.replace("/")
    }
})

</script>
<style setup>
 div{
  font-family: 'Poppins',sans-serif;
 }
</style>
