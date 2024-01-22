<template>
    <BaseModal :showing="modalPop" :showAdd="showAdd" @close="close" :buttonText="text" @add="add" @update="update" :loading="loading">
        <template v-slot:content>
            <main v-if="modalPop" class="z-10">
                <div class="flex p-2 flex-col border items-center rounded max-[450px]:w-full">
                    <div>
                        <label for="name" class="font-bold text-sm">Name</label>
                        <br>
                        <input v-model="payload.name" id="name" type="text"
                            class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                    </div>
                    <div>
                        <label for="code" class="font-bold text-sm">Code</label>
                        <br>
                        <input v-model="payload.code" id="code" type="text"
                            class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                    </div>
                    <div v-if="showAdd">
                        <label for="price" class="font-bold text-sm">Price</label>
                        <br>
                        <input  v-model="payload.price" id="price" type="number"
                            class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                    </div>
                    <div v-else>
                        <label for="status" class="font-bold text-sm">Status</label>
                        <br>
                        <input v-model="payload.status" id="status" type="text"
                            class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                    </div>
                </div>
            </main>
        </template>
    </BaseModal>
</template>
<script setup>
import { masterStore } from '@/store/AssetStore/masterAssetStore';
import { reactive, watch,ref, watchEffect } from 'vue';
import BaseModal from './../BaseModal.vue';
import { infoSuccess,infoError } from '../../../service/commonService/notification';

const loading = ref(false)

const text = ref('')

const master = masterStore()

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
    price: '',
    status: ''
})
const add = async () => {
    loading.value = true

    await master.addMaster(payload)
        .then((res) => {
            infoSuccess(res.data.message)
            close(true)
        }).catch(error => {
            const { data: { message } } = error.response
            infoError(message)
        }).finally(()=> loading.value = false)

}
const update = async () => {
    loading.value = true
    const id = props.data.id;
    await master.updateMaster(id, payload)
        .then((res) => {
            infoSuccess(res.data.message)
            close(true)
        }).catch(error => {
            const { data: { message } } = error.response
            infoError(message)
        }).finally(()=> loading.value = false)

}
const emit = defineEmits(['close'])


const close = (needRefresh = false) => {
    emit("close", needRefresh)
}
watch(props,(a) => {
    if(a.showAdd){
        text.value = 'Submit'
        payload.code = ''
        payload.name = ''
        payload.price = ''
    }else{
        text.value = 'Update'
        payload.name = props.data.name
        payload.code = props.data.category_code
        payload.status = props.data.status
    }
})
watchEffect(() => props.modalPop)
</script>
