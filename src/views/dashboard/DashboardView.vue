<template>
    <MainLayout>
      <div class ="flex items-center justify-center w-full overflow-hidden h-screen text-[90px] font-bold text-slate-400 max-lg:text-6xl max-sm:text-4xl max-w-screen-xl flex-col">
        <h1>Welcome,</h1>
        <div class="flex flex-row flex-wrap max-w-2x rounded bg-slate-100 p-2">
          <span class="group" v-for="name of [...auth.getUsername]" :key="name">
            <h1 class="group-hover:scale-75 group-hover:font-black group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300 group-hover:rounded group-hover:p-2 group-hover:animate-none ">{{ name }}
            </h1>
          </span>
        </div>
      </div>
    </MainLayout>
</template>

<script setup>

import MainLayout from '@/layout/MainLayout.vue';
import { loginStore } from "@/store/UserStore/loginStore"

const auth = loginStore()

</script>

<style>
 div{
  font-family: 'Poppins',sans-serif;
 }
</style>
