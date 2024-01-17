<template>
    <LoadingSpinner :show-load="loading" />
        <BaseLayoutAuth>
            <template #auth-slot>
                <div
                    class="h-[400px] w-[400px] max-[450px]:w-[350px] max-[450px]:h-[350px] bg-greyHunt rounded-md flex flex-col justify-center items-center text-zinc-100 shadow-lg shadow-black/60">
                    <p class="text-center w-full font-extrabold text-2xl">
                        Login Form
                    </p>
                    <br>
                    <br>
                    <form @submit.prevent="login">
                       <section class="flex flex-col">
                            <div>
                                <div class="h-14 relative group">
                                    <label for="username" class="absolute top-[5px] left-2 group-hover:text-slate-300">
                                        <span>
                                            <font-awesome-icon
                                            icon="fa-solid fa-user" />
                                        </span>
                                    </label>
                                <input type="text" id="username" name="username" v-model.trim="form.username" class="bg-transparent border border-slate-400 outline-none rounded-md w-64 h-9 pl-7 pr-2 text-[11px] text-white font-semibold group-hover:border-slate-600" placeholder="username"> 
                                <p class="text-[11px] text-center text-red-500 font-bold placeholder-white/70" v-for="error,index of v$.username.$errors" :key="index" >
                                    {{ `*${error.$message}` }}
                                </p>
                                </div>
                                <div class="h-14 relative group">
                                    <label for="password" class="absolute top-[5px] left-2 group-hover:text-slate-300">
                                        <span>
                                            <font-awesome-icon
                                            icon="fa-solid fa-lock" />
                                        </span>
                                    </label>
                                <input type="password" id="password" name="password" v-model.trim="form.password" class="bg-transparent border border-slate-400 outline-none rounded-md w-64 h-9 pl-7 pr-2 text-[11px] text-white font-semibold group-hover:border-slate-600" placeholder="password"> 
                                <p class="text-[11px] text-center text-red-500 font-bold placeholder-white/70" v-for="error,index of v$.password.$errors" :key="index" >
                                    {{ `*${error.$message}` }}
                                    </p>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="flex justify-center">
                                    <button class="h-9 bg-indigo-600 w-full rounded hover:bg-indigo-500 font-semibold transition-all">
                                        Login
                                    </button>
                                </div>
                                <br>
                                <div class="flex flex-row justify-center items-center gap-x-10">
                                    <p class="text-[10px] font-semibold hover:text-blue-500">
                                        <router-link to="forgot-password">
                                            Forgot password&#63;
                                        </router-link>
                                    </p>
                                    <button class="bg-blackCurrent text-[12px] p-2 font-semibold hover:bg-white hover:text-black rounded w-24 transition-all duration-300">
                                        <router-link to="/register">
                                            Register
                                        </router-link>
                                    </button>
                                </div>
                            </div>
                       </section>
                    </form>
                </div>
            </template>
        </BaseLayoutAuth>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { loginStore } from '@/store/UserStore/loginStore'
import { onMounted, reactive, computed, ref } from 'vue';
import LoadingSpinner from '../../components/utilComponent/LoadingSpinner.vue';
import {infoSuccess,infoError} from '../../service/notification'
import BaseLayoutAuth from '../../layout/BaseLayoutAuth.vue';

const auth = loginStore()
const loading = ref(false)

const form = reactive({
    username: '',
    password: '',
})


const rules = computed(() => {
    return {
        username: { required },
        password: { required }
    }
})
const v$ = useVuelidate(rules, form)


const login = async () => {
    v$.value.$touch()
    if (v$.value.$invalid) return
    loading.value = true
    auth.signIn(form,infoSuccess,infoError)
    .finally(()=> loading.value = false)
}

onMounted(() => {
    localStorage.clear()
    auth.eror = null
})
</script>