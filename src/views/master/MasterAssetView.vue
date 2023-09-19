<template>
    <MainLayout>
        <div class=" p-16">
            <EasyDataTable :headers="headers" :items="items" :loading="loading">
            </EasyDataTable>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../../layout/MainLayout.vue';
const headers = [
    {
      text : 'Kendaraan',
        value : 'kendaraan'
    },{
      text : 'Pesawat',
        value : 'pesawat'
    }
]
const items = [
{
    kendaraan : 'Beat',
    pesawat : 'Sukhoi'
}
]
</script>