<template>
    <LoadingSpinner :show-load="loading" />
    <main>
        <div class="flex justify-center items-center  w-screen h-screen">
            <div
                class="h-[400px] w-[400px] bg-blueHunt rounded-md flex flex-wrap justify-center items-center text-zinc-100 shadow-lg shadow-black/60">
                <div class=" w-[20%]  mt-6 rounded-md bg-red-300 flex justify-center items-center text-red-600 h-8 absolute top-4"
                    v-if="auth.eror">
                    <small class=" font-bold">{{ auth.eror }}</small>
                </div>
                <p class="text-center w-full font-extrabold text-2xl">Login Form</p>

                <form @submit.prevent="login" class="grid grid-rows-3 h-44 gap-10 justify-items-center">

                    <div class="relative">
                        <label class="absolute top-7 left-2" for="username"><span><font-awesome-icon
                                    icon="fa-solid fa-user" /></span></label>
                        <br>
                        <input placeholder="username" type="text" name="username" id="username"
                            class="h-8 w-[250px] hover:border-slate-600 pl-8 placeholder-white text-white text-sm border-2 rounded-md border-slate-200 bg-transparent outline-none focus:border-2 focus:border-slate-800"
                            v-model.trim.trim="form.username">
                        <div v-for="error of v$.username.$errors" :key="error.$uid">
                            <div class=" text-red-600"><small>{{ '*' + error.$message }}</small></div>
                        </div>
                    </div>

                    <div class="relative">
                        <label class="absolute top-7 left-2" for="password"><span><font-awesome-icon
                                    icon="fa-solid fa-lock" /></span></label>
                        <br>
                        <input placeholder="password" type="password" name="password" id="password"
                            class="w-[250px] hover:border-slate-600 pl-8 placeholder-white text-white text-sm border-2 h-8 rounded-md border-slate-200 bg-transparent outline-none focus:border-2 focus:border-slate-800"
                            v-model.trim="form.password">
                        <div v-for="error of v$.password.$errors" :key="error.$uid">
                            <div class=" text-red-600"><small>{{ '*' + error.$message }}</small></div>
                        </div>
                    </div>

                    <div class="flex justify-center items-center">
                        <button
                            class=" bg-redHunt w-[250px] h-9 mt-20 rounded-md text-white font-semibold hover:bg-red-400">Login</button>
                    </div>

                </form>
                <div class="w-full flex justify-center gap-x-4 items-center">
                    <div>
                        <p class="text-sm"><router-link to="/forgot-password">Forgot password ?</router-link></p>
                    </div>
                    <div
                        class="bg-blackCurrent w-20 h-8 flex justify-center items-center rounded hover:bg-white duration-300 transition-all hover:text-black ">
                        <p class="text-sm"><router-link to="/register">Register</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { loginStore } from '@/store/UserStore/loginStore'
import { onMounted, reactive, computed, ref } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import LoadingSpinner from '../../components/utilComponent/LoadingSpinner.vue';
const notification = useNotification()

const auth = loginStore()
const infoSuccess = () => {
    notification.notify({
        text: auth.message,
    })
}
const loading = ref(false)

const form = reactive({
    username: '',
    password: '',
})

onMounted(() => {
    localStorage.clear()
    auth.eror = null
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
    auth.signIn(form, infoSuccess)
        .finally(() => loading.value = false)
}

</script>