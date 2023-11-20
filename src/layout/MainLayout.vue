<template>
    <nav>
        <NavBar/>
    </nav>
    <main class="ml-[20%] mt-[5%] -z-10">
        <slot />
    </main>
    <aside>
        <SideBar/>
    </aside>   
</template>
<script setup>
    import NavBar from '@/components/navigation/NavBar.vue'
    import SideBar from '@/components/navigation/SideBar.vue'
</script>

<style>
::-webkit-scrollbar{
    widows: 200px;
}
</style>