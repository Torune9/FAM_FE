<template>
    <Transition name="attachment">
        <main v-if="showModal" class="absolute z-10">
            <div class="relative bg-white rounded shadow-lg overflow-hidden sm:w-fit top-24 md:left-52 min-[300px]:left-0 min-[300px]:w-3/4  min-[300px]:top-32">
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
                            <input v-model="payload.inspector"
                                class="border text-black font-semibold border-black rounded-[2px] text-[10px] w-48 text-center outline-none focus:border-slate-500 h-6"
                                type="text" name="inspector" id="inspector">
                        </div>
                        <div class="mb-2 mt-2">
                            <label for="file">
                                <div
                                    class="bg-green-500 text-white rounded w-32 h-12 flex justify-center items-center group cursor-pointer hover:bg-green-400 transition-all duration-200 hover:border hover:border-black">
                                    <small>
                                        Select a file
                                    </small>
                                </div>
                            </label>
                            <input multiple id="file" name="file" ref="file" @change="changeFile" type="file" class="file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0 hidden
                    file:text-[12px] file:font-semibold
                    file:bg-blackCurrent file:text-violet-100
                    hover:file:bg-slate-800 hover:file:cursor-pointer">
                        </div>

                        <div v-show="fileInput.length > 0" class=" max-h-28 max-w-[336px] overflow-auto ">
                            <ul>
                                <li class="bg-blue-500/20 relative m-1 pl-2 pr-2 border border-black font-semibold min-w-max h-8 rounded flex items-center text-[11px]"
                                    v-for="(file, index) in fileInput" :key="index">
                                    <small>
                                        {{ `${index + 1}. ` + file.name }}
                                    </small>
                                    <p v-if="file.invalidMessage" class="text-red-600">
                                        <small>&nbsp;-&nbsp;{{ file.invalidMessage }}</small>
                                    </p>
                                    <div @click="fileInput.splice(index, 1); uploadFiles.splice(index, 1)"
                                        class=" cursor-pointer hover:bg-red-400 absolute -right-1 -bottom-1 text-white font-semibold bg-red-600 rounded-full flex justify-center items-center w-4 h-4 border border-black">
                                        <small>x</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-2">
                            <textarea v-model="payload.findings"
                                class="border-2 rounded bg-blackCurrent text-[11px] text-white p-4 outline-none"
                                name="attachment" id="attachment" cols="60" rows="5" placeholder="something..."></textarea>
                        </div>
                    </div>
                    <button type="submit" class="bg-blackCurrent absolute bottom-1 right-1 rounded w-20 text-white text-sm border-2 border-white hover:bg-slate-500
                transition-all duration-200">
                        <small v-if="!loading">
                            create
                        </small>
                        <font-awesome-icon icon="fa-solid fa-spinner" class=" animate-spin" v-else/>
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
import { reactive, ref } from 'vue';
import { inspectStore } from '@/store/AssetStore/inspectStore.js'
import { infoError, infoSuccess } from '../../../service/notification';

const inspect = inspectStore()
const file = ref(null)
const fileInput = ref([])
const uploadFiles = ref([])
const message = ref('')
const props = defineProps({
    showModal: {
        type: Boolean
    },
    data: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

const loading = ref(false)

const emit = defineEmits(['close'])

const close = (needRefresh) => {
    fileInput.value = ''
    payload.findings = ''
    payload.inspector = ''
    fileInput.value = []
    uploadFiles.value = []
    emit("close", needRefresh)
}

const changeFile = () => {
    const files = [...file.value.files]
    uploadFiles.value = files
    fileInput.value = [...files.map(file => {
        return {
            name: file.name,
            size: file.size,
            type: file.type,
            invalidMessage: validateFile(file)
        }
    })]
}

const payload = reactive({
    inspector: '',
    findings: '',
})

const validateFile = (file) => {
    const type = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template"
    ]
    const MAX_SIZE = 1000000

    if (file.size > MAX_SIZE) {
        return `Max size is 1mb`
    }
    if (!type.includes(file.type)) {
        return `File is not .pdf or .doc`
    }
}

const createAttachment = () => {
    const code = props.data.asset_code
    const formData = new FormData();
    loading.value = true

    if (uploadFiles.value.length <= 0) {
        loading.value = false
        return infoError('File can be empty')
    } else {
        uploadFiles.value.forEach(file => {
            formData.append('files', file);
        });
        formData.append('inspector', payload.inspector);
        formData.append('findings', payload.findings);
        
        inspect.createAttachment(code, formData)
            .then((res) => {
                close(false)
                message.value = res.data.message
                infoSuccess(message.value)
            }).catch(error => {
                message.value = error.response.data.message
                infoError(message.value)
            }).finally(() => loading.value = false)
    }


}

</script>

<style scoped>
.attachment-enter-active {
    transition: 0.2s ease;
}

.attachment-enter-from {
    transform: translateY(-200px)
}

.attachment-enter-to {
    transform: translateY(0px);
}
</style>