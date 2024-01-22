<template>
    <MainLayout>
        <ConfirmModal :id="id" :showConfirm="showConfirm" @close="closeModal" @save="save" @reject="reject" />
        <div class="flex flex-col">
            <div class="text-center text-3xl font-semibold text-slate-500">
                <h1>Categories</h1>
            </div>
            <div>
                <button class="p-2 bg-pencil rounded text-white font-semibold hover:bg-slate-400" @click="btnCreate"> Add
                    Category
                </button>
            </div>

            <CategoryModal :modalPop="showModal" :showAdd="btnAdd" :showUpdate="btnUpdate" @close="closeModal" :data="content">
            </CategoryModal>

            <div class="flex items-center mt-4">
                <label class="bg-red-600 w-20 p-1 rounded-tl rounded-bl text-center text-white" for="search">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </label>
                <input v-model="search"
                    class="outline-none border-2 focus:border-red-400 border-l-0 border-red-600 rounded-tr rounded-br w-1/2 h-8 pl-5"
                    type="text" id="search" placeholder="search category...">
            </div>
            <br>

            <div class="flex items-center w-40 h-6 mb-3">
                <label class="mr-4 text-sm text-black font-semibold" for="not-active">Not Active</label>
                <input id="not-active" type="checkbox" v-model="is_deleted">
            </div>

            <div>
                <EasyDataTable table-class-name="customizing-table" :headers="headers" :items="items" :loading="loading"
                    alternating border-cell :rows-per-page=7 :rows-items=[7] buttons-pagination>
                    <template #item-action="item">
                        <div class="flex flex-row gap-2">
                            <template v-if="!item.is_deleted">

                                <div @click="onUpdate(item)">
                                    <button
                                        class=" hover:bg-blue-600 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-blue-700 p-1">
                                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                    </button>
                                </div>

                                <div @click="showConfirmDelete(item)">
                                    <button
                                        class=" hover:bg-red-600 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-red-700 p-1">
                                        <font-awesome-icon icon="fa-solid fa-trash-can" />
                                    </button>
                                </div>

                            </template>

                            <div v-else>
                                <button @click="onRestore(item)"
                                    class=" hover:bg-blue-500 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-blue-400 p-1">
                                    <font-awesome-icon icon="fa-solid fa-trash-can-arrow-up" />
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
import ConfirmModal from '../../components/modal/confirmModal/ConfirmModal.vue';

import { categoryStore } from "@/store/AssetStore/categoryStore"
import CategoryModal from '../../components/modal/assetManagementModal/CategoryModal.vue';

import { onMounted, ref, watch, watchEffect } from 'vue';
import { info, infoWarning } from '../../service/commonService/notification';

const category = categoryStore()
const items = ref([])
const search = ref()
const is_deleted = ref()
const loading = ref(false)
const showModal = ref(false)
const btnAdd = ref(false)
const btnUpdate = ref(false)
const content = ref()
const showConfirm = ref(false)
const id = ref()
const itemID = ref()

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


const showConfirmDelete = (item) => {
    showConfirm.value = !showConfirm.value
    itemID.value = item.id
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
           info(res.data.message)
        })
}


const closeModal = (needRefresh) => {
    if (needRefresh) {
        getData()
    }
    id.value = 0
    showConfirm.value = false
    showModal.value = false
}

const btnCreate = () => {
    showModal.value = true
    btnUpdate.value = false
    btnAdd.value = true
}

const save = (event) => {
    id.value = +event.target.id
}
const reject = (event) => {
    id.value = +event.target.id
    closeModal(false)
}

const onDelete= (id)=>{
    category.deleteCategory(id)
        .then((res) => {
            infoWarning(res.data.message)
            getData()
            closeModal(false)
        })
}

onMounted(() => {
    getData()
})
watchEffect(()=>{
    if (id.value == 1) {
       onDelete(itemID.value)
    }else{
        closeModal(false)
    }
})

</script>

<style scoped>
.customizing-table {
    --easy-table-header-background-color: #346751;
    --easy-table-header-font-color: #ffff;
    font-weight: 900;
}</style>
