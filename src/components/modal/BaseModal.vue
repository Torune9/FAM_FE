<template>
    <Transition name="master-modal">
        <div v-if="showing" class="fixed z-10 inset-0 w-full max-[450px]:w-72 max-[450px]:left-24 h-screen flex items-center justify-center">
            <div class="relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
                <button aria-label="close" class="absolute top-0 right-0 text-xl text-black/40 hover:text-red-700 my-2 mx-4"
                    @click.prevent="close">
                    <font-awesome-icon icon="fa-solid fa-rectangle-xmark"/>
                </button>
                <!-- slot for content -->
                <slot />
                <!-- TODO handle button on base modal -->
                <div class="flex justify-end  max-[450px]:mt-3">
                    <button v-if="showAdd" @click="submit"
                        class="  bg-green-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-green-500 transition-all">
                       <p v-if="!loading"> 
                            {{ buttonText }}
                        </p>
                        <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-white/40" size="xl" v-else/>
                    </button>
                    <button v-else  @click="update"
                        class="bg-blue-600 font-semibold w-32 h-10 rounded-md text-white text-sm border-2 hover:bg-blue-500 transition-all">
                        <p v-if="!loading">
                            {{ buttonText }}
                        </p>
                        <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-white/40" size="xl" v-else/>
                    </button>
                </div>
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
        },
        showAdd : {
            type : Boolean,
            required : true
        },
        loading :{
            type : Boolean,
            required : true
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        submit(){
            this.$emit('add')
        },
        update(){
            this.$emit('update')
        }
    },
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
