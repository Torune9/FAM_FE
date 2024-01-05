<template>
    <main class="h-screen w-screen">
        <nav>
            <NavBar @sendSidebarData="showSideBar">
                <template v-slot:dropdown>
                    <DropDown @showCreate="create" />
                </template>
            </NavBar>
            <SideBar :isShowSidebar="showSide" @closeSidebar="closeSidebar"/>
        </nav>
        <div :class="padding" class="-z-10 min-[800px]:pl-[21%] max-h-screen pr-2 pt-[6%] min-[300px]:pt-20 ">
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
    import { onMounted, ref } from 'vue';
    const showCreate = ref(false)
    const showSide = ref(false)
    const padding = ref('')
    const create = (data) => {
        showCreate.value = !data.value
    }
    const closeModal = () => {
        showCreate.value = false
    }

    const showSideBar = (data)=>{
        showSide.value = data
    }

    const updateSidebarVisibility = ()=> {
        if (window.innerWidth > 700) {
            showSide.value = true;
        }else{
            showSide.value = false
            padding.value = 'p-2'
        }
    }
    const closeSidebar = (data)=>{
        showSide.value = data
    }
    const resize = ()=>{
        window.addEventListener('resize', updateSidebarVisibility);
    }
    onMounted(()=>{
        updateSidebarVisibility();
        resize()
    })
</script>

<style>
::-webkit-scrollbar{
    widows: 200px;
}
</style>