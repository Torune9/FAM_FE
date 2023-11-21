<template>
    <MainLayout>
        <main class="flex flex-col p-5">
            <EasyDataTable table-class-name="customize" :headers="headers" :items="users" :loading="loading">
                <template #item-action="items">
                    <button class="bg-pencil w-16 h-5 rounded text-white font-semibold">Edit</button>
                </template>
            </EasyDataTable>
        </main>
    </MainLayout>
</template>
<script setup>
import MainLayout from '../../layout/MainLayout.vue'
import {useUser} from '@/store/UserStore/userStore'
import { onMounted,ref } from 'vue';

const user = useUser()
const users = ref([])
const loading = ref(false)
const headers = [
    {
        text : 'Username',
        value : 'username'
    },
    {
        text : 'Email',
        value : 'email'
    },
    {
        text : 'Role',
        value : 'role_id'
    },
    {
        text : 'Action',
        value : 'action'
    }
]
const getUser = ()=>{
    loading.value = true
    user.getUser()
    .then(res => {
       users.value = res.data
    })
    .finally(()=>{
        loading.value = false
    })
}
onMounted(()=>{
    getUser()
})

</script>

<style scoped>
.customize{
    --easy-table-header-background-color : #0B2447;
    --easy-table-header-font-color: #ffff;
    font-weight: 900;
}
</style>