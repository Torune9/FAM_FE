<template>
    <MainLayout>
        <div class="flex flex-col">
            <div class="text-center text-3xl font-semibold text-slate-500">
                <h1>Master Asset</h1>
            </div>
            <div>
                <button class="p-2 bg-pencil rounded hover:bg-slate-400 text-white font-semibold mb-4" @click="btnCreate"> 
                    Add Master
                </button>
            </div>
            <div class="flex items-center">
                <label class="bg-red-600 w-20 p-1 rounded-tl rounded-bl text-center text-white" for="search">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </label>
                <input v-model="search" class="outline-none border-2 border-l-0 border-red-600 focus:border-red-400 rounded-tr rounded-br w-1/2 h-8 pl-5" type="text" id="search" placeholder="search master...">
            </div>
            <br>
            <div class="flex items-center w-40 h-6 mb-3">
                <label class="mr-4 text-sm text-black font-semibold" for="not-active">Not Active</label>
                <input id="not-active" type="checkbox" v-model="is_deleted">
            </div>
            <div>
                <EasyDataTable table-class-name="customizing-table" :headers="headers" :items="dataMaster" :loading="loading"  alternating border-cell :rows-per-page=7 :rows-items=[7]  buttons-pagination>
                    <template #item-action ="item">
                        <div class="flex flex-row gap-2">
                                <template v-if="!item.is_deleted">
                                    <div @click="onUpdate(item)">
                                        <button class=" hover:bg-blue-600 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-blue-700 p-1">
                                            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                        </button>
                                    </div>

                                    <div @click="onDelete(item)">
                                        <button class="hover:bg-red-600 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-red-700 p-1">
                                            <font-awesome-icon icon="fa-solid fa-trash-can" />
                                        </button>
                                    </div>

                                </template>
                                <div v-else>
                                    <button class="hover:bg-blue-500 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-blue-400 p-1"
                                    @click="onRestore(item)">
                                        <font-awesome-icon icon="fa-solid fa-trash-can-arrow-up" />
                                    </button>
                                </div>
                            </div>
                    </template>
                </EasyDataTable>
            </div>
        </div>
        <MasterModal :modalPop="showModal" :showAdd="btnAdd" :showUpdate="btnUpdate" @close="closeModal" :data="content" />
    </MainLayout>
</template>

<script setup>
import MainLayout from '../../layout/MainLayout.vue';
import { masterStore } from '@/store/AssetStore/masterAssetStore';
import { onMounted,ref,watch }from "vue"
import MasterModal from '../../components/modal/assetManagementModal/MasterModal.vue';
import { info, infoWarning } from '../../service/notification';

const master = masterStore()
const dataMaster = ref([])
const loading = ref(false)
const search = ref()
const showModal = ref(false)
const btnAdd = ref(false)
const btnUpdate = ref(false)
const content = ref()
const is_deleted = ref()
const headers = [
    {   text : 'Name',
        value : 'name'
    },
    {   text : 'Code',
        value : 'category_code'
    },
    {   text : 'Status',
        value : 'status'
    },
    {   text : 'Action',
        value : 'action'
    }
]

const btnCreate = () => {
    showModal.value = true
    btnUpdate.value = false
    btnAdd.value = true
}


const getData = ()=>{
    loading.value = true
    const payload = {
        search: search.value,
        status : is_deleted.value
    }
    
    master.getMasterData(payload)
    .then(res => {
        dataMaster.value = res.result.content
    }).finally(()=>{
        loading.value = false
    })
}

const closeModal = (needRefresh) => {
    if (needRefresh) {
        getData()
    }

    showModal.value = false
}

const onUpdate = async (item) => {
    content.value = item
    showModal.value = true
    btnUpdate.value = true
    btnAdd.value = false
}

const onDelete = (item) => {
    master.deleteMaster(item.id)
        .then((res) => {
            infoWarning(res.message)
            getData()
        })
        .catch(error => console.log(error))
}
const onRestore = (item) => {
    master.restoreMaster(item.id)
        .then(res => {
            info(res.message)
            getData()
        })
}
watch(() =>[is_deleted.value,search.value], () => {
    getData()
})

onMounted(()=>{
    getData()
})
</script>

<style scoped>
    .customizing-table{
        --easy-table-header-background-color: #183D3D;
        --easy-table-header-font-color: #ffff;
        font-weight: 900;
    }
</style>
