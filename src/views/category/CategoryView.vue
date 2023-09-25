<template>
    <MainLayout>
        <div class="flex flex-col p-5">
            <div>
                <button class="p-2 bg-green-500 rounded text-white font-semibold hover:bg-green-400" @click="btnCreate"> Add Category
                </button>
            </div>

            <ModalBox :modalPop="showModal" :showAdd="btnAdd" :showUpdate="btnUpdate" @close="closeModal" :data="content">
            </ModalBox>

            <div class="mt-4">
                <input v-model="search" id="search"
                class="border-2 outline-none focus:border-yellow-300 rounded border-yellow-500 text-center text-sm w-[25%] h-8"
                placeholder="search" />
            </div>

            <br>

            <div class="flex items-center">
                <label class="mr-4 text-sm" for="not-active">Not Active</label>
                <input id="not-active" type="checkbox" v-model="is_deleted">
            </div>

            <div>
                <EasyDataTable :headers="headers" :items="items" :loading="loading" alternating border-cell :rows-per-page=7 :rows-items=[7]  buttons-pagination>
                    <template #item-action="item">
                        <div class="flex flex-row gap-2">
                            <template v-if="!item.is_deleted">
                                
                                <div @click="onUpdate(item)">
                                    <button class=" text-white text-[font-size:8px] w-10 rounded bg-blue-400">
                                        Edit
                                    </button>
                                </div>

                                <div @click="onDelete(item)">
                                    <button class=" text-white text-[font-size:8px] w-14 rounded bg-red-500">
                                        Delete
                                    </button>
                                </div>

                            </template>

                            <div v-else>
                                <button @click="onRestore(item)" class="bg-yellow-500 w-20 rounded text-white">
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

import { categoryStore } from "@/store/categoryStore"
import ModalBox from '../../components/ModalBox.vue';

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
  type : 'warn'
});
}
const restoreInfo = (message)=>{
    notification.notify({
  title: message,
  type : 'success'
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
