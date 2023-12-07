<template>
    <main class="relative">
            <Transition name="roleModal">
            <div v-if="showChange" class="h-40 w-64 bg-white shadow-lg border-t-2 border-black absolute z-10 rounded right-[40%] top-6">
                <div class="p-4">
                    <div class="text-blue-800 font-extrabold font-rubik text-xl">
                        <h1>{{ title }}</h1>
                    </div>
                    <hr>
                    <div v-if="title == 'Change Role Account'">
                        <small class="font-barlow">Change role for user {{ users.username }},userID&nbsp;({{ users.id }})&nbsp;&#63;</small>
                        <label for="role">
                            <select @change="show" v-model="role.roleId" name="role" id="role" class="border border-slate-500 w-28 rounded font-bold text-sm">
                            <option  v-for="(opt,i) of options" :key="i" :value="opt" class="font-bold">
                                <small>{{ opt }}</small>
                            </option>
                        </select>
                        </label>
                        <button @click="changeRole" class="absolute bottom-0 right-0 bg-yellow-500 w-20 rounded text-white font-semibold hover:bg-yellow-400">
                            <small>save</small>
                        </button>
                    </div>
                    <div v-else-if="title == 'Deactivated Account' || title == 'Activated Account'">
                        <small class="font-barlow text-[11px]">{{ label }} account for user {{ users.username }},userID&nbsp;({{ users.id }})&nbsp;&#63;</small>
                        <div class="flex items-center gap-5">
                            <label for="active" class="w-32">
                                <p>{{ label }}</p>
                            </label>
                            <input @change="test" v-model="toggle" type="checkbox" id="active" name="active">
                        </div>
                        <button @click="deactivateAccount(users.id)" class="absolute bottom-0 right-0 bg-yellow-500 w-20 rounded text-white font-semibold hover:bg-yellow-400">
                            <small>save</small>
                        </button>
                    </div>
                    <div v-else-if="title == 'Reset Password'">
                        <small class="font-barlow text-[11px]">Reset password for user {{ users.username }},userID&nbsp;({{ users.id }})&nbsp;&#63;</small>
                       <div>
                        <label for="reset">
                            <input v-model="payload.newPassword" class="outline-none rounded border border-black p-1 text-center" type="password" name="reset" id="reset">
                        </label>
                        <p v-for="error,i of v$.newPassword.$errors" :key="i" class="text-red-600 text-[12px] font-bold">
                            *{{ error.$message }}
                        </p>
                       </div>
                        <button @click="changePassword(users.id)" class="absolute bottom-0 right-0 bg-yellow-500 w-20 rounded text-white font-semibold hover:bg-yellow-400">
                            <small>save</small>
                        </button>
                    </div>
                </div>
                <hr>
                <button @click="close()" class="absolute top-2 right-2 text-black/30 hover:text-red-600">
                    <span><font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="xl"/></span>
                </button>
            </div>
        </Transition>
        </main>
</template>

<script setup>
    import {sysAdminStore} from '@/store/UserStore/sysAdmin'
    import { reactive,computed,watch,ref} from 'vue';
    import { useVuelidate } from '@vuelidate/core';
    import { required, minLength } from '@vuelidate/validators';
    import { useNotification } from '@kyvg/vue3-notification';
    const options = ["USER","ADMIN","AUDITHOR","SYSADMIN","INSPECTOR"]
    const notification = useNotification()
    const sysAdmin = sysAdminStore()
    const rules = computed(() => {
    return {
        newPassword: {
            required,
            minLength: minLength(8)
            },
        }
    })

    const toggle = ref(false)
    const label = ref('')
    const payload = reactive({
        newPassword : ''
    })
    const v$ = useVuelidate(rules, payload)

    const props = defineProps({
        showChange : {
            type : Boolean
        },
        users : {
            type :Object,
            default : ()=>{}
        },
        title : {
            default : ''
        }
    })
    const role = reactive({
        roleId  :options[0]
    })
    const emits = defineEmits(['close']) 
    const close = (needRefresh = false)=>{
        emits('close',needRefresh)
        payload.newPassword = ''
        toggle.value = false
    }
    const infoSuccess = (message)=>{
        notification.notify({
            title : 'Success',
            text : message,
            type : 'success'
        })
    }
    const infoFailed = (message)=>{
        notification.notify({
            title : 'Failed',
            text : message,
            type : 'danger'
        })
    }
    const changeRole = ()=>{
        sysAdmin.updateUser(props.users.id,role)
        .then(res => {
            infoSuccess(res.message)
            close(true)
        })
        .catch(error => infoFailed(error))
        .finally(()=>close(false))
    }
    const changePassword = (id)=>{
        v$.value.$touch()
        if (v$.value.$invalid) return
        sysAdmin.resetPassword(id,payload)
        .then(res =>{
           infoSuccess(res.message)
            close(true)
        })
        .catch(error => infoFailed(error))
        .finally(()=>close(false))
    }
    const deactivateAccount = (id)=>{
        if (label.value == 'Deactivated') {
            toggle.value = !toggle.value
        }
        sysAdmin.deactivateAccount(id,toggle.value)
        .then((res) => {
            infoSuccess(res.message)
            close(true)
        })
        .catch(error => infoFailed(error))
        .finally(()=>close(false))
    }

watch(props,(newVal)=> {
    if (!newVal.users.active) {
        label.value = 'Activate'
    }else{

        label.value = 'Deactivate'
    }
})
</script>

<style setup>
.roleModal-enter-active{
    transition: transform 0.3s ease;
}
.roleModal-leave-active{
    transition: opacity 0.2s ease;
}
.roleModal-enter-from{
    transform: scale(0,0);
}
.roleModal-enter-to {
  transform: scale(1,1);
}
.roleModal-leave-to{
    opacity: 0;
}
</style>