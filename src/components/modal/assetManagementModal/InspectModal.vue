<template>
    <Transition name="modal">
        <main v-if="modalPop"
            class="h-screen w-screen z-50 fixed top-20 max-[400px]:z-50 max-[700px]:left-5 max-[600px]:top-28 max-[800px]:left-60">
            <div
                class="text-white font-semibold text-sm bg-slate-800 left-0 flex rounded-t justify-center items-center h-10 w-[400px] max-[400px]:w-[350px]">
                <h1>Inspection asset : {{ props.data.name }}</h1>
            </div>
            <div class=" relative w-fit max-[400px]:max-h-[550px] max-h-[430px] overflow-y-auto" v-show="modalPop">
                <div v-if="modalPop"
                    class=" bg-white w-[400px] max-[400px]:w-[350px]  relative flex overflow-y-auto overflow-x-hidden justify-center flex-col pl-4 pr-4 border border-black border-t-0">
                    <div>
                        <label for="status" class="hidden"/>
                        <br>
                        <select class="border-2 font-black outline-none focus:border-blue-600 border-black/50 p-1 rounded" v-model="payload.status" name="status" id="status">
                            <option disabled value="">Please select status</option>
                            <option :value="data.status" v-for="data, i of status" :key="i">
                                {{ data.status }}
                            </option>
                        </select>
                    </div>
                    <!-- Optional input if want replace the select input -->
                    <!-- <div>
                        <label class="font-bold font-barlow text-sm" for="status">Status</label>
                        <br>
                        <input v-model="payload.status" type="text" name="status" id="status"
                            class="w-48 rounded h-8  text-black border-black border-2 text-sm text-center outline-none  focus:border-slate-700">
                    </div> -->
                    <div class="border border-black/50 h-fit w-80 p-2 rounded  flex justify-center items-center mt-4">
                        <PictureInspect @save="save" />
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

                    <div v-show="fileInput.length > 0" class="h-20 overflow-auto">

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
                    <div class="w-full flex justify-end mb-2">
                        <button @click="create($event)"
                            class="bg-yellow-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-yellow-500 transition-all min-[300px]:-bottom-6 min-[300px]:-right-2">
                            <p v-if="!loading">Create</p>
                            <font-awesome-icon icon="fa-solid fa-spinner" class=" animate-spin" v-else />
                        </button>
                    </div>
                </div>
            </div>

            <button class="absolute -top-1 -left-1 text-red-600 hover:text-red-500 tranition-all duration-300"
                @click="close(false)">
                <font-awesome-icon icon="fa-solid fa-circle-xmark" size="xl" />
            </button>
        </main>
    </Transition>
</template>

<script setup>

import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { inspectStore } from '@/store/AssetStore/inspectStore'
import { loginStore } from '@/store/UserStore/loginStore'
import { infoError, infoSuccess } from "../../../service/commonService/notification";
import { assetStore } from '@/store/AssetStore/assetStore'
import PictureInspect from "../../camera/PictureInspect.vue";
import dataURLtoFile from '../../../service/fileService/fileToUrl'
import validateFile from '../../../service/fileService/validateFile'

const warnInfo = ref('')
const loading = ref(false)
const image = ref([])

const inspect = inspectStore()
const user = loginStore()
const asset = assetStore()

const file = ref(null)
const fileInput = ref([])
const uploadFiles = ref([])
const status = ref([])

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
    status:'',
    statusCode : '',
    inspector: user.user.username,
    information: '',
})



const close = (needRefresh = false) => {
    payload.information = ''
    payload.status = ''
    payload.statusCode = ''
    fileInput.value = []
    file.value = []
    uploadFiles.value = []
    emit("close", needRefresh)
}

const save = (data) => {
    image.value.push(data)

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

const create = async () => {
    const id = props.data.id
    const code = props.data.asset_code
    const formData = new FormData()
    if (image.value.length > 0) {
        image.value.forEach((image, index) => {
            formData.append('files', dataURLtoFile(image, `image${index + 1}.png`));
        });
    }else{
        return infoError('File can be empty')
    }

    uploadFiles.value.forEach(file => {
        formData.append('files', file);
    });
    formData.append('status', payload.status);
    formData.append('inspector', payload.inspector);
    formData.append('information', payload.information);
    formData.append('statusCode', payload.statusCode);
    loading.value = true
    await inspect.createAttachment(id, code, formData)
        .then((res) => {
            close(true)
            infoSuccess(res.data.message)
        })
        .catch(error => {
            const { data: { message } } = error.response
            infoError(message)
        }).finally(() => {
            loading.value = false
            image.value = []
        })
}

const getStatus = () => {
    asset.getStatus()
        .then(res => {
            const { data } = res.result
            status.value = data
        })
        .catch(error => console.log(error))
}

const statusCode = ( datas )=>{
    datas.forEach(data=>{
        if (data.status == payload.status) {
           payload.statusCode = data.status_code
        }
    })
}

onMounted(() => {
    getStatus()
})

watch(()=>[payload.status],()=>{
    statusCode(status.value)
})

watchEffect(() => {
    if (payload.information.length > 100) {
        warnInfo.value = 'Max is 255 character!'
    } else { warnInfo.value = '' }
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