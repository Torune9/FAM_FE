<template>
    <NavBar/>
    <main class=" ml-[20%] h-[536px] w-4/5 mt-14 absolute top-0 overflow-hidden">
        <div class="mt-12 pl-20">
            <button @click="toggleModal" type="button" class="block bg-button text-white text-sm font-semibold w-28 h-10 hover:bg-indigo-300 rounded-md">Create</button>
            <br>
            <select name="" id="" class="border w-32 rounded-md border-slate-500 outline-none">
                <option value="">Active</option>
                <option value="">Activ</option>
                <option value="">Acti</option>
            </select>
            <br>
            <br>
            <table class=" table-auto">
                    <thead class="bg-table text-white ">
                        <tr>
                            <th class="border border-slate-500 w-[250px] text-sm p-1">Category Name</th>
                            <th class="border border-slate-500 w-[250px] text-sm ">Category Code</th>
                            <th class="border border-slate-500 w-[250px] text-sm ">Action</th>
                        </tr>
                    </thead>
                    <tbody class="text-center font-semibold">
                        <tr v-for="category of category.categories" :key="category">
                            <td class="border">{{ category.category_name }}</td>
                            <td class="border">{{ category.category_code }}</td>
                            <td class="border"><button type="button"  class=" bg-redHunt w-16 text-sm text-white p-1 rounded-sm">Edit</button></td>
                        </tr>
                        
                    </tbody>
            </table>
        </div>
    </main>
    <SideBar/>


    <ModalBox :modalPop="modalPop" @close-modal="toggleModal"/>
   
</template>
<script setup>
    import NavBar from '@/components/NavBar.vue'
    import SideBar from '@/components/SideBar.vue'
    import ModalBox from '@/components/ModalBox.vue'
    import { categoryStore } from '../store/categoryStore';
    import { ref,onMounted} from 'vue';
    
    const modalPop = ref(null)
    const category = categoryStore()
    const toggleModal = ()=>{
        modalPop.value = !modalPop.value
    }
    const {getCategory} = category
    onMounted(async()=>{
        await getCategory()
    })
</script>

<style>

</style>