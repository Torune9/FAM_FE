<template>
    <Transition name="master-modal">
        <main v-if="modalPop" class="h-screen w-screen fixed z-10">
            <div
                class=" absolute bottom-24 bg-white w-72 h-96 flex flex-col justify-center items-center rounded border border-black">
                <div class="mt-4" v-if="showAdd">
                    <label for="name" class="font-bold font-barlow text-sm">Name</label>
                    <br>
                    <input v-model="payload.name" id="name" type="text"
                        class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                </div>
                <div>
                    <label for="quantity" class="font-bold font-barlow text-sm">Quantity</label>
                    <br>
                    <input v-model="payload.quantity" id="quantity" type="number"
                        class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                </div>
                <div v-if="showAdd">
                    <label for="created" class="font-bold font-barlow text-sm">CreatedBy</label>
                    <br>
                    <input v-model="payload.created_by" id="created" type="text"
                        class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                </div>
                <div v-else>
                    <label for="status" class="font-bold font-barlow text-sm">Status</label>
                    <br>
                    <input v-model="payload.status" id="status" type="text"
                        class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                </div>
                <br>
                <div v-if="showAdd">
                    <select v-model="payload.code" name="category" id="category"
                        class="w-full outline-none focus:border-slate-700 focus:border-2 h-8 text-sm rounded bg-slate-600 text-white border-slate-800 border-2">
                        <option value="" disabled>Please select category</option>
                        <option :value="category.category_code" v-for="category of category" :key="category">
                            {{ category.category_name }}</option>
                    </select>
                </div>

                <div v-if="showAdd">
                    <button @click="add"
                        class="absolute bottom-2 right-2 bg-green-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-green-500 transition-all">
                        <p v-if="!loading">create</p>
                        <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-white/40" size="xl" v-else/>
                    </button>
                </div>
                <div v-else>
                    <button @click="update"
                        class="absolute bottom-2 right-2 bg-blue-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-blue-500 transition-all">
                        <p v-if="!loading">update</p>
                        <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-white/40" size="xl" v-else/>
                    </button>
                </div>

                <div>
                    <button class="absolute top-2 left-2 hover:text-red-700 text-black/40"
                        @click="close(false)">
                        <font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="xl"/>
                    </button>
                </div>
            </div>
        </main>
    </Transition>
</template>
<script setup>
import { reactive, watch } from 'vue';
import { assetStore } from '@/store/AssetStore/assetStore';
import { categoryStore } from '@/store/AssetStore/categoryStore';
import { onMounted, ref } from 'vue'
import {infoSuccess,infoError, infoWarning} from '../../../service/notification'

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
    }
})

const payload = reactive({
    code: '',
    name: '',
    quantity: '',
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
        .finally(()=> loading.value = false)

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
        .finally(()=>loading.value = false)

}

const emit = defineEmits(['close'])
const handleShowUpdate = () => {
    if (props.showUpdate) {
        payload.quantity = props.data.quantity
        payload.status = props.data.status
    } else {
        payload.name = ''
        payload.created_by = ''
        payload.quantity = ''
    }
}

const close = (needRefresh = false) => {
    emit("close", needRefresh)
}
watch(() => props.modalPop, handleShowUpdate)
onMounted(() => {
    getCategory()
})
</script>

<style scoped>.master-modal-enter-active {
    transition: 0.2s ease-in;
}

.master-modal-enter-from {
    transform: scale(0)
}</style>