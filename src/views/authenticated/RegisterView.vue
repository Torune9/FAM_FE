<template>
    <LoadingSpinner :show-load="loading" />
    <main>
        <div class="flex justify-center items-center w-screen h-screen">
            <div class=" w-[20%] mt-6 rounded-md bg-red-300 flex justify-center items-center text-red-600 h-8 absolute top-4"
                v-if="auth.eror">
                <small class=" font-bold">{{ auth.eror }}</small>
            </div>
            <div
                class="h-[400px] w-[400px] max-[450px]:w-[350px] max-[450px]:h-[350px] bg-greyHunt rounded-md flex flex-col justify-center items-center text-zinc-100 shadow-lg shadow-black/60">
                <p class="text-center w-full font-extrabold text-2xl  max-[450px]:text-lg">
                    Register
                </p>
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
                                        icon="fa-solid fa-envelope" />
                                    </span>
                                </label>
                            <input type="email" id="email" name="email" v-model.trim="form.email" class="bg-transparent border border-slate-400 outline-none rounded-md w-64 h-9 pl-7 pr-2 text-[11px] text-white font-semibold group-hover:border-slate-600" placeholder="email"> 
                            <p class="text-[11px] text-center text-red-500 font-bold placeholder-white/70" v-for="error,index of v$.email.$errors" :key="index" >
                                {{ `*${error.$message}` }}
                                </p>
                            </div>
                            <div class="h-14 relative group flex w-64 flex-wrap gap-x-1">
                                <label for="password" class="absolute top-[5px] left-2 group-hover:text-slate-300">
                                    <span>
                                        <font-awesome-icon
                                        icon="fa-solid fa-lock" />
                                    </span>
                                </label>
                            <input :type="type" id="password" name="password" v-model.trim="form.password" class="bg-transparent border border-slate-400 outline-none rounded-md w-[218px] h-9 pl-7 pr-2 text-[11px] text-white font-semibold group-hover:border-slate-600" placeholder="password">
                            <button @click="showHide" class="inline-block border border-slate-400 hover:text-slate-300 w-8 h-9 rounded-md">
                                <font-awesome-icon :icon="eye"/>
                            </button>
                            <p class="text-[11px] w-full text-center text-red-500 font-bold placeholder-white/70" v-for="error,index of v$.password.$errors" :key="index" >
                                {{ `*${error.$message}` }}
                                </p>
                            </div>
                        </div>
                        <br>
                        <div>
                            <div class="flex justify-center">
                                <button @click="register" class="h-9 bg-indigo-600 w-full rounded hover:bg-indigo-500 font-semibold transition-all">
                                    Register
                                </button>
                            </div>
                            <br>
                            <p class="w-full text-center max-[450px]:text-sm hover:text-blue-300 font-bold underline">
                                <router-link to="/login">
                                    Back
                                </router-link>
                            </p>
                        </div>
                   </section>
                </form>
            </div>
        </div>
    </main>
</template>
  
<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { loginStore } from '@/store/UserStore/loginStore'
import { onMounted, reactive, computed, ref } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import LoadingSpinner from '../../components/utilComponent/LoadingSpinner.vue';

const notification = useNotification()
const loading = ref(false)
const type = ref('password')
const showHide = () => {
    type.value = type.value === "password" ? "text" : "password"
    eye.value = eye.value === "fa-solid fa-eye" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
}
const eye = ref("fa-solid fa-eye")

const auth = loginStore()
const InfoSuccess = () => {
    notification.notify({
        text: auth.message,
        type: 'success'
    })
}

const form = reactive({
    username: '',
    password: '',
    email: ''
})

onMounted(() => {
    localStorage.clear()
    auth.eror = null
})

const rules = computed(() => {
    return {
        username: { required },
        password: {
            required,
            minLength: minLength(8)
        },
        email: { required }
    }
})
const v$ = useVuelidate(rules, form)

const register = () => {
    v$.value.$touch()
    if (v$.value.$invalid) return
    loading.value = true
    auth.signUp(form, InfoSuccess)
        .finally(() => {
            loading.value = false
        })
}

</script>