<template>
    <Transition name="master-modal">
        <div v-if="showing" class="fixed inset-0 w-full h-screen flex items-center justify-center">
            <div class="relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
                <button aria-label="close" class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4"
                    @click.prevent="close">
                    ×
                </button>
                <!-- slot for content -->
                <slot />
                <!-- TODO handle button on base modal -->
                <!-- <div class="flex justify-end">
                    <button @click="submit"
                        class="  bg-green-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-green-500 transition-all">
                        {{ buttonText }}
                    </button>
                </div> -->
            </div>
        </div>
    </Transition>
</template>
 
<script>
export default {
    props: {
        showing: {
            required: true,
            type: Boolean
        }, 
        buttonText: {
           required: false,
           default: 'Submit'  
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style lang="css" scoped>
.master-modal-enter-active {
    transition: 0.2s ease-in;
}

.master-modal-enter-from {
    transform: scale(0)
}
</style>
