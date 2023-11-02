<template>
    <div class="fixed h-screen w-screen">
        <nav>
            <NavBar/>
        </nav>
        <main class="ml-[20%] h-full w-4/5 mt-14 absolute top-0">
            <slot />
        </main>
        <aside>
            <SideBar/>
        </aside>   
    </div>
</template>
<script setup>
    import NavBar from '@/components/navigation/NavBar.vue'
    import SideBar from '@/components/navigation/SideBar.vue'
</script>

<style>

</style>