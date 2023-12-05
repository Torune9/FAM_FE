<template>
    <MainLayout>
        <main class="h-full w-full flex flex-col">
            <div v-if="datas">
                <div class="text-3xl font-barlow flex items-center p-8">
                    <h1 class="font-bold"> 
                        <span class="underline">
                            <router-link to="/history">
                            {{ datas.asset_code }}
                        </router-link>
                        </span>
                        <span class="font-light">
                            &nbsp;:&nbsp;{{ histories.information }}
                        </span>
                    </h1>
                </div>
                <hr>
                <div class="sm:w-3/4 font-codensed min[300px]:w-full">
                    <h1 class=" text-xl">Inspector&nbsp;&#x25B8;&nbsp;{{ datas.inspector }}</h1>
                    <h1 class=" text-xl">Status asset&nbsp;&#x25B8;&nbsp;{{ histories.status }}</h1>
                    <hr>
                    <div class="mt-2">
                        <div class="bg-blackCurrent p-2 text-white">
                            <details>
                                <summary>
                                    Findings
                                </summary>
                                <div class=" max-h-[75px] overflow-y-auto text-sm text-justify">
                                    <hr>
                                    <p>
                                        {{ datas.findings }}
                                    </p>
                                </div>
                            </details>
                        </div>
                    </div>
                    <div class="mt-2 relative bg-blue-900 p-2 text-white">
                        <details>
                            <summary>Attachments</summary>
                            <ul class="w-full text-white max-h-24 overflow-y-auto">
                                <li v-for="(file, i) of datas.file" :key="i"
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
            </div>
            <div v-else class="w-full h-full flex justify-center items-center text-2xl font-bold text-slate-400">
                <h1 class="p-2 italic animate-pulse">Attachment has not been created</h1>
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
const histories = ref([])
const url = import.meta.env.VITE_APP_BASE_URL
const getUrl = (file) => {
  return url + 'resources/' + file
}
const inspect = inspectStore()

const getAttachments = async () => {
    inspect.getAttachments(code)
        .then(res => {
            res.data.forEach(data => {
                datas.value = data
                histories.value = data.histories
            })
        })
        .catch(err => console.log(err))
}

onMounted(() => {
    getAttachments()
})

</script>