<template>
    <MainLayout>
        <ChangRoleModal :show-change="showChange" :users="datas" @close="closeModal"/>
        <main class="flex flex-col p-5">
            <div class="text-center text-3xl font-semibold text-slate-500">
                <h1>List User</h1>
            </div>
            <br>
            <EasyDataTable table-class-name="customize" :headers="headers" :items="users" :loading="loading" :rows-per-page= page :rows-items=[page]>
                <template #item-action="items">
                    <ContainerDropDownVue>
                        <ContentItem @show-modal="showModal(showChange,items)" :show="showChange"/>
                    </ContainerDropDownVue>
                </template>
            </EasyDataTable>
        </main>
    </MainLayout>
</template>
<script setup>
import MainLayout from '../../layout/MainLayout.vue'
import ContainerDropDownVue from '../../components/dropdown/ContainerDropDown.vue';
import ContentItem from '../../components/dropdown/ContentItem.vue';
import ChangRoleModal from '../../components/modal/ChangRoleModal.vue';
import { onMounted,ref} from 'vue';
import {useUser} from '@/store/UserStore/userStore'

const user = useUser()
const users = ref([])
const datas = ref()
const showChange = ref()
const page = ref(10)
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
        value : 'action',
    }
]

const showModal = (value,items)=>{
    showChange.value = !value
    datas.value = items
}
const closeModal = (needRefresh)=>{
    if (needRefresh) return getUser()
    showChange.value = false
} 
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