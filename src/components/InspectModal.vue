<template>
    <Transition name="modal">
        <main v-if="modalPop" class="h-screen w-screen fixed z-10">
        <div class="absolute bottom-24" v-show="modalPop">
            <div v-if="modalPop" class=" bg-slate-600 w-80 h-[400px] rounded-md relative flex  flex-wrap justify-center flex-col pl-4">
               <div class="absolute top-0 text-white font-semibold text-sm bg-slate-800 w-full left-0 flex rounded-t justify-center items-center h-10">
                <h1>Inspection asset : {{ props.data.name }}</h1>
               </div>
                <div>
                    <label class="text-white font-semibold text-sm" for="status">Status</label>
                    <br>
                    <select style="overflow-wrap: break-word;" v-model="payload.status" id="status" class="outline-none bg-black text-white w-60  h-8 rounded text-sm text-center focus:border-yellow-500 focus:border-2">
                        <option disabled value="">Please select status</option>
                        <option :value="data.status" v-for="data of status" :key="data" >{{ data.status }}</option>
                    </select>
                </div>
                <div>
                   <label class="text-white font-semibold text-sm" for="desc"> information</label>
                <br>
                <textarea v-model="payload.information" class="outline-none ring-2 ring-slate-700 focus:border-slate-600 focus:border-2 rounded p-2 text-sm text-black" id="desc" cols="40" rows="5"></textarea>
                </div>
                <button @click="create"  class="absolute bottom-2 right-2 bg-yellow-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-yellow-500 transition-all">create</button>

                <button class="absolute -top-2 -left-2 text-white font-bold w-7 h-7 rounded-full bg-red-600 hover:bg-red-500" @click="close(false)">x</button>
            </div>
        </div>
    </main>
    </Transition>
</template>

<script setup>
import {reactive} from "vue";


 import { useNotification } from "@kyvg/vue3-notification";
 import {ref,onMounted} from 'vue'
 import { assetStore } from "../store/assetStore";
 import {inspectStore} from '../store/inspectStore'

const notification = useNotification()
const asset = assetStore()
const inspect = inspectStore()


const InfoError = (message)=>{
    notification.notify({
        title:'Failed',
        text:message,
        type :'error'
    });
}

const InfoSuccess = (message)=>{
    notification.notify({
        title: 'Success',
        text:message,
        type :'success'
    });
}
const status = ref([])
const choice = ref('')
 const props = defineProps({
        modalPop : {
            type : Boolean,
        },
        showAdd : {
            type : Boolean,
        },
        showUpdate : {
            type : Boolean
        },
        data : {
            type : Object,
            default: () => {
                return {}
            }
        }
    })
    const emit = defineEmits(['close'])

    
    const payload = reactive({
        status : choice.value,
        information : '',
    })


    const getStatus = ()=>{
        asset.getStatus()
        .then(res=> {
            status.value = res.result.data
        })
    }
        
        const create = async ()=>{
            const code = props.data.asset_code
           
           await inspect.addInspect(code,payload)
           .then((res) => {
               InfoSuccess(res.data.message)
               close(true)
           })
           .catch(error => {
               const {data:{message}} = error.response
               InfoError(message)
           })
   }

    
    

    const close = (needRefresh = false) => {
        emit("close", needRefresh)
    }
    onMounted(()=>{
        getStatus()
    })
    
</script>
<style scoped>
.modal-enter-active{
    transition : 0.2s ease-in;
}

.modal-enter-from{
    transform: scale(0)
}


</style>