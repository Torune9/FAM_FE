<template>
    <MainLayout>
        <div class="flex flex-col p-5">
            <div class="text-center text-3xl font-semibold text-slate-500">
                <h1>Master Asset</h1>
            </div>
            <div>
                <button class="p-2 bg-pencil rounded hover:bg-slate-400 text-white font-semibold mb-4" @click="btnCreate"> 
                    Add Master
                </button>
            </div>
            <div class="flex items-center">
                <label class="bg-red-600 w-20 p-1 rounded-tl rounded-bl text-center text-white" for="search"><small>search</small></label>
                <input v-model="search" class="outline-none border border-l-0 border-black rounded-tr rounded-br w-1/2 h-8 text-center" type="text" id="search">
            </div>
            <br>
            <div>
                <EasyDataTable table-class-name="customizing-table" :headers="headers" :items="dataMaster" :loading="loading"  alternating border-cell :rows-per-page=7 :rows-items=[7]  buttons-pagination>
                    <template #item-action ="item">
                        <div class="flex flex-row gap-2">
                                <template v-if="!item.is_deleted">
                                    <div @click="onUpdate(item)">
                                        <button class=" hover:bg-blue-600 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-blue-700">
                                            Edit
                                        </button>
                                    </div>

                                    <!-- <div @click="onDelete(item)">
                                        <button class=" text-white text-[font-size:8px] w-14 rounded bg-red-500">
                                            Delete
                                        </button>
                                    </div> -->

                                </template>
                                <!-- <div v-else><button class="bg-yellow-500 w-20 rounded text-white"
                                    @click="restore(item)">Restore</button></div> -->
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
import MasterModal from '../../components/modal/MasterModal.vue';

const master = masterStore()
const dataMaster = ref([])
const loading = ref(false)
const search = ref()
const showModal = ref(false)
const btnAdd = ref(false)
const btnUpdate = ref(false)
const content = ref()
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

onMounted(()=>{
    getData()
})

const btnCreate = () => {
    showModal.value = true
    btnUpdate.value = false
    btnAdd.value = true
}


const getData = ()=>{
    loading.value = true
    const payload = {
        search: search.value,
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

watch(() =>  search.value, () => {
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
