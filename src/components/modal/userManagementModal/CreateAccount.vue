<template>
    <main  class="absolute flex justify-center items-center top-[20%] left-1/2 min-[300px]:right-[30%]">
        <Transition name="create">
            <form @submit.prevent="createAccount" v-if="isActive">
                <div class="z-20 p-4 rounded flex justify-center items-center flex-col gap-2 relative shadow-lg shadow-black/60 bg-white">
                    <h1 class="font-bold text-blue-800">Create Account</h1>
                    <div class="flex flex-col items-center group h-10">
                       <div class="flex items-center">
                        <label for="username" class="border border-black rounded-tl rounded-bl w-8 text-center">
                            <font-awesome-icon icon="fa-slid fa-user" size="sm"/>
                        </label>
                        <input v-model="payload.username" class="border border-l-0 group-hover:border-blue-700 p-2 text-black font-bold h-[26px] text-[11px] border-black outline-none w-48 rounded-tr rounded-br" type="text" name="username" id="username">
                       </div>
                        <p v-for="error,i of v$.username.$errors" :key="i" class="text-red-600 text-[10px]">
                            {{ error.$message }}</p>
                    </div>
                    <div class="flex flex-col items-center group h-10">
                       <div class="flex items-center">
                        <label for="password" class="border border-black rounded-tl rounded-bl w-8 text-center">
                            <font-awesome-icon icon="fa-slid fa-lock" size="sm"/>
                        </label>
                        <input v-model="payload.password" class="border border-l-0 group-hover:border-blue-700 p-2 text-black font-bold h-[26px] text-[11px] border-black outline-none w-48 rounded-tr rounded-br" type="password" name="password" id="password">
                       </div>
                        <p v-for="error,i of v$.password.$errors" :key="i" class="text-red-600 text-[10px]">
                    {{ error.$message }}</p>
                    </div>
                   
                    <div class="flex justify-end w-full">
                        <button class="bg-blue-600 hover:bg-blue-500 w-20 text-white rounded  hove:bg-blue-500 text-[11px] p-2">
                            create
                        </button>
                    </div>
                </div>
                <button type="button" class="absolute -top-2 -left-2 text-red-600 hover:text-red-500 h-fit w-fit z-20">
                    <font-awesome-icon @click="close(false)" icon="fa-solid fa-circle-xmark" size="lg" />
                </button>
            </form>
        </Transition>
    </main>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import {loginStore} from '../../../store/UserStore/loginStore'
import {useVuelidate} from '@vuelidate/core';
import { required } from '@vuelidate/validators';
const users = loginStore()
const notification = useNotification()
const infoSuccess = ()=>{
    notification.notify({
    title : 'Success',
    type : 'success'
})
}
defineProps({
    isActive : {
        type : Boolean
    }
})
const emits = defineEmits(['close'])
const close = (value)=>{
    emits('close',value)
}
const payload = reactive({
    username : '',
    password : '',
    email : 'new@gmail.com',
})
const rules = computed(()=>{
    return {
        password : {required},
        username : {required}
    }
})
const v$ = useVuelidate(rules,payload)
const createAccount = async ()=>{
    v$.value.$touch()
    if (v$.value.$invalid) return
    await users.signUp(payload,infoSuccess)
    close()
}
</script>

<style scoped>
    .create-enter-active{
        transition : opacity 0.1s linear;
    }
    .create-leave-active{
        transition : opacity 0.2s linear;
    }
    .create-enter-from{
        opacity: 0;
    }
    .create-enter-to{
        opacity: 100;
    }
    .create-leave-from{
        opacity: 50;
    }
    .create-leave-to{
        opacity: 0;
    }
</style>