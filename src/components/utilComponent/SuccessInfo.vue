<template>
    <Transition name="success">
        <main v-if="showSuccess" class="w-screen h-screen flex justify-center items-center z-10 fixed bg-white p-4">
            <div
                class="text-2xl font-rubik text-center text-white bg-blue-900 rounded p-16 flex justify-center items-center flex-col max-w-md max-[600px]:w-full max-[600px]:h-[300px] relative">
                <h1 class="text-white text max-[600px]:text-lg">If your email address exists in our database, you will receive a password recovery link at your email address.</h1>
                <div class="max-[600px]:text-sm text-lg">
                    <small>
                        {{ data.to }}
                    </small>
                </div>
                <button class="text-white/60 transition-all hover:text-red-500 absolute top-2 right-2">
                    <router-link to="/login" class="w-full h-full">
                        <font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="lg"/>
                    </router-link>
                </button>
            </div>
        </main>
    </Transition>
</template>

<script setup>
defineProps({
    showSuccess: {
        type: Boolean,
    },
    data: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

</script>
<style scoped>.success-enter-active {
    transition: 0.2s ease;
}

.success-enter-from {
    transform: translateY(-200px)
}

.success-enter-to {
    transform: translateY(0px);
}</style>