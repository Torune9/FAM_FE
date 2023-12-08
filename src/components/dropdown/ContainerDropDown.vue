<template>
    <main class="relative">
        <div>
            <button @click="isDrop" type="button"
                class=" hover:bg-indigo-600 transition-all duration-300 text-white text-[font-size:8px] font-light w-12 rounded bg-indigo-700 p-1">
                <font-awesome-icon icon="fa-solid fa-gear" size="lg" />
            </button>
        </div>
        <slot/>
    </main>
</template>
<script setup>
import { provide,ref, watch} from 'vue'

const isActive = ref(false)
const props = defineProps({
    closeDrop : {
        type : Boolean
    }
})

const isDrop = () => {
    isActive.value = !isActive.value
}
watch(props,(p)=>{
    if (!p.closeDrop) {
        isActive.value = false
    }
})
provide('isActive', isActive)
</script>