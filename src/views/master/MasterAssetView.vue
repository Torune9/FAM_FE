<template>
    <MainLayout>
        <div class=" p-16">
            <EasyDataTable :headers="headers" :items="items" :loading="loading">
                <template>
                    kjqbwkfj   
                </template>
            </EasyDataTable>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../../layout/MainLayout.vue';
const headers = [
    {
        name : 'Kendaraan',
        value : 'kendaraan'
    },{
        name : 'Pesawat',
        value : 'pesawat'
    }
]
const items = [
    {Kendaraan : 'Beat' ,Pesawat : 'Sukhoi'}
]
</script>