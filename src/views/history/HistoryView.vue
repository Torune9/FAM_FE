<template>
    <MainLayout>
        <div class="flex flex-col p-5">
           <AttachmentModal :show-modal="showModal" 
           @close="closeModal" :data="content" :show-attachment="attachment" ref="test"/>
            <h2 class="text-center text-3xl font-semibold text-slate-500">History Inspection</h2>
            <br>
            <div class="flex items-center">
                <label class="bg-red-600 w-20 p-1 rounded-tl rounded-bl text-center text-white" for="search"><small>search</small></label>
                <input v-model="search" class="outline-none border-2 border-l-0 border-red-600 focus:border-red-400 rounded-tr rounded-br w-1/2 h-8 text-center" type="text" id="search">
            </div>
            <br>
            <EasyDataTable table-class-name="customizing-table" :headers="headers" :items="datas" :loading="loading" :rows-per-page=10 :rows-items=[10] :fixed-expand="true">
                <template #item-code="{ asset_code }">
                    <router-link :to="routes(asset_code)" class="text-blue-700 font-bold hover:underline hover:underline-offset-4 transition-all duration-500 hover:decoration-2 font-barlow ring-1 ring-blue-500 p-1 rounded">
                        {{ asset_code }}
                    </router-link>
                </template>
                <template #item-info="{ information,asset_code }">
                   <router-link :to="routes(asset_code)">
                    {{ information.slice(0,40) }}...
                   </router-link>
                </template>
                <template #item-action="item">
                    <div>
                        <button @click="showInspect(item,true)" class="bg-yellow-400 font-semibold w-36 rounded h-6 border-2 border-black text-black hover:bg-yellow-300 transition-all duration-200 hover:border-slate-400">Create attachment</button>
                    </div>
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
    import AttachmentModal from '../../components/modal/AttachmentModal.vue';
    
    const inspect = inspectStore()
    const category = categoryStore()
    const datas = ref([])
    const assets = ref([])
    const search = ref()
    const loading = ref(false)
    const showModal = ref(false)
    const content  = ref()
    const attachment = ref(false)

    const routes = (code)=>{
        return `/detail/${code}`
    }
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
            width : 200
        },
        {
            text :'Attachment',
            value : 'action',
            width : 200
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

    const showInspect = (item,show)=>{
        content.value = item
        showModal.value = true
        attachment.value = show
    }

    const closeModal = ()=>{
        showModal.value = false
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
        --easy-table-header-background-color: 
        #191717;
        --easy-table-header-font-color: white;

        
        --easy-table-body-row-hover-background-color: #d5d5d5;
        --easy-table-body-row-font-color: black;

        --easy-table-body-row-font-size : 12px;    

        font-weight: 900;
    }
</style>