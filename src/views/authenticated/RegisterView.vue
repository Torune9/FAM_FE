<template>
    <main>
        <LoadingSpinner :show-load="loading" />
        <div class="flex justify-center items-center  w-screen h-screen">
            <div
                class="h-[400px] w-[400px] shadow-lg shadow-black/60 bg-indigo-500 rounded-md flex flex-wrap justify-center items-center text-black">
                <div class=" w-[20%]  mt-6 rounded-md bg-red-300 flex justify-center items-center text-red-600 h-8 absolute top-4"
                    v-if="auth.eror">
                    <small class=" font-bold">{{ auth.eror }}</small>
                </div>

                <p class="text-center text-white w-full font-extrabold text-2xl ">Register</p>
                <form @submit.prevent="register" class="grid grid-rows-4 h-44 gap-12 justify-items-center">

                    <div class="relative">
                        <label class="font-bold absolute top-7 left-2" for="username"><span><font-awesome-icon
                                    icon="fa-solid fa-user" /></span></label>
                        <br>
                        <input placeholder="username" type="text" name="username" id="username"
                            class="h-8 w-[270px] pl-7 pr-2 text-sm border-2 rounded-md text-black bg-transparent placeholder-black/70 font-bold border-black outline-none hover:border-white/50"
                            v-model.trim.trim="form.username">
                        <div class=" text-end text-sm text-yellow-300" v-for="error of v$.username.$errors"
                            :key="error.$uid">
                            <small>{{ '*' + error.$message }}</small>
                        </div>
                    </div>

                    <div class="relative">
                        <label class="font-bold absolute top-7 left-2" for="password"><span><font-awesome-icon
                                    icon="fa-solid fa-lock" /></span></label>
                        <br>
                        <div class="flex justify-center items-center group">
                            <input placeholder="password" name="password" :type="type" id="password"
                                class="w-[236px] pl-7 pr-2 text-sm border-2 h-8 rounded-tl-md font-bold text-black bg-transparent placeholder-black/70 rounded-bl-md border-black outline-none group-hover:border-white/50"
                                v-model.trim="form.password">
                            <button type="button" @click="showHide"
                                class="h-8 w-8 rounded-tr-md border-l-0 rounded-br-md border-2 border-black group-hover:border-white/50">
                                <span>
                                    <font-awesome-icon :icon="eye" />
                                </span>
                            </button>
                        </div>
                        <div class="text-end text-sm text-yellow-300" v-for="error of v$.password.$errors"
                            :key="error.$uid">
                            <small>{{ '*' + error.$message }}</small>
                        </div>
                    </div>
                    <div class="relative">
                        <label class="font-bold absolute top-7 left-2" for="email"><span><font-awesome-icon
                                    icon="fa-solid fa-envelope" /></span></label>
                        <br>
                        <input placeholder="email address" type="email" name="email" id="email"
                            class="w-[270px] pl-7 pr-2 text-sm border-2 h-8 rounded-md text-black bg-transparent placeholder-black/70 font-bold border-black outline-none hover:border-white/50"
                            v-model.trim="form.email">
                        <div class="text-end text-sm text-yellow-300" v-for="error of v$.email.$errors" :key="error">
                            <small>{{ '*' + error.$message }}</small>
                        </div>
                    </div>

                    <div class="flex justify-center items-center">
                        <button
                            class=" bg-blackCurrent w-[270px] h-9 mt-20 rounded-md text-white font-semibold hover:bg-slate-800">submit</button>
                    </div>

                </form>
                <p class=" w-full text-center text-sm font-bold underline underline-offset-2 text-white"><router-link
                        to="/">Login</router-link></p>
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