<template>
    <div>
        <NavBar/>
        <main class=" ml-[20%] h-[536px] w-4/5 mt-14 absolute top-0 overflow-hidden">
            <slot />
        </main>
        <SideBar/>   
    </div>
</template>
<script setup>
    import NavBar from '@/components/NavBar.vue'
    import SideBar from '@/components/SideBar.vue'
</script>

<style>

</style>