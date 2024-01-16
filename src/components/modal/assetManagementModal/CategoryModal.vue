<template>
    <Transition name="modal">
        <main v-if="modalPop" class="h-screen w-screen fixed z-10">
            <div class="absolute bottom-24" v-show="modalPop">
                <div v-if="modalPop"
                    class=" bg-white border border-black sm:w-80 h-60 rounded-md relative flex content-center justify-items-center shadow-lg flex-wrap min-[300px]:w-72">
                    <div class="flex justify-center flex-wrap mb-2">
                        <label for="name" class="text-sm font-bold">Category name</label>
                        <input v-model="payload.name" type="text" id="name"
                            class="outline-none text-center border-2 border-black text-sm w-60 h-8 rounded-md font-semibold focus:border-2 focus:border-blue-800">
                    </div>
                    <div class="flex justify-center flex-wrap">
                        <label for="code" class="text-sm font-bold">Category code</label>
                        <input v-model="payload.code" type="text" id="code"
                            class="outline-none text-center border-2 border-black text-sm w-60 h-8 rounded-md font-semibold focus:border-2 focus:border-blue-800">
                    </div>
                    <button v-if="showAdd" @click="add"
                        class="absolute bottom-2 right-2 bg-green-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-green-500 transition-all">
                        <p v-if="!loading">create</p>
                        <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-white/40" size="xl" v-else/>
                    </button>

                    <button v-else @click="update"
                        class="absolute bottom-2 right-2 bg-blue-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-blue-500 transition-all">
                        <p v-if="!loading">create</p>
                        <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-white/40" size="xl"  v-else/>
                    </button>

                    <button class="absolute top-2 left-2 text-black/40 hover:text-red-700"
                        @click="close(false)">
                        <font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="lg"/>
                    </button>
                </div>
            </div>
        </main>
    </Transition>
</template>

<script setup>
import { watch, reactive,ref } from "vue";
import { categoryStore } from '@/store/AssetStore/categoryStore';
import { infoSuccess,infoError } from "../../../service/notification";

const loading = ref(false)

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
const emit = defineEmits(['close'])

const category = categoryStore()
const payload = reactive({
    code: '',
    name: '',
})

const handleShowUpdate = () => {
    if (props.showUpdate) {
        payload.name = props.data.category_name
    } else {
        payload.code = ''
        payload.name = ''
    }
}

const add = async () => {
    loading.value = true

    await category.addCategory(payload)
        .then((res) => {
            infoSuccess(res.data.message)
            close(true)
        })
        .catch(error => {
            const { data: { message } } = error.response
            infoError(message)
        }).finally(() => loading.value = false)

}
const update = async () => {
    loading.value = true
    const id = props.data.id;
    await category.updateCategory(id, payload)
        .then((res) => {
            infoSuccess(res.data.message)
            close(true)
        }).catch(error => {
            const { data: { message } } = error.response
            infoError(message)
        }).finally(() => loading.value = false)

}

const close = (needRefresh = false) => {
    emit("close", needRefresh)
}

watch(() => props.modalPop, handleShowUpdate)

</script>
<style scoped>
.modal-enter-active {
    transition: 0.2s ease-in;
}

.modal-enter-from {
    transform: scale(0)
}</style>