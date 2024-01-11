<template>
    <Transition name="master-modal">
        <main v-if="modalPop" class="h-screen w-screen fixed z-10">
            <div class=" absolute bottom-24 min-w-[300px] bg-white flex flex-col rounded-md border border-black">
                <!-- Modal Header -->
                <section class="flex flex-row w-full border-b p-5">
                    <h1 class="font-bold text-xl">{{ title }}</h1>
                    <button @click="close(false)" class=" w-[40%] text-right text-black/40 hover:text-red-600 transition-all">
                        <font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="xl"/>
                    </button>
                </section>
                <!-- Main Modal -->
                <section class="p-5 flex flex-col gap-y-4">
                    <div class="flex flex-col gap-y-1" v-if="showAdd">
                        <label class="font-bold" for="name">Name</label>
                        <input placeholder="Type asset name" v-model=payload.name class="border border-slate-500 rounded-md w-full h-10 text-sm pl-2 font-semibold outline-none hover:border-slate-800" type="text" id="name" name="name">
                    </div>
                    <div class="flex flex-col gap-y-1" v-else>
                        <label class="font-bold" for="status">Status</label>
                        <input placeholder="Type asset status" v-model=payload.status class="border border-slate-500 rounded-md w-full h-10 text-sm pl-2 font-semibold outline-none hover:border-slate-800" type="text" id="status" name="status">
                    </div>

                    <div class="flex flex-row gap-x-3">
                        <div v-if="showAdd" class="flex flex-col gap-y-1">
                            <label for="createdBy" class="font-bold">createdBy</label>
                            <input placeholder="Type owner" v-model="payload.created_by" type="text" name="createdBy" id="createdBy" class="border border-slate-500 w-full h-10 text-sm pl-2 font-semibold outline-none hover:border-slate-800 rounded-md">
                        </div>
                        <div class="flex flex-col gap-y-1">
                            <label for="quanttiy" class="font-bold">Quantity</label>
                            <input v-model="payload.quantity" type="text" name="quantitiy" id="quantity" class="hidden">
                            <div class="flex flex-row justify-center items-center h-full rounded-md gap-2">
                                <button @click="minQuantity" class="bg-slate-500 rounded-md w-10 h-full">
                                    <font-awesome-icon icon="fa-solid fa-minus" />
                                </button>
                                <p class="w-5 text-center">{{ payload.quantity }}</p>
                                <button @click="plusQuantity" class="bg-slate-500 rounded-md w-10 h-full min-h-[40px]">
                                    <font-awesome-icon icon="fa-solid fa-plus" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="showAdd" class="flex flex-col gap-y-1">
                        <label class="font-bold" for="category">Category</label>
                        <select v-model="payload.code" name="category" id="category"
                            class="w-full outline-none focus:border-slate-700 focus:border-2 h-10 text-sm rounded-md bg-slate-500 text-white pl-2 cursor-pointer">
                            <option value="" disabled>Please select category</option>
                            <option :value="category.category_code" v-for="category of category" :key="category">
                                {{ category.category_name }}</option>
                        </select>
                    </div>
                </section>
                <!-- footer modal -->
                <section class="p-5">
                   <div class="w-full text-right" v-if="showAdd">
                        <button @click="add" class="bg-green-600 text-white h-10 w-28 rounded-md font-semibold hover:bg-green-500 transition-all duration-300">
                                <p v-if="!loading">Create</p>
                                <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-white/40" size="xl" v-else />
                        </button>
                        
                   </div>
                   <div class="w-full text-right" v-else>
                        <button @click="update" class="bg-blue-600 text-white h-10 w-28 rounded-md font-semibold hover:bg-blue-500 transition-all duration-300">
                                <p v-if="!loading">Update</p>
                                <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-white/40" size="xl" v-else />
                        </button>
                   </div>
                </section>
            </div>
        </main>
    </Transition>
</template>
<script setup>
import { reactive, watch, watchEffect } from 'vue';
import { assetStore } from '@/store/AssetStore/assetStore';
import { categoryStore } from '@/store/AssetStore/categoryStore';
import { onMounted, ref } from 'vue'
import { infoSuccess, infoError, infoWarning } from '../../../service/notification'

const categories = categoryStore()
const category = ref([])
const loading = ref(false)

const asset = assetStore()

const props = defineProps({
    modalPop: {
        type: Boolean,
    },
    showAdd: {
        type: Boolean,
    },
    showUpdate: {
        type: Boolean
    },
    data: {
        type: Object,
        default: () => {
            return {}
        }
    },
    title : {
        type : String
    }
})

const payload = reactive({
    code: '',
    name: '',
    quantity: 1,
    status: '',
    created_by: ''
})

const getCategory = () => {
    categories.getCategory().then(res => {
        const categories = res.result.content
        const sortCategories = categories.sort((a, b) => {
            let fa = a.category_name.toLowerCase(),
                fb = b.category_name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
        return category.value = sortCategories
    })
}

const add = async () => {
    loading.value = true
    await asset.addAsset(payload)
        .then((res) => {
            infoSuccess(res.data.message)
            close(true)
        }).catch(error => {
            const { data: { message } } = error.response
            infoError(message)
        })
        .finally(() => loading.value = false)

}
const update = async () => {
    loading.value = true
    const id = props.data.id;
    await asset.updateAsset(id, payload)
        .then((res) => {
            infoSuccess(res.data.message)
            close(true)
        }).catch(error => {
            const { data: { message } } = error.response
            infoWarning(message)
        })
        .finally(() => loading.value = false)

}

const emit = defineEmits(['close'])
const handleShowUpdate = () => {
    if (props.showUpdate) {
        payload.quantity = props.data.quantity
        payload.status = props.data.status
    } else {
        payload.name = ''
        payload.created_by = ''
        payload.quantity = 1
    }
}

const close = (needRefresh = false) => {
    emit("close", needRefresh)
}

const plusQuantity = () => payload.quantity++

const minQuantity = () => payload.quantity--

watch(() => props.modalPop, handleShowUpdate)
watchEffect(() => {
    if (payload.quantity < 0) {
        return payload.quantity = 0
    }
})

onMounted(() => {
    getCategory()
})
</script>

<style scoped>
.master-modal-enter-active {
    transition: 0.2s ease-in;
}

.master-modal-enter-from {
    transform: scale(0)
}
</style>