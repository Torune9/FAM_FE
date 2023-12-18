<template>
    <Transition name="modal">
        <main v-if="modalPop" class="h-screen w-screen fixed z-10">
            <div class="absolute bottom-24 border" v-show="modalPop">
                <div v-if="modalPop"
                    class=" bg-white max-w-80 h-fit rounded-md relative flex  flex-wrap justify-center flex-col pl-4 pr-4 border border-black">
                    <div
                        class="absolute top-0 text-white font-semibold text-sm bg-slate-800 w-full left-0 flex rounded-t justify-center items-center h-10">
                        <h1>Inspection asset : {{ props.data.name }}</h1>
                    </div>
                    <div class="mt-10">
                        <label class="font-bold font-barlow text-sm" for="inspector">Inspector</label>
                        <br>
                        <input v-model="payload.inspector" type="text" name="inspector" id="inspector"
                            class="w-48 rounded h-8  text-black border-black border-2 text-sm text-center outline-none  focus:border-slate-700">
                    </div>
                    <div>
                        <label class="font-bold font-barlow text-sm" for="status">Status</label>
                        <br>
                        <input v-model="payload.status" type="text" name="status" id="status"
                            class="w-48 rounded h-8  text-black border-black border-2 text-sm text-center outline-none  focus:border-slate-700">
                    </div>
                    <div>
                        <label for="file" class="flex justify-center items-center bg-green-500 rounded mt-2 w-48 hover:bg-green-400 transition-all cursor-pointer border-2 border-green-600 p-2">
                            <font-awesome-icon icon="fa-solid fa-images" size="xl"/>
                        </label>
                        <input @change="setFile" ref="file" class="hidden" type="file" name="file" id="file">
                        <div v-if="fileUpload.length > 0" >
                            <div class="text-[10px] max-w-[70%] rounded bg-blue-500 p-1 mt-1 text-white relative" v-for="file,i of fileUpload" :key="i">
                               <p> {{ i+1 }}. {{ file.name }} </p>
                                <button @click="fileUpload.shift()" class="absolute -right-1 -top-1 text-slate-900 hover:text-red-700 cursor-pointer transition-all">
                                    <font-awesome-icon icon="fa-solid fa-circle-xmark" size="xl"/>
                                </button>
                            </div>
                            <figure class="absolute -right-[135px] bottom-0 w-32 overflow-hidden rounded border flex justify-center items-center p-1" >
                                <img :src="link" alt="source not found">
                            </figure>
                        </div>
                    </div>
                    <div>
                        <label class="font-bold font-barlow text-sm" for="desc">Information</label>
                        <br>
                        <textarea maxlength="255" v-model="payload.information" spellcheck="false"
                        class="outline-none ring-2 ring-black focus:border-slate-600 focus:border-2 rounded p-2 text-sm text-black font-bold min-[300px]:w-60"
                        id="desc" cols="40" rows="5">
                    </textarea>
                            <div class="text-sm -mt-2">
                                <small class="text-yellow-500 animate-pulse">&#42;{{ warnInfo }}</small>
                            </div>
                        </div>
                        <button @click="create($event)"
                        class="absolute sm:bottom-2 sm:right-2 bg-yellow-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-yellow-500 transition-all min-[300px]:-bottom-6 min-[300px]:-right-2">
                        <p v-if="!loading">Create</p>
                        <font-awesome-icon icon="fa-solid fa-spinner" class=" animate-spin" v-else/>
                    </button>
                        
                        <button
                        class="absolute -top-1 -left-1 text-red-600 hover:text-red-500 tranition-all duration-300"
                        @click="close(false)">
                            <font-awesome-icon icon="fa-solid fa-circle-xmark" size="xl"/>
                        </button>
                    </div>
                </div>
        </main>
    </Transition>
</template>

<script setup>

import { reactive,ref, watchEffect} from "vue";
import { inspectStore } from '@/store/AssetStore/inspectStore'
import { infoError,infoSuccess } from "../../../service/notification";

const warnInfo = ref('')
const loading = ref(false)
const link = ref('')
const file = ref(null)
const fileUpload = ref([])

const inspect = inspectStore()


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

const payload = reactive({
    status: '',
    inspector:'',
    information: '',
})


const close = (needRefresh = false) => {
    payload.information = ''
    payload.status = ''
    payload.inspector = ''
    file.value = []
    fileUpload.value = []
    emit("close", needRefresh)
}

const setFile = ()=>{
    const files = [...file.value.files]
    fileUpload.value = files
    link.value = URL.createObjectURL(fileUpload.value[0])
}


const create = async () => {
    const code = props.data.asset_code
    const formData = new FormData();
    loading.value = true

        fileUpload.value.forEach(file => {
            formData.append('files', file);
        });
        formData.append('status', payload.status);
        formData.append('inspector', payload.inspector);
        formData.append('information', payload.information);

    await inspect.addInspect(code,formData)
        .then((res) => {
            close(true)
            infoSuccess(res.data.message)
        })
        .catch(error => {
            const { data: { message } } = error.response
            infoError(message)
        }).finally(()=> {
            loading.value = false
            URL.revokeObjectURL(fileUpload.value)
        })
}
watchEffect(()=>{
    if (payload.information.length > 100) {
        warnInfo.value = 'Max is 255 character!'
    } else {warnInfo.value = ''}
})

</script>
<style scoped>
.modal-enter-active {
    transition: 0.2s ease-in;
}

.modal-enter-from {
    transform: scale(0)
}
</style>