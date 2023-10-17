<template>
    <Transition name="attachment">
        <main v-if="showModal" class="absolute w-screen h-screen z-10">
            <div class="relative bg-white rounded shadow-lg overflow-hidden w-fit top-24 left-52">
                <div class="flex justify-center items-center bg-red-600 w-full h-8 text-sm text-white">
                    <h1>Create Attachment</h1>
                </div>
                <form @submit.prevent="createAttachment" enctype="multipart/form-data">
               <div class="p-2">
                <div>
                    <label for="inspector">
                        <small class="font-semibold">Inspector</small>
                    </label>
                    <br>
                    <input v-model="payload.inspector" class="border text-black font-semibold border-black rounded-[2px] text-[10px] w-48 text-center outline-none focus:border-slate-500 h-6" type="text" name="inspector" id="inspector">
                </div>
                <div>
                    <label for="file">
                        <small class="font-semibold">File</small>
                    </label>
                    <br>
                    <input ref="file" @change="changeFile" type="file" class="  file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-[12px] file:font-semibold
                    file:bg-blackCurrent file:text-violet-100
                    hover:file:bg-slate-800 hover:file:cursor-pointer">
                </div>
                <div class="mt-2">
                    <textarea v-model="payload.findings" class="border-2 rounded bg-blackCurrent text-[11px] text-white p-4 outline-none" name="attachment" id="attachment" cols="60" rows="5" placeholder="something..."></textarea>

                </div>
               </div>
                <button type="submit" class="bg-blackCurrent absolute bottom-1 right-1 rounded w-20 text-white text-sm border-2 border-white hover:bg-slate-500
                transition-all duration-200">
                    <small>
                        create
                    </small>
                </button>
                <button type="button" @click="close(false)" class="bg-red-600 absolute bottom-1 right-24 rounded w-20 text-white text-sm border-2
                hover:bg-red-400 transition-all duration-200 border-white">
                    <small>
                        close
                    </small>
                </button>
            </form>
            </div>
        </main>
    </Transition>
</template>

<script setup>
import { defineProps,defineEmits,reactive,ref } from 'vue';
import {inspectStore} from '@/store/inspectStore.js'
import { useNotification } from '@kyvg/vue3-notification';
const inspect = inspectStore()
const file = ref(null)
const fileInput = ref(null)
const message = ref('')
const  props = defineProps({
    showModal : {
        type : Boolean
    },
    data : {
        type : Object,
        default : ()=>{
            return {}
        }
    }
})

const emit = defineEmits(['close'])
const notification = useNotification()
const infoError = (message)=>{
    notification.notify({
    title : "Failed",
    text : message,
    type : 'error'
})
}
const InfoSuccess = (message)=>{
    notification.notify({
    title : "Failed",
    text : message,
    type : 'success'
})
}

const close = (needRefresh = false)=>{
    emit("close",needRefresh)
}

const changeFile = ()=>{
   fileInput.value = file.value.files[0]
}

const payload = reactive({
    inspector : '',
    findings  :'',
})

const createAttachment = ()=>{
    const code = props.data.asset_code
    const formData = new FormData();

    formData.append('files',fileInput.value);
    formData.append('inspector',payload.inspector);
    formData.append('findings',payload.findings);

    inspect.createAttachment(code,formData)
    .then((res)=>{
        close(false)
        console.log(res.data);
        InfoSuccess()
    }).catch(error => {
        message.value = error.response.data.message
        infoError(message.value)
    })
}

</script>

<style scoped>
.attachment-enter-active{
    transition : 0.2s ease;
}

.attachment-enter-from{
    transform: translateY(-200px)
}
.attachment-enter-to {
    transform: translateY(0px);
}
</style>