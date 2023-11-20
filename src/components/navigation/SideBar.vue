<template>
    <aside>
        <nav class="fixed top-0 bg-redHunt text-zinc-100 w-[20%] p-4 h-screen z-50">
            <div class="flex flex-col">
                <h1 class="text-center font-bold text-2xl font-rubik">M&nbsp;E&nbsp;N&nbsp;U</h1>
                <hr>
                <hr>
                <ul class="grid grid-rows-3 font-semibold text-sm">
                    <li v-for="menu, index in menus" :key="index"
                        class="h-10 flex items-center p-2 before:contents[''] before:bg-red-600 before:h-10 before:w-1 before:mr-3 before:scale-y-0 hover:before:scale-y-100 before:transition-transform hover:text-red-600 active:text-red-500 active:scale-y-100 hover:bg-white">

                        <router-link :to="menu.route">{{ menu.title }}</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { loginStore } from '@/store/UserStore/loginStore';
import { ref, onMounted } from "vue"


const auth = loginStore()
const menus = ref([])

const links = [
    {
        title: "Dashboard",
        route: { path: '/dashboard' }
    },
    {
        title: "Category Assets",
        route: { path: '/category-assets' }
    },
    {
        title: "Master Data Asset",
        route: { path: '/master-assets' },
        name: 'master'
    },
    {
        title: "Asset",
        route: { path: '/assets' },
        name: 'asset'
    },
    {
        title: "History Inspection",
        route: { path: '/history' },
        name: 'history'
    },
]
onMounted(() => {
    if (auth.user.role === 'ADMIN' || auth.user.role == 'SYSADMIN') {
        return menus.value = links
    } else {
        menus.value = links.filter(link => link.name != 'master')
    }
})

</script>
