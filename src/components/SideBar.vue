<template>
    <aside>
        <nav class=" bg-redHunt text-zinc-100 w-[20%] p-4 h-screen">
            <div class=" grid grid-rows-2 gap-3 ">
                <div class="">
                    <!-- <img src="https://source.unsplash.com/600x400" alt="" > -->
                    <br>
                    <hr>
                    <hr>
                </div>
                <ul class="grid grid-rows-3 font-semibold text-sm">
                    <li v-for="menu, index in menus" :key="index"
                        class="h-10 flex items-center p-2 before:contents[''] before:bg-red-300 before:h-10 before:w-1 before:mr-3 active:text-cyan-400 before:scale-y-0 hover:before:scale-y-100 before:transition-transform hover:text-red-100 active:scale-y-100">
                        <router-link :to="menu.route">{{ menu.title }}</router-link></li>

                </ul>
            </div>
        </nav>
    </aside>
</template>

<script setup>

const menus = [
    {
        title: "Dashboard",
        route: { path: '/dashboard' }
    },
    {
        title: "Category Assets",
        route: { path: '/category-assets' }
    },
]


</script>
