<template>
    <main class="relative">
            <Transition name="roleModal">
            <div v-if="showChange" class="h-40 w-64 bg-white shadow-lg border-t-2 border-black absolute z-10 rounded right-[40%] top-6">
                <div class="p-4">
                    <div class="text-blue-800 font-extrabold font-rubik text-xl">
                        <label for="role">Change Role User</label>
                    </div>
                    <hr>
                    <small class="font-barlow">Change role for user {{ users.username }},userID&nbsp;({{ users.id }})&nbsp;&#63;</small>
                    <div>
                        <select @change="show" v-model="role.roleId" name="role" id="role" class="border border-slate-500 w-28 rounded font-bold text-sm">
                        <option  v-for="(opt,i) of options" :key="i" :value="opt" class="font-bold">
                            <small>{{ opt }}</small>
                        </option>
                    </select>
                    </div>
                </div>
                <hr>
                <button @click="save" class="absolute bottom-0 right-0 bg-yellow-500 w-20 rounded text-white font-semibold hover:bg-yellow-400">
                    <small>save</small>
                </button>
                <button @click="close()" class="absolute top-2 right-2 text-black/30 hover:text-red-600">
                    <span><font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="xl"/></span>
                </button>
            </div>
        </Transition>
        </main>
</template>

<script setup>
    import {useUser} from '../../store/UserStore/userStore'
    import { reactive } from 'vue';
    const options = ["USER","ADMIN","AUDITHOR","SYSADMIN"]
    const user = useUser()
    const props = defineProps({
        showChange : {
            type : Boolean
        },
        users : {
            type :Object,
            default : ()=>{}
        }
    })
    const role = reactive({
        roleId  :options[0]
    })
    const emits = defineEmits(['close']) 
    const close = (needRefresh = false)=>{
        emits('close',needRefresh)
    }
    const save = ()=>{
        user.updateUser(props.users.id,role)
        .then(res => {
            console.log(res);
            close(true)
        }).catch(err => console.log(err))
        .finally(()=>{
            close(false)
        })
    }
</script>

<style setup>
.roleModal-enter-active{
    transition: transform 0.3s ease;
}
.roleModal-enter-from{
    transform: scale(0,0);
}
.roleModal-leave-to {
  transform: scale(1,1);
}
</style>