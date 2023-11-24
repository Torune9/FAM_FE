<template>
    <MainLayout>
        <div class="flex flex-col p-5">
            <div class="text-center text-3xl font-semibold text-slate-500">
                <h1>Categories</h1>
            </div>
            <div>
                <button class="p-2 bg-pencil rounded text-white font-semibold hover:bg-slate-400" @click="btnCreate"> Add Category
                </button>
            </div>

            <ModalBox :modalPop="showModal" :showAdd="btnAdd" :showUpdate="btnUpdate" @close="closeModal" :data="content">
            </ModalBox>

            <div class="flex items-center mt-4">
                <label class="bg-red-600 w-20 p-1 rounded-tl rounded-bl text-center text-white" for="search"><small>search</small></label>
                <input v-model="search" class="outline-none border-l-0 focus:border-red-400 border-2 border-red-600 rounded-tr rounded-br w-1/2 h-8 text-center" type="text" id="search">
            </div>

            <br>

            <div class="flex items-center w-40 h-6 mb-3">
                <label class="mr-4 text-sm text-black font-semibold" for="not-active">Not Active</label>
                <input id="not-active" type="checkbox" v-model="is_deleted">
            </div>

            <div>
                <EasyDataTable table-class-name="customizing-table" :headers="headers" :items="items" :loading="loading" alternating border-cell :rows-per-page=7 :rows-items=[7]  buttons-pagination>
                    <template #item-action="item">
                        <div class="flex flex-row gap-2">
                            <template v-if="!item.is_deleted">
                                
                                <div @click="onUpdate(item)">
                                    <button class=" hover:bg-blue-600 text-white transition-all duration-300 text-[font-size:8px] font-light w-10 rounded bg-blue-700">
                                        Edit
                                    </button>
                                </div>

                                <div @click="onDelete(item)">
                                    <button class=" hover:bg-red-400 text-white transition-all duration-300 text-[font-size:8px]  font-light w-14 rounded bg-red-500">
                                        Delete
                                    </button>
                                </div>

                            </template>

                            <div v-else>
                                <button @click="onRestore(item)" class=" bg-slate-600 w-20 rounded text-white font-light hover:bg-slate-500 transition-all duration-300">
                                    Restore
                                </button>
                            </div>
                        </div>
                    </template>
                </EasyDataTable>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../../layout/MainLayout.vue';

import { categoryStore } from "@/store/AssetStore/categoryStore"
import ModalBox from '../../components/modal/ModalBox.vue';

import { onMounted, ref, watch } from 'vue';
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification()

const category = categoryStore()
const items = ref([])
const search = ref()
const is_deleted = ref()
const loading = ref(false)
const showModal = ref(false)
const btnAdd = ref(false)
const btnUpdate = ref(false)
const content = ref()

const warnDelete = (message)=>{
    notification.notify({
  title: message,
  type : 'error'
});
}
const restoreInfo = (message)=>{
    notification.notify({
  title: message,
});
}

const headers = [
    {
        text: "Name",
        value: "category_name"
    },
    {
        text: "Code",
        value: "category_code"
    },
    {
        text: "Action",
        value: "action"
    }
]

watch(() => [is_deleted.value, search.value], () => {
    getData()
})
 
const getData = () => {

    loading.value = true

    const payload = {
        search: search.value,
        status: is_deleted.value
    }

    category.getCategory(payload)
        .then(res => {
            items.value = res.result.content
        }).finally(() => {
            loading.value = false
        })

}


const onDelete = (item) => {
    category.deleteCategory(item.id)
        .then((res) => {
            warnDelete(res.data.message)
            getData()})
}

const onUpdate = async (item) => {
    content.value = item
    showModal.value = true
    btnUpdate.value = true
    btnAdd.value = false
}
const onRestore = (item) => {
    category.restoreCategory(item.id)
        .then((res) => {
            getData()
            restoreInfo(res.data.message)
        })
}


const closeModal = (needRefresh) => {
    if (needRefresh) {
        getData()
    }

    showModal.value = false
}

const btnCreate = () => {
    showModal.value = true
    btnUpdate.value = false
    btnAdd.value = true
}



onMounted(() => {
    getData()
})


</script>

<style scoped>
    .customizing-table{
        --easy-table-header-background-color: #346751;
        --easy-table-header-font-color: #ffff;
        font-weight: 900;
    }
</style>
