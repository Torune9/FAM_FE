<template>
    <MainLayout>
        <div class="flex flex-col p-5">
            <div>
                <button class="p-2 bg-green-500 rounded hover:bg-green-400 text-white font-semibold" @click="btnCreate">
                    Add Asset
                </button>
            </div>

            <InspectModal :modalPop="showModal" :showAdd="btnInspect" @close="closeModal" :data="content" />

            <AssetModal :modalPop="showAsset" :showAdd="btnAdd" :showUpdate="btnUpdate" @close="closeModal"
                :data="content" />


            <div class="flex items-center mt-4">
                <label class="bg-red-600 w-20 p-1 rounded-tl rounded-bl text-center text-white"
                    for="search"><small>search</small></label>
                <input v-model="search"
                    class="outline-none border-2 focus:border-red-400 border-l-0 border-red-600 rounded-tr rounded-br w-1/2 h-8 text-center"
                    type="text" id="search">
            </div>
            <br>
            <div class="flex items-center w-40 h-6 mb-3">
                <label class="mr-4 text-sm text-black font-semibold" for="not-active">Not Active</label>
                <input id="not-active" type="checkbox" v-model="is_deleted">
            </div>

            <div>
                <EasyDataTable table-class-name="customizing-table" :headers="headers" :items="items" :loading="loading"
                    alternating border-cell :rows-per-page=6 :rows-items=[6] buttons-pagination>
                    <template #item-action="item">
                        <div class="flex flex-row gap-2">
                            <template v-if="!item.is_deleted">
                                <div @click="onUpdate(item)">
                                    <button
                                        class=" hover:bg-blue-600 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-blue-700">
                                        Edit
                                    </button>
                                </div>

                                <div @click="onDelete(item)">
                                    <button
                                        class="hover:bg-red-500 transition-all duration-300 text-white font-light text-[font-size:8px] w-14 rounded  bg-red-600">
                                        Delete
                                    </button>
                                </div>

                                <div>
                                    <button @click="onInspect(item)"
                                        class="bg-blue-500 rounded w-14 text-white font-light ">
                                        Inpect
                                    </button>
                                </div>
                            </template>
                            <div v-else>
                                <button class="bg-indigo-700 w-20 rounded text-white" @click="onRestore(item)">
                                    Restore
                                </button>
                            </div>
                        </div>
                    </template>
                    <template #item-countdown="item">
                        <div v-for="item of item.Histories" :key="item.id" class="p-1">
                            <vue3-flip-countdown mainColor="#FCF5ED" secondFlipColor="#F4BF96"
                                :deadlineISO="item.inspection_date" labelSize="10px" countdownSize="15px" />
                        </div>
                    </template>
                </EasyDataTable>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>

import MainLayout from '../../layout/MainLayout.vue';
import { ref, onMounted, watch } from 'vue'
import { assetStore } from '@/store/AssetStore/assetStore'
import InspectModal from '../../components/modal/InspectModal.vue';
import AssetModal from '../../components/modal/AssetModal.vue';
import { useNotification } from '@kyvg/vue3-notification';

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
const notification = useNotification()
const items = ref([])
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
const warnDelete = (message) => {
    notification.notify({
        title: message,
        type: 'error'
    });
}
const restoreInfo = (message) => {
    notification.notify({
        title: message,
    });
}

const onInspect = (item) => {
    content.value = item
    showModal.value = true
}
const btnCreate = () => {
    showAsset.value = true
    btnInspect.value = true
    btnAdd.value = true
    btnUpdate.value = false
}
const closeModal = (needRefresh) => {
    if (needRefresh) {
        getAsset()
    }

    showModal.value = false
    showAsset.value = false
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
    content.value = item
    showAsset.value = true
    btnUpdate.value = true
    btnAdd.value = false
}
const onDelete = (item) => {
    asset.deleteAsset(item.id)
        .then((res) => {
            warnDelete(res.message)
            getAsset()
        })
}
const onRestore = (item) => {
    asset.restoreAsset(item.id)
        .then(res => {
            restoreInfo(res.message)
            getAsset()
        })
}

onMounted(() => {
    getAsset()
})
watch(() => [is_deleted.value, search.value], () => {
    getAsset()
})

</script>

<style scoped>
.customizing-table {
    --easy-table-header-background-color: #f6cd00;
    --easy-table-header-font-color: #000000;

    --easy-table-body-row-background-color: #fff759;
    --easy-table-body-row-hover-background-color: #f5ff33;
    --easy-table-body-row-hover-font-color: black;
    --easy-table-border: 1px solid #445269;
    --easy-table-row-border: 1px solid #445269;

    font-weight: 900;
}
</style>
