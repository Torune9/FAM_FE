<template>
    <MainLayout>
        <main class="flex flex-col gap-2">
            <section class="text-center">
                <h1 class="font-bold text-lg font-rubik">Manage Profile</h1>
            </section>
            <section class="flex justify-center items-center border p-2">
                <form @submit.prevent="manageUser" enctype="multipart/form-data" class="flex flex-col gap-4 w-full justify-center items-center">
                    <div class="flex justify-center items-center relative">
                        <label for="file" class="absolute -bottom-1 -right-1 z-10 text-black/60 cursor-pointer" v-if="openFile">
                            <font-awesome-icon icon="fa-solid fa-camera"/>
                        </label>
                        <div @click="deleteSrc" class="absolute -bottom-1 -right-1 z-10 text-black/60 cursor-pointer" v-else>
                            <font-awesome-icon icon="fa-solid fa-rectangle-xmark"/>
                        </div>
                        <input @change="setImg" class="hidden" type="file" ref="files" name="file" id="file">
                        <div class="w-24 h-24 border rounded-full flex justify-center items-center relative overflow-hidden">
                            <figure class="h-full w-full flex justify-center items-center" v-if="auth.profile || fileUpload.length > 0 && src">
                            <img class="w-full h-full" :src="src" alt="your profile image">
                        </figure>
                        <font-awesome-icon icon="fa-solid fa-user" size="lg" v-else/>
                        </div>
                    </div>
                    <div class="relative group">
                        <label for="username" class="absolute left-2 top-1 text-black/70 group-hover:text-black">
                            <font-awesome-icon icon="fa-solid fa-user"/>
                        </label>
                        <input placeholder="username" type="text" name="username" id="username" v-model="payload.username" class="border rounded w-60 h-6 p-[14px] text-[10px] font-bold pl-7 outline-none border-slate-500 group-hover:border-slate-800">
                    </div>
                    <div class="relative group">
                        <label for="email" class="absolute left-2 top-1 text-black/70 group-hover:text-black">
                            <font-awesome-icon icon="fa-solid fa-envelope"/>
                        </label>
                        <input placeholder="email" type="email" name="email" id="email" v-model="payload.email" class="border rounded w-60 h-6 p-[14px] text-[10px] font-bold pl-7 outline-none border-slate-500 group-hover:border-slate-800">
                    </div>
                    <div class="w-full flex justify-end">
                        <button class="bg-blue-600 rounded text-[12px] font-bold text-white p-2 hover:bg-blue-500 duration-300 transition-all w-28">
                            <p v-if="!loading">Submit</p>
                            <font-awesome-icon icon="fa-solid fa-spinner" v-else class="animate-spin text-white/50" size="xl"/>
                        </button>
                    </div>
                </form>
            </section>
        </main>
    </MainLayout>
</template>

<script setup>
import { reactive,ref,onMounted, watch } from 'vue';
import MainLayout from '../../layout/MainLayout.vue';
import { useUser } from '@/store/UserStore/userStore'
import { loginStore } from '@/store/UserStore/loginStore'
import { info,infoError } from '../../service/notification';
import router from '../../router';

const users = useUser()
const auth = loginStore()
const showSubmit = ref(false)
const files = ref([])
const fileUpload = ref([])
const openFile = ref(false)
const src = ref('')
const loading = ref(false)

const payload = reactive({
    username : '',
    email : ''
})
const setImg = ()=>{
  const file = files.value.files
  fileUpload.value = [...file]
  src.value = URL.createObjectURL(new Blob(fileUpload.value))
  showSubmit.value = true
}

const manageUser = async ()=>{
  const formData = new FormData()

  loading.value = true

  formData.append('image',fileUpload.value[0]) 
  formData.append('username',payload.username)
  formData.append('email',payload.email)

  await users.manageUser(formData,auth.id)
  .then(res => {
    payload.username = ''
    openFile.value = true
    info(res.message)
    router.replace('/dashboard')
    getImage()
  })
  .catch(error => infoError(error))
  .finally(()=> {
    loading.value = !loading.value
    showSubmit.value = false
  })
  
}

const deleteSrc = ()=>{
    src.value = src.value ? import.meta.env.VITE_APP_BASE_URL + `resources/${auth.profile}` : '' 
    files.value = []
    fileUpload.value = []
}

const getImage = async ()=>{
  await auth.getImage(auth.id)
  .catch(error => console.log(error))
}
const getUsername =()=>{
    auth.getUsernameById(auth.id)
}
watch(()=>[src.value],()=>{
    openFile.value = !openFile.value
})
onMounted(()=> {
    getUsername()
    openFile.value = false
    src.value = import.meta.env.VITE_APP_BASE_URL + `resources/${auth.getProfile}`
})
</script>