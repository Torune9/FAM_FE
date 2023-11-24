<template>
    <Transition name="item">
        <main v-if="active" class="absolute z-10 right-[20%] top-6">
            <ul class="bg-indigo-700 rounded overflow-hidden shadow-[3px_3px_rgba(0,0,0,0.7)]">
                <li @click="data.popUp" class="border-b border-b-white p-1 text-indigo-200 text-[10px] font-barlow font-normal hover:bg-indigo-500 duration-500 transition-all cursor-pointer"
                    v-for="data, i of menus" :key="i">
                    {{ data.menu }}
                </li>
            </ul>
        </main>
    </Transition>
</template>
<script setup>
import { inject,ref} from 'vue'
const active = inject('isActive')
const datas = ref([])
const isShow = ref(false)
const emits =defineEmits(['showModal'])
const menus = [
    {
        menu : 'Change Role',
        popUp : ()=>{
            emits('showModal',isShow.value,datas.value)
        },
    },
    {menu : 'Reset Password'},
    {menu : 'Deactivate Account'}
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
}</style>