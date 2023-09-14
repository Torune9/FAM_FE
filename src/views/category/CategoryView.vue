<template>
    <MainLayout>
        <div class="flex flex-col p-5">
            <div>
                <button class="p-2 bg-gray-700 rounded text-yellow-500"> Add Category </button>
            </div>
            <div class="mt-4">
                <input v-model="search" class=" ring-gray-700 border rounded border-red-500" />
            </div>
            <div>
                <EasyDataTable :headers="headers" :items="items" :loading="loading">
                    <template #item-action="item">
                        <div class="flex flex-row gap-2">
                            <template v-if="!item.is_deleted">
                                <div @click="onEdit(item)">edit</div>
                                <div @click="onDelete(item)">delete</div>
                            </template>
                            <div v-else>restore</div>
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

import { onMounted, ref, watch } from 'vue';

const category = categoryStore()

const headers = [
    {
        text: "Code",
        value: "category_name"
    },
    {
        text: "Name",
        value: "category_name"
    },
    {
        text: "Action",
        value: "action"
    }
]

const items = ref([])
const search = ref()
const loading = ref(false)

watch(() => search.value, () => {

    setTimeout(() => {
        getData()
    }, 600);
})

onMounted(() => {
    getData()
})

const getData = () => {


    loading.value = true

    const payload = {
        search: search.value,
        page: 1,
        size: 25
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
        .then(() => {
            getData()
        })
}


</script>
