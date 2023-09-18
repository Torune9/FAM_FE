<template>
    <MainLayout>
        <div class="flex flex-col p-5">
            <div>
                <button class="p-2 bg-green-700 rounded text-zinc-200 font-semibold" @click="()=>{showModal=true
                btnUpdate = false
                btnAdd = true

                }"> Add Category </button>
            </div>
            <ModalBox :modal-pop="showModal" :showAdd="btnAdd" :showUpdate = "btnUpdate" @close="showModal=false" :data="content" ></ModalBox>
            <div class="mt-4">
                <input v-model="search" id="search" class="border-2 outline-none focus:border-red-300 rounded border-red-500 text-center text-sm w-[25%] h-8" placeholder="search" />
            </div>
            <br>
            <div>
                <EasyDataTable :headers="headers" :items="items" :loading="loading">
                    <template #item-action="item">
                        <div class="flex flex-row gap-2">
                            <template v-if="!item.is_deleted">
                                <div @click="()=>{showModal=true
                                btnUpdate = true
                                btnAdd = false
                                onUpdate(item)}"><button class=" text-white text-[font-size:8px] w-10 rounded bg-blue-400">Edit</button></div>
                                <div @click="onDelete(item)"><button class=" text-white text-[font-size:8px] w-14 rounded bg-red-500">Delete</button></div>
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
import ModalBox from '../../components/ModalBox.vue';

import { onMounted, ref, watch } from 'vue';

const category = categoryStore()
const showModal = ref(false)

const headers = [
    {
        text: "Code",
        value: "category_code"
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
const btnAdd = ref(false)
const btnUpdate = ref(false)
const content = ref()



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

    category.getCategory()
        .then(res => {
            items.value = res.result.content
        }).finally(() => {
            loading.value = false
        })

}


const onDelete = (item) => {
    category.deleteCategory(item.id)
        .then(() => getData())
}

const onUpdate = async (item) => {
    content.value =  item
}


</script>
