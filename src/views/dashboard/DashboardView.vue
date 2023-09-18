<template>
    <MainLayout>

      <div class="w-full h-full flex items-center justify-center">
        <h2 class=" text-[80px] font-black text-slate-400">Welcome ,{{ username}} </h2>
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
onBeforeMount(() => {
    if (!login.isLogged) {
        router.replace("/")
    }
})

</script>
