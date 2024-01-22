<template>
    <MainLayout>
        <main class="h-full w-full flex flex-col">
            <div v-if="datas">
                <section v-if="datas">
                    <div class="text-3xl font-barlow flex items-center p-8 border-b">
                        <h1 class="font-bold"> 
                            <span>
                                <router-link to="/history">
                                {{ datas.asset_code }}
                            </router-link>
                            </span>
                            <span class="font-light">
                                &nbsp;:&nbsp;{{ getHalftInformation(datas.information) }}
                            </span>
                        </h1>
                    </div>
                    <div class="flex flex-row gap-x-4 p-8">
                        <div class="w-full flex flex-col gap-y-2">
                            <div class="bg-slate-200">
                                <details class="p-4">
                                    <summary class="text-sm font-bold">
                                        Attachments
                                    </summary>
                                    <ul class="w-full max-h-24 overflow-y-auto">
                                        <li v-for="(file, i) of datas.attachments" :key="i"
                                            class="bg-white/30 rounded mt-2 text-sm pl-2 hover:bg-white/40 w-1/2">
                                            <small>
                                                <a :href="getUrl(file)">
                                                    {{ i + 1 }}. {{ file }}
                                                </a>
                                            </small>
                                        </li>
                                    </ul>
                                </details>
                            </div>
                            <div class="bg-slate-200 p-4">
                                <h3 class="text-sm font-bold">Information</h3>
                                <p class="text-[10px]">{{ datas.information }}</p>
                            </div>
                        </div>
                        <div class="w-full text-sm font-semibold bg-slate-200 p-4 h-fit">
                            <div class="border-b p-1 border-black/30">
                                <h1 class="text-[11px]">Inspector</h1>
                                <p>{{ datas.inspector }}</p>
                            </div>
                            <div class="p-1">
                                <h1 class="text-[10px]">Status</h1>
                                <p>{{ datas.status }}</p>
                            </div>
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

const { params: { id } } = useRoute()
const datas = ref(null)
const url = import.meta.env.VITE_APP_BASE_URL
const getUrl = (file) => {
  return url + 'resources/' + file
}
const inspect = inspectStore()
const loading = ref(false)

const getAttachments = async () => {
    loading.value = true
    inspect.getAttachments(id)
        .then(res => {
            res.data.forEach(data => {
                datas.value = data
            })
        })
        .catch(err => console.log(err))
        .finally(()=> loading.value = false)
}
const getHalftInformation = information=> information.split('.')[0]

onMounted(() => {
    getAttachments()
})

</script>