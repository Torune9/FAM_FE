<template>
    <aside>
        <Transition name="side">
            <nav v-if="isShowSidebar"
                class="fixed top-0 bg-greyHunt text-zinc-100 w-[20%] p-4 h-screen z-50 max-[800px]:w-[30%] max[400px]:w-1/2">
                <div v-if="closeSide" class="absolute right-0 top-0" @click="closeSidebar">
                    <font-awesome-icon icon="fa-solid fa-rectangle-xmark"
                        class="text-white/50 hover:text-red-600 cursor-pointer" size="xl" />
                </div>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <h1 class="text-center font-bold xl:text-2xl font-rubik max-[400px]:text-[10px]">M&nbsp;E&nbsp;N&nbsp;U
                    </h1>
                    <ul class="flex flex-col font-semibold p-2">
                        <li v-for="menu, index in menus" :key="index"
                            class="h-10 flex text-sm items-center w-48 hover:bg-white/10 hover:rounded p-2 group max-[400px]:text-[8px] max-[400px]:pl-0 max-[700px]:text-[10px] max-[700px]:pl-10">
                            <router-link
                                active-class="transition-all duration-300 flex items-center text-green-600 group-hover:text-black"
                                :to="menu.route" class="flex items-center max-[400px]:w-full max-[400px]:pl-14">
                                <span class="mr-2">
                                    <figure>
                                        <font-awesome-icon :icon="menu.icon" size="lg" />
                                    </figure>
                                </span>
                                {{ menu.title }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </Transition>
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
        route: { path: '/dashboard' },
        name: 'dashboard',
        icon: 'fa-solid fa-house'
    },
    {
        title: "Category Assets",
        route: { path: '/category-assets' },
        name: 'category_asset',
        icon: 'fa-solid fa-table-list'
    },
    {
        title: "Master Data Asset",
        route: { path: '/master-assets' },
        name: 'master',
        icon: 'fa-solid fa-suitcase'
    },
    {
        title: "Asset",
        route: { path: '/assets' },
        name: 'asset',
        icon: 'fa-solid fa-window-maximize'
    },
    {
        title: "History Inspection",
        route: { path: '/history' },
        name: 'history',
        icon: 'fa-solid fa-shoe-prints'
    },
    {
        title: "Users",
        route: { path: '/users' },
        name: 'user',
        icon: 'fa-solid fa-users'
    },
]

const props = defineProps({
    isShowSidebar: {
        type: Boolean
    }
})

const closeSide = ref(false)

const emit = defineEmits(['closeSidebar'])
const closeSidebar = () => {
    emit('closeSidebar', !props.isShowSidebar)
}
const updateSidebarVisibility = () => {
    if (window.innerWidth <= 700) {
        closeSide.value = true;
    } else {
        closeSide.value = false
    }
}
const resize = () => {
    window.addEventListener('resize', updateSidebarVisibility);
}

onMounted(() => {
    resize()
    closeSide.value = window.innerWidth <= 700
    menus.value = links
    if (auth.user.role === 'ADMIN') {
        return menus.value = links.filter(link => link.name != 'user')
    } else if (auth.user.role == 'SYSADMIN') {
        return menus.value
    }
    else {
        return menus.value = links.filter(link => link.name != 'master' && link.name != 'user')
    }
})

</script>

<!-- <style scoped>
.side-leave-active {
    transition: transform 0.2s linear;
}

.side-enter-from {
    transform: translateX(-100px);
}

.side-enter-to {
    transform: translateX(0);
}

.side-leave-from {
    transform: translateX(0);
}

.side-leave-to {
    transform: translateX(-100px);
}
</style> -->