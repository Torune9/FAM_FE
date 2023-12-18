<template>
    <main class="h-screen w-screen">
        <nav>
            <NavBar>
                <template v-slot:dropdown>
                    <DropDown @showCreate="create" />
                </template>
            </NavBar>
            <SideBar/>
        </nav>
        <div class="-z-10 max-[800px]:pl-[32%] max-h-screen pl-[21%] pr-2 pt-[6%] min-[300px]:pt-20 ">
            <CreateAccount :isActive="showCreate" @close="closeModal"/>
            <slot/>
        </div>
    </main>
</template>
<script setup>
    import NavBar from '@/components/navigation/NavBar.vue'
    import SideBar from '@/components/navigation/SideBar.vue'
    import DropDown from '@/components/navigation/DropDown.vue';
    import CreateAccount from '@/components/modal/userManagementModal/CreateAccount.vue';
    import { ref } from 'vue';
    const showCreate = ref(false)
    const create = (data) => {
        showCreate.value = !data.value
    }
    const closeModal = () => {
        showCreate.value = false
    }
</script>

<style>
::-webkit-scrollbar{
    widows: 200px;
}
</style>