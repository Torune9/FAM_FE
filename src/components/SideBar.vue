<template>
    <nav class=" bg-slate-700 text-zinc-100 w-[20%] p-4 h-screen">
       <div class=" grid grid-rows-2 gap-3 ">
        <div class="">
            <img src="https://source.unsplash.com/600x400" alt="" >
            <br>
        <hr>
        <hr>
        </div>
        <ul class="grid grid-rows-3 font-semibold text-sm">
            <li class="h-10 flex items-center p-2 before:contents[''] before:bg-cyan-400 before:h-10 before:w-1 before:mr-3 active:text-cyan-400 before:scale-y-0 hover:before:scale-y-100 before:transition-transform hover:text-cyan-400 "><router-link to="#">Dashboard</router-link></li>
            <li class="h-10 flex items-center p-2 before:contents[''] before:bg-cyan-400 before:h-10 before:w-1 before:mr-3 active:text-cyan-400 before:scale-y-0 hover:before:scale-y-100 before:transition-transform hover:text-cyan-400 "><router-link to="#">Master Data Asset</router-link></li>
            <li class="h-10 flex items-center p-2 before:contents[''] before:bg-cyan-400 before:h-10 before:w-1 before:mr-3 active:text-cyan-400 before:scale-y-0 hover:before:scale-y-100 before:transition-transform hover:text-cyan-400 "><router-link to="#">Asset</router-link></li>
        </ul>
       </div>
    </nav>
</template>

<script setup>
import '../router';
</script>
