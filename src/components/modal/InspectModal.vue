<template>
    <Transition name="modal">
        <main v-if="modalPop" class="h-screen w-screen fixed z-10">
            <div class="absolute bottom-24" v-show="modalPop">
                <div v-if="modalPop"
                    class=" bg-slate-600 w-80 h-[400px] rounded-md relative flex  flex-wrap justify-center flex-col pl-4">
                    <div
                        class="absolute top-0 text-white font-semibold text-sm bg-slate-800 w-full left-0 flex rounded-t justify-center items-center h-10">
                        <h1>Inspection asset : {{ props.data.name }}</h1>
                    </div>
                    <div>
                        <label class="text-white font-semibold text-sm" for="status">Status</label>
                        <br>
                        <input v-model="payload.status" type="text" name="status" id="status"
                            class="w-48 rounded h-8 bg-blackCurrent border-slate-300 border-2 text-white text-sm text-center outline-none  focus:border-slate-400">
                    </div>
                    <div>
                        <label class="text-white font-semibold text-sm" for="desc">Information</label>
                        <br>
                        <textarea maxlength="255" v-model="payload.information" spellcheck="false"
                            class="outline-none ring-2 ring-slate-700 focus:border-slate-600 focus:border-2 rounded p-2 text-sm text-black font-bold"
                            id="desc" cols="40" rows="5"></textarea>
                            <div class="text-sm -mt-2">
                                <small class="text-yellow-500 animate-pulse">&#42;{{ warnInfo }}</small>
                            </div>
                        </div>
                        <button @click="create"
                        class="absolute bottom-2 right-2 bg-yellow-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-yellow-500 transition-all">create</button>
                        
                        <button
                        class="absolute -top-2 -left-2 text-white font-bold w-7 h-7 rounded-full bg-red-600 hover:bg-red-500"
                        @click="close(false)">x</button>
                    </div>
                </div>
        </main>
    </Transition>
</template>

<script setup>

import { reactive,ref, watchEffect } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { inspectStore } from '@/store/AssetStore/inspectStore'

const notification = useNotification()

const warnInfo = ref('')

const inspect = inspectStore()

const InfoError = (message) => {
    notification.notify({
        title: 'Failed',
        text: message,
        type: 'error'
    });
}

const InfoSuccess = (message) => {
    notification.notify({
        title: 'Success',
        text: message,
        type: 'success'
    });
}

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
    information: '',
})


const create = async () => {
    const code = props.data.asset_code

    await inspect.addInspect(code, payload)
        .then((res) => {
            InfoSuccess(res.data.message)
            close(true)
        })
        .catch(error => {
            const { data: { message } } = error.response
            InfoError(message)
        })
}




const close = (needRefresh = false) => {
    payload.information = ''
    payload.status = ''
    emit("close", needRefresh)
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