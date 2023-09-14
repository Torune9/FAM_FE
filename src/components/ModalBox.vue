<template>
    <Transition name="modal">
        <div class="fixed bottom-6 right-6" v-show="modalPop">
            <div v-if="modalPop" class=" bg-blueHunt w-80 h-60 rounded-md relative flex content-center justify-items-center shadow-lg flex-wrap">
                <div class="flex justify-center flex-wrap">
                    <label for="name" class="text-sm font-semibold text-white">Category name</label>
                    <input v-model.trim="payload.name" type="text" id="name" class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 focus:border-blue-600">
                </div>
                <div class="flex justify-center flex-wrap">
                    <label for="code" class="text-sm font-semibold text-white">Category code</label>
                    <input v-model.trim="payload.code" type="text" id="code" class="outline-none text-center border-2 border-slate-600 text-sm w-60 h-8 rounded-md font-semibold focus:border-2 focus:border-blue-600">
                </div>
                <button @click="category.addCategory(payload)"  class="absolute bottom-2 right-2 bg-green-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-green-500 transition-all" type="submit">submit</button>

                <button class="absolute -top-2 -left-2 text-white font-bold w-6 h-6 rounded-full bg-slate-900" @click="$emit('close-modal')">x</button>
            </div>
        </div>
    </Transition>
</template>

<script setup>
 import { categoryStore } from '../store/categoryStore';
    defineEmits(["close-modal"])
    defineProps({
        modalPop : {
            type : Boolean,
            default : false,
        }
    })
    const category = categoryStore()
    const payload ={
        code : '',
        name : ''
    }
    
</script>
<style scoped>
.modal-enter-active{
    transition : 0.2s ease-in;
}

.modal-enter-from{
    transform: scale(0);
}

</style>