<template>
    
    <Transition name="confirm">
    <div v-if="showDialogue" class="z-10 fixed w-screen h-screen">
            <div class=" bg-white absolute rounded w-80 h-36 text-black flex flex-col justify-center items-center shadow-lg overflow-hidden p-2 left-64 top-20">
            
                <h1 class="absolute top-0 left-0 p-2 text-sm bg-blue-600 w-full text-white">Are you sure ?</h1>
                    <hr>
                <small class="font-bold">This will permanently delete <span class=" text-red-600">{{ data.name }}</span></small>
                <div class="absolute bottom-2 right-2 text-sm ">
                    <button @click="_cancel(false)" class="bg-red-600 hover:bg-red-500 duration-300 transition-all text-white w-16 rounded">
                        Cancel
                    </button>
                    <button @click="_confirm(false,$event)" :value="confirm" class="bg-blue-600 hover:bg-blue-500 duration-300 transition-all text-white w-16 rounded ml-2">
                        Ok
                    </button>

                </div>
            </div>
        </div>
    </Transition>
</template>


<script setup>
import {defineProps,defineEmits} from "vue"
import {assetStore} from '@/store/assetStore'
const confirm = true
const asset = assetStore()
const props = defineProps({
    showDialogue : {
        type : Boolean
    },
    confirmData : {
        type : Boolean,
    },
    data :{
        type : Object,
    }
})
const emit = defineEmits(['close'])
const close  = (needRefresh,value)=>{
    emit("close",[needRefresh,value])
}

const _confirm = async (needRefresh,event)=>{
    const value = event.target.value
    await asset.trueDeleted(props.data.id)
        .then(() =>{
            if (value) {
                close(needRefresh,value)
            }
        })
    }
    
 
const _cancel = (needRefresh)=> {
    emit("close", [needRefresh])
    }

</script>

<style scoped>
.confirm-enter-active{
    transition : 0.2s ease-in;
}

.confirm-enter-from{
    transform: translateY(-200px)
}
.confirm-enter-to {
    transform: translateY(0px);
}

</style>