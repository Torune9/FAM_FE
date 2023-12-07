<template>
    <MainLayout>
        <ManageModal :title="title" :id="id" :show-change="showChange" :users="datas" @close="closeModal"/>
        <main class="flex flex-col">
            <div class="text-center text-3xl font-semibold text-slate-500">
                <h1>List User</h1>
            </div>
            <br>
            <div class="flex items-center">
                <label class="bg-red-600 w-20 p-1 rounded-tl rounded-bl text-center text-white" for="search">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </label>
                <input v-model="search" class="outline-none border-2 border-l-0 border-red-600 focus:border-red-400 rounded-tr rounded-br w-1/2 h-8 pl-5" type="text" id="search" placeholder="search user...">
            </div>
            <br>
            <div class="flex items-center gap-4">
                <label for="user">{{ label }}</label>
                <input v-model="isActive" type="checkbox" name="user" id="user">
            </div>
            <br>
            <EasyDataTable table-class-name="customize" :headers="headers" :items="users" :loading="loading" :rows-per-page= page :rows-items=[page]>
                <template #item-action="items">
                    <ContainerDropDownVue>
                        <ContentDropDown :datas="users" @showRoleModal="showModal($event,showChange,items)"/>
                    </ContainerDropDownVue>
                </template>
            </EasyDataTable>
        </main>
    </MainLayout>
</template>
<script setup>
import MainLayout from '../../layout/MainLayout.vue'
import ContainerDropDownVue from '../../components/dropdown/ContainerDropDown.vue';
import ContentDropDown from '../../components/dropdown/ContentDropDown.vue';
import ManageModal from '../../components/modal/userManagementModal/ManageModal.vue';
import { onMounted,ref, watch} from 'vue';
import {useUser} from '@/store/UserStore/userStore'

const user = useUser()
const id = ref()
const users = ref([])
const datas = ref()
const title = ref('')
const search = ref('')
const showChange = ref(false)
const page = ref(10)
const loading = ref(false)
const isActive = ref(true)
const label = ref('Active User')
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

const showModal = (event,value,items)=>{
    id.value = parseInt(event.target.id,10)
    title.value = event.target.innerText
    showChange.value = !value
    datas.value = items
}
const closeModal = (needRefresh)=>{
    if (needRefresh) return getUser()
    showChange.value = false
} 
const getUser = ()=>{
    loading.value = true
    const payload = {
        search: search.value,
        isActive : isActive.value
    }
    user.getUser(payload)
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

watch(()=>[isActive.value,search.value],()=>{
    getUser()
    isActive.value == true ? label.value = 'Active User' : label.value = 'Not Active User'
})
</script>

<style scoped>
.customize{
    --easy-table-header-background-color : #0B2447;
    --easy-table-header-font-color: #ffff;
    font-weight: 900;
}
</style>