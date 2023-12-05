<template>
    <main class="absolute top-16 lg:top-14 sm:right-[150px] min-[300px]:right-[200px]">
        <Transition name="drop">
            <ul v-if="isDrop">
                <li @click="showAccountCreate" class="bg-darkHunt p-2 text-white rounded-bl rounded-br text-sm hover:bg-slate-700 cursor-pointer duration-300 transition-all">
                    Create account
                </li>
            </ul>
        </Transition>
    </main>
</template>

<script setup>
import { inject ,ref} from 'vue';
const isDrop = inject('isDropDown')
const emits = defineEmits(['showCreate'])
const isShow = ref(false)

const showAccountCreate = ()=>{
    emits('showCreate',isShow)
}
</script>

<style scoped>
.drop-enter-active{
    transition:opacity ease-in 0.3s;
}
.drop-leave-active{
    transition:ease-out 0.3s;
}

.drop-enter-from{
    opacity: 0;
}
.drop-enter-to{
    opacity: 100;
}
.drop-leave-from{
    transform: translateY(0px);
}
.drop-leave-to{
    transform: translateY(-10px);
    opacity: 0;
}


</style>