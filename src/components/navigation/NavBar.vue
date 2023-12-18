<template>
    <nav class="max-[800px]:w-full fixed w-4/5 right-0 bg-darkHunt top-0 flex justify-end h-[10%] items-center z-50 p-5">
      <div class="flex max-[800px]:w-[60%] max-[400px]:w-full w-[30%] justify-around items-center">
          <div class="flex flex-row w-full justify-center items-center gap-4 max-[400px]:w-1/2">
            <h1 @click="authDropDown" class=" text-white font-semibold cursor-pointer" v-text="user.username ? user.username : 'User'"/>
              <div class="relative">
                <div class="rounded-full overflow-hidden w-12 h-12 flex justify-center items-center">
                  <figure class="h-full w-full flex justify-center items-center" v-if="auth.profile || fileUpload.length > 0">
                    <img class="w-full h-full" :src="src" alt="your profile image">
                  </figure>
                  <font-awesome-icon icon="fa-solid fa-user" size="lg" v-else/>
                </div>
                <form @submit.prevent="uploadImage" enctype="multipart/form-data" class="absolute flex flex-row text-white -bottom-1 -right-1">
                    <label for="img" class="cursor-pointer">
                      <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
                    </label>
                    <input @change="setImg" type="file" ref="files" id="img" name="img" class=" hidden">
                    <Transition name="btnSub">
                      <button class="absolute text-[11px] bg-darkHunt rounded pl-1 pr-1 right-1 -bottom-4" v-if="showSubmit">
                        submit
                      </button>
                    </Transition>
                  </form>
              </div>
              <div>
                <button @click="logout"
                class="text-white border-2 border-white rounded p-2 text-[12px] font-semibold hover:bg-white hover:text-black hover:font-bold  hover:transition-all">logout</button>
              </div>
          </div>
      </div>
      <div>
        <slot name="dropdown"/>
      </div>
    </nav>

</template>

<script setup>
import { loginStore } from '@/store/UserStore/loginStore'
import { useUser } from '@/store/UserStore/userStore'
import { reactive,provide, ref, onMounted} from 'vue'
import { useNotification } from '@kyvg/vue3-notification';

const auth = loginStore()
const users = useUser()
const user = reactive({
  username: ''
})
const showSubmit = ref(false)
const isActive = ref(false)
const files = ref([])
const fileUpload = ref([])
const src = ref('')
const notification = useNotification()
const infoUpdateImage = (message)=>{
  notification.notify({
    title : 'Success',
    text : message, 
  })
}
const isShowDrop = ()=> isActive.value = !isActive.value
const authDropDown =()=>{
  if (auth.user.role != 'SYSADMIN') return 
  isShowDrop()
} 

const setImg = ()=>{
  const file = files.value.files
  fileUpload.value = [...file]
  src.value = URL.createObjectURL(new Blob(fileUpload.value))
  showSubmit.value = true
}


const uploadImage = async ()=>{
  const payload = new FormData()
  payload.append('image',fileUpload.value[0]) 
  await users.uploadImages(payload,auth.id)
  .then(res => {
    infoUpdateImage(res.message)
    getImage()
  })
  .catch(error => console.log(error))
  .finally(()=> {
    showSubmit.value = false
  })
  
}

const getImage = async ()=>{
  await auth.getImage(auth.id)
  .catch(error => console.log(error))
}

if (auth) {
  user.username = auth.user.username
}

const logout = () => {
  auth.logout()
}

onMounted(()=> src.value = import.meta.env.VITE_APP_BASE_URL + `resources/${auth.profile}`)

provide('isDropDown',isActive)
</script>
<style scoped>

.btnSub-enter-active,
.btnSub-leave-active {
  transition: opacity 0.5s ease;
}

.btnSub-enter-from,
.btnSub-leave-to {
  opacity: 0;
}
</style>