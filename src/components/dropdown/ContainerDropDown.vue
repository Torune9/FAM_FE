<template>
    <main class="relative">
        <div class="flex justify-center items-center">
            <button @click="isDrop" type="button"
                class="inline bg-indigo-700 text-indigo-300 font-bold text-[10px] p-1 rounded-tl rounded-bl hover:bg-indigo-800 cursor-pointer">
                    Manage
            </button>
            <span>
                <button @click="isDrop" type="button"
                    class="bg-indigo-600 w-6 h-[23px] rounded-tr rounded-br hover:bg-indigo-500 text-indigo-200 flex justify-center items-center">
                    <font-awesome-icon icon="fa-solid fa-gear" />
                </button>
            </span>
        </div>
        <slot />
    </main>
</template>
<script setup>
import { ref, provide} from 'vue'

const isActive = ref(false)
const isDrop = () => {
    isActive.value = !isActive.value
}
provide('isActive', isActive)
</script>