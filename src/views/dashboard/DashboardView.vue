<template>
    <MainLayout>

        {{ login }}

    </MainLayout>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import MainLayout from '../../layout/MainLayout.vue';
import { useRouter } from "vue-router";
import { loginStore } from "@/store/loginStore"

const login = loginStore()
const router = useRouter()

onBeforeMount(() => {
    if (!login.isLogged) {
        router.replace("/")
    }
})




</script>
