<template>
    <MainLayout>
        <main class="h-full w-full flex flex-col">
            <div v-if="datas">
                <section v-if="datas">
                    <div class="text-3xl font-barlow flex items-center p-8">
                        <h1 class="font-bold"> 
                            <span class="underline">
                                <router-link to="/history">
                                {{ datas.asset_code }}
                            </router-link>
                            </span>
                            <span class="font-light">
                                &nbsp;:&nbsp;{{ datas.information }}
                            </span>
                        </h1>
                    </div>
                    <hr>
                    <div class="sm:w-3/4 font-codensed min[300px]:w-full">
                        <h1 class=" text-xl">Inspector&nbsp;&#x25B8;&nbsp;{{ datas.inspector }}</h1>
                        <h1 class=" text-xl">Status asset&nbsp;&#x25B8;&nbsp;{{ datas.status }}</h1>
                        <hr>
                        <div class="mt-2 relative bg-blue-900 p-2 text-white">
                            <details>
                                <summary>Attachments</summary>
                                <ul class="w-full text-white max-h-24 overflow-y-auto">
                                    <li v-for="(file, i) of datas.attachments" :key="i"
                                        class="bg-white/30 rounded mt-2 text-sm pl-2 hover:bg-white/40 w-1/2">
                                        <small class="underline">
                                            <a :href="getUrl(file)">
                                                {{ i + 1 }}. {{ file }}
                                            </a>
                                        </small>
                                    </li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </section>
                <section v-else>
                    <div class="w-full h-full flex justify-center items-center text-2xl font-bold text-slate-400">
                        <h1 class="p-2 italic animate-pulse">Attachment has not been created</h1>
                    </div>
                </section>
            </div>
            <div v-else class="w-full h-screen flex justify-center items-center">
                <font-awesome-icon v-if="loading" icon="fa-solid fa-spinner" class="animate-spin text-black/40" size="4x"/>
            </div>
        </main>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../../layout/MainLayout.vue';
import { inspectStore } from '@/store/AssetStore/inspectStore';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const { params: { code } } = useRoute()
const datas = ref(null)
const url = import.meta.env.VITE_APP_BASE_URL
const getUrl = (file) => {
  return url + 'resources/' + file
}
const inspect = inspectStore()
const loading = ref(false)

const getAttachments = async () => {
    loading.value = true
    inspect.getAttachments(code)
        .then(res => {
            res.data.forEach(data => {
                datas.value = data
            })
        })
        .catch(err => console.log(err))
        .finally(()=> loading.value = false)
}

onMounted(() => {
    getAttachments()
})

</script>