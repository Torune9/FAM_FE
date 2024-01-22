<template>
    <MainLayout>
        <main class="flex flex-col gap-2">

            <section class="text-center">
                <h1 class="font-bold text-lg font-rubik">Profile Edit</h1>
            </section>

            <hr>

            <section class="w-full flex flex-col justify-center items-center">
                <div class="relative">
                    <div class="w-24 h-24 border rounded-full flex justify-center items-center relative overflow-hidden bg-darkHunt">
                        <figure class="h-full w-full flex justify-center items-center"
                            v-if="auth.profile || fileUpload.length > 0 && src">
                            <img class="w-full h-full" :src="src" alt="your profile image">
                        </figure>
                        
                        <div v-else>
                            <p class="font-bold text-4xl text-white">{{ getFirstLetterFromUsername(auth.getUsername) }}</p>
                        </div>
                    </div>
                    <div class="absolute top-4 -right-[90px] flex flex-col">
                        <label class="text-[10px] font-bold" for="authUsername">
                            username :
                        </label>
                        <input type="text" id="authUsername" name="authUsername" disabled :value="auth.getUsername" class="border w-20 text-[10px] rounded p-1">
                    </div>
                    <div class="absolute top-14 -right-[90px] flex flex-col">
                        <label class="text-[10px] font-bold" for="role">
                            role : 
                        </label>
                        <input type="text" id="role" name="role" disabled :value="auth.user.role" class="border w-20 text-[10px] rounded p-1">
                    </div>
                </div>
            </section>

            <section v-if="!showManageForm">
                <div class="w-full flex justify-center">
                    <button @click="toggleManageProfile" class="w-1/2 h-8 bg-blue-800 text-white tracking-widest rounded hover:bg-blue-700 ">
                        Manage Profile
                    </button>
                </div>
            </section>
            
            <section v-else class="flex justify-center items-center border p-2 relative">

                <button @click="toggleManageProfile" type="button" class="absolute top-2 left-2 text-black/50 hover:text-red-600">
                    <font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="lg"/>
                </button>

                <form @submit.prevent="manageUser" enctype="multipart/form-data"
                    class="flex flex-col gap-4 w-full justify-center items-center">
                    <div class="flex justify-center items-center relative">
                        <label for="file" class="absolute -top-9 -right-8 z-10 text-black/60 cursor-pointer"
                            v-if="openFile">
                            <font-awesome-icon class="hover:text-black/40" icon="fa-solid fa-camera" />
                        </label>
                        <div @click="deleteSrc"
                            class="hover:text-red-500 absolute -top-9 -right-8 z-10 text-black/60 cursor-pointer" v-else>
                            <font-awesome-icon icon="fa-solid fa-rectangle-xmark" />
                        </div>
                        <input @change="setImg" class="hidden" type="file" ref="files" name="file" id="file">
                    </div>
                    <div class="relative group">
                        <label for="username" class="absolute left-2 top-1 text-black/70 group-hover:text-black">
                            <font-awesome-icon icon="fa-solid fa-user" />
                        </label>
                        <input placeholder="username" type="text" name="username" id="username" v-model="payload.username"
                            class="border rounded w-60 h-6 p-[14px] text-[10px] font-bold pl-7 outline-none border-slate-500 group-hover:border-slate-800 focus:border-blue-700 transition-all">
                    </div>
                    <div class="relative group flex w-60 justify-center items-center">
                        <label for="email" class="absolute left-2 top-1 text-black/70 group-hover:text-black">
                            <font-awesome-icon icon="fa-solid fa-envelope" />
                        </label>
                        <input :disabled="isDisable" :placeholder="auth.user.email" type="email" name="email" id="email"
                            v-model="payload.email"
                            class="border rounded w-full h-6 p-[14px] text-[10px] font-bold pl-7 outline-none border-slate-500 group-hover:border-slate-800 focus:border-blue-700 transition-all mr-2">
                        <input class="cursor-pointer" name="isDisable" id="isDisable" v-model="isChangeEmail" type="checkbox">
                        <span class="text-[10px] ml-1 w-[5%]">{{ isEnable }}</span>
                    </div>
                    <div>
                        <router-link to="/forgot-password">
                            <p class="text-[10px]">
                                Change password
                            </p>
                        </router-link>
                    </div>
                    <div class="w-full flex justify-end">
                        <button
                            class="bg-blue-600 rounded text-[12px] font-bold text-white p-2 hover:bg-blue-500 duration-300 transition-all w-28">
                            <p v-if="!loading">Submit</p>
                            <font-awesome-icon icon="fa-solid fa-spinner" v-else class="animate-spin text-white/50"
                                size="xl" />
                        </button>
                    </div>
                </form>
            </section>
        </main>
    </MainLayout>
</template>

<script setup>
import { reactive, ref, onMounted, watch, watchEffect } from 'vue';
import MainLayout from '../../layout/MainLayout.vue';
import { useUser } from '@/store/UserStore/userStore'
import { loginStore } from '@/store/UserStore/loginStore'
import { info, infoError } from '../../service/commonService/notification';
import router from '../../router';

const users = useUser()
const showManageForm = ref(false)
const auth = loginStore()
const showSubmit = ref(false)
const files = ref([])
const fileUpload = ref([])
const openFile = ref(false)
const src = ref('')
const loading = ref(false)

const isDisable = ref(true)
const isChangeEmail = ref(false)
const isEnable = ref('Enabled')

const payload = reactive({
    username: '',
    email: ''
})
const setImg = () => {
    const file = files.value.files
    fileUpload.value = [...file]
    src.value = URL.createObjectURL(new Blob(fileUpload.value))
    showSubmit.value = true
}

const manageUser = async () => {
    const formData = new FormData()

    loading.value = true

    formData.append('image', fileUpload.value[0])
    formData.append('username', payload.username)
    formData.append('email', payload.email)

    await users.manageUser(formData, auth.id)
        .then(res => {
            payload.username = ''
            openFile.value = true
            info(res.message)
            router.replace('/dashboard')
            getImage()
        })
        .catch(error => {
            const {data:{message}} = error.response
            infoError(message)
        })
        .finally(() => {
            loading.value = !loading.value
            showSubmit.value = false
            showManageForm.value = false
        })

}

const deleteSrc = () => {
    src.value = src.value ? import.meta.env.VITE_APP_BASE_URL + `resources/${auth.profile}` : ''
    files.value = []
    fileUpload.value = []
}

const getImage = async () => {
    await auth.getImage(auth.id)
        .catch(error => console.log(error))
}
const getUsername = () => {
    auth.getUsernameById(auth.id)
}

const getFirstLetterFromUsername = (username)=>{
    return username.substr(0,1).toUpperCase()
}

const toggleManageProfile = ()=> showManageForm.value = !showManageForm.value

watch(() => [src.value], () => {
    openFile.value = !openFile.value
})

watchEffect(() => {
    if (isChangeEmail.value) {
        isDisable.value = false
        isEnable.value = 'Disabled'
    }else{
        isDisable.value = true
        isEnable.value = 'Enabled'
    }
})


onMounted(() => {
    getUsername()
    openFile.value = false
    src.value = import.meta.env.VITE_APP_BASE_URL + `resources/${auth.getProfile}`
})
</script>