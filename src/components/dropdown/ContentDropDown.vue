<template>
    <Transition name="item">
        <main v-if="active" class="absolute z-10 right-[20%] top-6">
            <ItemDropDown>
                <ul>
                    <li class=" border-b p-1 cursor-pointer" v-for="item,i of items" :key="i" @click="item.method($event)">
                        {{ item.menu }}
                    </li>
                </ul>
            </ItemDropDown>
            <!-- <ItemDropDown @click="showRoleModal($event)">
                Change Role Account
            </ItemDropDown>
            <ItemDropDown>
                Deactivate Account
            </ItemDropDown>
            <ItemDropDown @click="showReset($event)">
                Reset Password
            </ItemDropDown> -->
        </main>
    </Transition>
</template>
<script setup>
import { inject, ref } from 'vue'
import ItemDropDown from './ItemDropDown.vue'

const active = inject('isActive')
const data = ref({})
const value = ref(false)
defineProps({
    datas : {
        type : Object,
        default : ()=>{}
    },
})

const emits = defineEmits(['showRoleModal', 'showResetModal', 'showDeactivateAccount'])
// const showRoleModal = (event) => {
//     emits('showRoleModal',event,value,data)
// }
// const showReset = (event) => {
//     emits('showResetModal',event,value,data)
// }
const items = [
    {
        menu : 'Change Role Account',
        method : (event) => {
        emits('showRoleModal',event,value,data)
        }
    },
    {
        menu : 'Deactivate Account',
        method : (event) => {
            emits('showRoleModal',event,value,data)
        }
    },
    {
        menu : 'Reset Password',
        method : (event) => {
            emits('showResetModal',event,value,data)
        }
    }
]

</script>
<style scoped>
.item-enter-active {
    transition: all 0.2s;
}

.item-leave-active {
    transition: all 0.2s;
}

.item-enter-from {
    transform: translateY(-5px);
}

.item-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>