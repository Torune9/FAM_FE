<template>
    <MainLayout>
        <ConfirmModal :id="id" :showConfirm="showConfirm" @close="closeModal" @save="save" @reject="reject" />
        <div class="flex flex-col">
            <InspectModal :modalPop="showModal" :showAdd="btnInspect" @close="closeModal" :data="content" />

            <AssetModal :modalPop="showAsset" :showAdd="btnAdd" :showUpdate="btnUpdate" @close="closeModal"
                :data="content"  :title="title"/>

            <div class="text-center text-3xl font-semibold text-slate-500">
                <h1>Assets</h1>
            </div>
            <div>
                <button class="p-2 bg-pencil rounded hover:bg-slate-400 text-white font-semibold" @click="btnCreate">
                    Add Asset
                </button>
            </div>
            <div class="flex items-center mt-4">
                <label class="bg-red-600 w-20 p-1 rounded-tl rounded-bl text-center text-white" for="search">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </label>
                <input v-model="search"
                    class="outline-none border-2 focus:border-red-400 border-l-0 border-red-600 rounded-tr rounded-br w-1/2 h-8 pl-5"
                    type="text" id="search" placeholder="search asset...">
            </div>
            <br>
            <div class="flex items-center w-40 h-6 mb-3">
                <label class="mr-4 text-sm text-black font-semibold" for="not-active">Not Active</label>
                <input id="not-active" type="checkbox" v-model="is_deleted">
            </div>

            <div>
                <EasyDataTable table-class-name="customizing-table" :headers="headers" :items="items" :loading="loading"
                    alternating border-cell :rows-per-page=rows :rows-items=[rows] buttons-pagination>
                    <template #item-action="item">
                        <div class="flex flex-row gap-2">
                            <template v-if="!item.is_deleted">
                                <div @click="onUpdate(item)">
                                    <button
                                        class=" hover:bg-blue-600 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-blue-700 p-1">
                                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                    </button>
                                </div>


                                <div>
                                    <button @click="onInspect(item)"
                                        class=" hover:bg-sky-600 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-sky-700 p-1">
                                        <font-awesome-icon icon="fa-solid fa-file-circle-question" />
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
                                <button
                                class=" hover:bg-blue-500 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-blue-400 p-1"
                                    @click="onRestore(item)">
                                    <font-awesome-icon icon="fa-solid fa-trash-can-arrow-up" />
                                </button>
                            </div>
                        </div>
                    </template>
                    <template #item-countdown="items">
                        <div v-if="items.Histories.length > 0">
                            <div v-for="item of items.Histories" :key="item.id" class="p-1">
                                <vue3-flip-countdown mainColor="#FCF5ED" secondFlipColor="#F4BF96"
                                    :deadlineISO="item.inspection_date" labelSize="10px" countdownSize="15px" />
                            </div>
                        </div>
                        <div v-else class="flex justify-center items-center">
                            <font-awesome-icon icon="fa-regular fa-square-check" size="2xl" />
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
import { ref, onMounted, watch, watchEffect } from 'vue'
import { assetStore } from '@/store/AssetStore/assetStore'
import InspectModal from '../../components/modal/assetManagementModal/InspectModal.vue';
import AssetModal from '../../components/modal/assetManagementModal/AssetModal.vue';
import { info, infoWarning } from '../../service/commonService/notification';

const asset = assetStore()
const btnUpdate = ref(false)
const btnAdd = ref(false)
const content = ref()
const showModal = ref(false)
const showAsset = ref(false)
const btnInspect = ref(false)
const search = ref()
const is_deleted = ref()
const loading = ref(false)
const items = ref([])
const rows = 5
const showConfirm = ref(false)
const itemID = ref()
const id = ref()
const title = ref('')
const headers = [
    {
        text: "Name",
        value: "name"
    },
    {
        text: "status",
        value: "status"
    },
    {
        text: "Asset Code",
        value: "asset_code"
    },
    {
        text: "Category Code",
        value: "category_code"
    },
    {
        text: "Created By",
        value: "created_by"
    },
    {
        text: "Quantity",
        value: "quantity"
    },
    {
        text: "Action",
        value: "action"
    },
    {
        text: 'Countdown',
        value: 'countdown'
    }
]

const onInspect = (item) => {
    content.value = item
    showModal.value = true
}
const btnCreate = () => {
    title.value = 'Create New Asset'
    showAsset.value = true
    btnInspect.value = true
    btnAdd.value = true
    btnUpdate.value = false
}
const closeModal = (needRefresh) => {
    if (needRefresh) {
        getAsset()
    }
    showConfirm.value = false

    showModal.value = false
    showAsset.value = false
    id.value = 0
}
const getAsset = () => {
    const payload = {
        search: search.value,
        status: is_deleted.value
    }
    loading.value = true
    asset.getAsset(payload)
        .then(res => {
            items.value = res.result.data
        })
        .finally(() => {
            loading.value = false
        })
}
const onUpdate = async (item) => {
    title.value = 'Update Asset'
    content.value = item
    showAsset.value = true
    btnUpdate.value = true
    btnAdd.value = false
}

const showConfirmDelete = (item) => {
    showConfirm.value = !showConfirm.value
    itemID.value = item.id
}
const onRestore = (item) => {
    asset.restoreAsset(item.id)
        .then(res => {
            info(res.message)
            getAsset()
        })
}

const save = (event) => {
    id.value = +event.target.id
}
const reject = (event) => {
    id.value = +event.target.id
    closeModal(false)
}

const onDelete = (id)=>{
    asset.deleteAsset(id)
        .then((res) => {
            infoWarning(res.message)
            getAsset()
        }).finally(()=>{
            closeModal(false)
        })
}

onMounted(() => {
    getAsset()
})
watch(() => [is_deleted.value, search.value], () => {
    getAsset()
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
    --easy-table-header-background-color: #272121;
    --easy-table-header-font-color: #ffff;
    font-weight: 900;
}
</style>
