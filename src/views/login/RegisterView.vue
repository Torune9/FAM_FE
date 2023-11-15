<template>
    <main>
        <LoadingSpinner :show-load="loading" />
        <div class="flex justify-center items-center  w-screen h-screen">
            <div
                class="h-[400px] w-[400px] bg-blueHunt rounded-md flex flex-wrap justify-center items-center text-zinc-200">
                <div class=" w-[20%]  mt-6 rounded-md bg-red-300 flex justify-center items-center text-red-600 h-8 absolute top-4"
                    v-if="auth.eror">
                    <small class=" font-bold">{{ auth.eror }}</small>
                </div>

                <p class="text-center w-full font-extrabold text-2xl">Register</p>

                <form @submit.prevent="register" class="grid grid-rows-4 h-44 gap-12 justify-items-center">

                    <div>
                        <label class="font-bold" for="username">username</label>
                        <br>
                        <input type="text" name="username" id="username"
                            class="h-8 w-[250px] text-center text-sm border-2 rounded-md border-white bg-transparent outline-none focus:border-2 focus:border-slate-700"
                            v-model.trim.trim="form.username">
                        <div v-for="error of v$.username.$errors" :key="error.$uid">
                            <div class=" text-end text-red-600"><small>{{ '*' + error.$message }}</small></div>
                        </div>
                    </div>

                    <div>
                        <label class="font-bold" for="password">password</label>
                        <br>
                        <input :minlength="6" type="password" name="password" id="password"
                            class="w-[250px] text-center text-sm border-2 h-8 rounded-md border-white bg-transparent outline-none focus:border-2 focus:border-slate-700"
                            v-model.trim="form.password">
                        <div v-for="error of v$.password.$errors" :key="error.$uid">
                            <div class=" text-end text-red-600"><small>{{ '*' + error.$message }}</small></div>
                        </div>
                    </div>
                    <div>
                        <label class="font-bold" for="email">Email</label>
                        <br>
                        <input type="email" name="email" id="email"
                            class="w-[250px] text-center text-sm border-2 h-8 rounded-md border-white bg-transparent outline-none focus:border-2 focus:border-slate-700"
                            v-model.trim="form.email">
                        <div v-for="error of v$.email.$errors" :key="error">
                            <div class=" text-end text-red-600"><small>{{ '*' + error.$message }}</small></div>
                        </div>
                    </div>

                    <div class="flex justify-center items-center">
                        <button
                            class=" bg-blackCurrent w-[250px] h-9 mt-20 rounded-md text-white font-semibold hover:bg-slate-400">Register</button>
                    </div>

                </form>
                <p class=" w-full text-center text-sm"><router-link to="/">Login</router-link></p>
            </div>
        </div>
    </main>
</template>
  
<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { loginStore } from '@/store/UserStore/loginStore'
import { onMounted, reactive, computed ,ref} from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import LoadingSpinner from '../../components/utilComponent/LoadingSpinner.vue';

const notification = useNotification()
const loading = ref(false)

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
        password: { required },
        email: { required }
    }
})
const v$ = useVuelidate(rules, form)

const register = () => {
    v$.value.$touch()
    if (v$.value.$invalid) return
    loading.value = true
    auth.signUp(form, InfoSuccess)
    .finally(()=>{
        loading.value = false
    })
}

</script>