<template>
    <Transition name="master-modal">
        <main v-if="modalPop" class="h-screen w-screen fixed z-10">
            <div class=" absolute bottom-24 bg-blue-500 w-72 h-60 flex flex-col text-white items-center rounded" >
                <div class="mt-4">
                    <label for="" class="font-semibold text-sm">Name</label>
                    <br>
                    <input v-model="payload.name" type="text" class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                </div>
                <div>
                    <label for="" class="font-semibold text-sm">Code</label>
                    <br>
                    <input v-model="payload.code" type="text" class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                </div>
                <div v-if="showAdd">
                    <label for="" class="font-semibold text-sm">Price</label>
                    <br>
                    <input v-model="payload.price" type="text" class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                </div>
                <div v-else>
                    <label for="" class="font-semibold text-sm">Status</label>
                    <br>
                    <input v-model="payload.status" type="text" class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 text-black focus:border-blue-600">
                </div>
                <div v-if="showAdd">
                    <button @click="add" class="absolute bottom-2 right-2 bg-green-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-green-500 transition-all">
                        create
                    </button>
                </div>
                <div v-else>
                    <button @click="update"  class="absolute bottom-2 right-2 bg-blue-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-green-500 transition-all">update</button>
                </div>

                <div>
                    <button class="bg-slate-700 rounded-full w-7 h-7 absolute -top-2 -left-2 font-bold" @click="close(false)">
                        x 
                    </button>
                </div>
            </div>
        </main>
    </Transition>
</template>
<script setup>
import { masterStore } from '../store/masterAssetStore';
import { reactive,watch} from 'vue';
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification()

const master = masterStore()
const info = (message)=>{
    notification.notify({
        title:message,
        type :message.includes('updated') ? 'success' : 'error'
    });
}

const success = (message)=>{
    notification.notify({
        title: message,
        type : message.includes('Success') ? 'success' : 'error'
    });
}

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
const payload = reactive({
    code : '',
    name : '',
    price : '',
    status: ''
    })
const add = async ()=>{
       
       await master.addMaster(payload)
       .then((res) => {
           success(res.data.message)
           close(true)
       })
       
   }
const update = async () =>{

       const id = props.data.id;
       await master.updateMaster(id,payload)
       .then((res) => {
            info(res.data.message)
           close(true)
       })
     
   }
const emit = defineEmits(['close'])
const handleShowUpdate = ()=> {
        if(props.showUpdate){
                payload.name = props.data.name
                payload.code = props.data.category_code
                payload.status = props.data.status
            }else{
                payload.code = ''
                payload.name = ''
                payload.price = ''
            }
    }

const close = (needRefresh = false) => {
            emit("close", needRefresh)
        }
        watch(()=> props.modalPop,handleShowUpdate )
</script>

<style scoped>
.master-modal-enter-active{
    transition : 0.2s ease-in;
}

.master-modal-enter-from{
    transform: scale(0)
}

</style>