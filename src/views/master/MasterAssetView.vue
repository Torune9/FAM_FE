<template>
    <MainLayout>
        <div class="flex flex-col p-5">
            <div>
                <button class="p-2 bg-green-500 rounded hover:bg-green-400 text-white font-semibold" @click="btnCreate"> 
                    Add Master
                </button>
            </div>
            <MasterModal :modalPop="showModal" :showAdd="btnAdd" :showUpdate="btnUpdate" @close="closeModal" :data="content"></MasterModal>
            <div class="mt-4">
                <input v-model="search" id="search"
                class="border-2 outline-none focus:border-yellow-300 rounded border-yellow-500 text-center text-sm w-[25%] h-8"
                placeholder="search" />
            </div>
            <br>
            <div>
                <EasyDataTable :headers="headers" :items="dataMaster" :loading="loading"  alternating border-cell :rows-per-page=7 :rows-items=[7]  buttons-pagination>
                    <template #item-action ="item">
                        <div class="flex flex-row gap-2">
                                <template v-if="!item.is_deleted">
                                    <div @click="onUpdate(item)">
                                        <button class=" text-white text-[font-size:8px] w-12 rounded bg-blue-400">
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
    </MainLayout>
</template>

<script setup>
import MainLayout from '../../layout/MainLayout.vue';
import { masterStore } from '../../store/masterAssetStore';
import { onMounted,ref,watch }from "vue"
import MasterModal from '../../components/MasterModal.vue';

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