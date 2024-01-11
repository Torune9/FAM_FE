<template>
    <MainLayout>
        <div class="flex flex-col">
            <h2 class="text-center text-3xl font-semibold text-slate-500">History Inspection</h2>
            <br>
            <div class="flex items-center">
                <label class="bg-red-600 w-20 p-1 rounded-tl rounded-bl text-center text-white" for="search">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </label>
                <input v-model="search" class="outline-none border-2 border-l-0 border-red-600 focus:border-red-400 rounded-tr rounded-br w-1/2 h-8 pl-5" type="text" id="search" placeholder="search history...">
            </div>
            <br>
            <EasyDataTable table-class-name="customizing-table" :headers="headers" :items="datas" :loading="loading" :rows-per-page=rows :rows-items=[rows] :fixed-expand="true">
                <template #item-info ={information}>
                    {{ information.substr(0,39) }}...
                </template>
                <template #item-code="{ asset_code }">
                    <router-link :to="routes(asset_code)" class="text-blue-700 font-bold hover:underline hover:underline-offset-4 transition-all duration-500 hover:decoration-2 font-barlow ring-1 ring-blue-500 p-1 rounded">
                        {{ asset_code }}
                    </router-link>
                </template>
            </EasyDataTable>
        </div>
    </MainLayout>
</template>

<script setup>
    import MainLayout from '../../layout/MainLayout.vue';
    import {inspectStore} from '@/store/AssetStore/inspectStore'
    import { categoryStore } from '@/store/AssetStore/categoryStore';
    import {ref,onMounted,watch} from 'vue'

    const inspect = inspectStore()
    const category = categoryStore()
    const datas = ref([])
    const assets = ref([])
    const search = ref()
    const loading = ref(false)
    const rows = ref(8) 
    
    const headers = [
        {
            text :'Asset Code',
            value : 'code',
            width : 100
        },
        {
            text :'Name',
            value : 'name',
            width : 100
        },
        {
            text :'Status',
            value : 'status',
            width : 100
        },
        {
            text :'Information',
            value : 'info',
            width : 100
        },
    ]    
    const getHistory = ()=>{
        loading.value = true
        const payload = {
            search : search.value
        }
        
        inspect.getHistory(payload)
        .then(res =>{
            datas.value = res.result.data
        })
        .finally(()=>{
            loading.value = false
        })
    }
    
    const getCategories = ()=>{
        category.getCategory()
        .then(res=>{
            assets.value = res.result.content
        })
    }
    
    const routes = (code)=>{
        return `/detail/${code}`
    }

    watch(()=>search.value,()=>{
       getHistory()
    })
    onMounted(()=>{
       getHistory()
       getCategories()
    })
</script>

<style scoped>
    .customizing-table{
        --easy-table-header-background-color:#272121;
        --easy-table-header-font-color: white;
        font-weight: 900;
    }
</style>