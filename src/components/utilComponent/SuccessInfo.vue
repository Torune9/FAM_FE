<template>
    <Transition name="success">
        <main v-if="showSuccess" class="w-screen h-screen flex justify-center items-center z-10 fixed bg-white">
            <div
                class="text-2xl font-rubik text-center text-white bg-blackCurrent rounded p-10 flex justify-center items-center flex-col shadow-lg shadow-black/50">
                <h1 class="text-red-500">Reset Password has been created</h1>
                <div class="flex justify-center items-center">
                    <div class="w-32 h-32 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="approve">
                            <g data-name="Layer 2">
                                <path fill="#fff"
                                    d="M12,23A11.01245,11.01245,0,0,1,1,12a1,1,0,0,1,2,0,9,9,0,1,0,9-9,1,1,0,0,1,0-2,11,11,0,0,1,0,22Z">
                                </path>
                                <path fill="#fff"
                                    d="M12,23a11.02678,11.02678,0,0,1-3.24951-.4873,1.00029,1.00029,0,0,1,.58838-1.91211A8.99035,8.99035,0,0,0,12,21a1,1,0,0,1,0,2ZM5.55957,20.65039a.99794.99794,0,0,1-.64453-.23633,10.9539,10.9539,0,0,1-2.71729-3.41894.99945.99945,0,0,1,.436-1.34473.99945.99945,0,0,1,1.34521.43652,8.98249,8.98249,0,0,0,2.22559,2.79883.99979.99979,0,0,1-.645,1.76465ZM2.144,14.70605a.99838.99838,0,0,1-.98486-.83007,11.1089,11.1089,0,0,1,.124-4.36621,1.0064,1.0064,0,0,1,.97071-.77539.96963.96963,0,0,1,.231.02734.999.999,0,0,1,.74659,1.19922,9.09572,9.09572,0,0,0-.10059,3.57617,1.00141,1.00141,0,0,1-.81641,1.1543A1.04889,1.04889,0,0,1,2.144,14.70605Zm1.76465-7.584a1.00022,1.00022,0,0,1-.8081-1.58887A11.08483,11.08483,0,0,1,5.40723,3.19434a.99292.99292,0,0,1,.59961-.2002A.99984.99984,0,0,1,6.60742,4.794a9.06347,9.06347,0,0,0-1.88965,1.917A1.00517,1.00517,0,0,1,3.90869,7.12207Zm5.687-3.831A1,1,0,0,1,9.356,1.32031,11.02383,11.02383,0,0,1,12,1a1,1,0,0,1,0,2,9.01764,9.01764,0,0,0-2.16357.26172A1.00865,1.00865,0,0,1,9.5957,3.291Z">
                                </path>
                                <path fill="#fed330"
                                    d="M10.6665,15.667a1.0051,1.0051,0,0,1-.707-.293L7.293,12.707A.99989.99989,0,1,1,8.707,11.293l1.95947,1.96L15.293,8.626A.99989.99989,0,0,1,16.707,10.04l-5.33349,5.334A1.0051,1.0051,0,0,1,10.6665,15.667Z">
                                </path>
                            </g>
                        </svg>
                    </div>
                </div>
                <h1 class="text-cyan-200">please check your email</h1>
                <div>
                    <small>
                        {{ data.to }}
                    </small>
                </div>
                <button class="text-light text-yellow-200">
                    <router-link to="/login">
                        <small>
                            ---back---
                        </small>
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