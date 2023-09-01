<template>
<div class="flex justify-center items-center  w-screen h-screen">
    <div class="h-[400px] w-[400px] bg-slate-800 rounded-md flex flex-wrap justify-center items-center text-zinc-100 shadow-xl">
        <p class="text-center w-full font-extrabold text-2xl">Login Form</p>
        <form action="" class="grid grid-rows-3 h-40 gap-10 ">
        <div>
            <label class="font-bold" for="username">username</label>
            <br>
            <input type="text" name="username" id="username" class="h-8 w-[250px] text-center text-sm border-2 rounded-md border-slate-200 bg-transparent outline-none" required>
        </div>
        <div>
            <label class="font-bold" for="password">password</label>
            <br>
            <input type="password" name="password" id="password" class="w-[250px] text-center text-sm border-2 h-8 rounded-md border-slate-200 bg-transparent outline-none" required>
        </div>
        <div class="flex justify-center items-center">      
            <button class=" bg-blue-600 w-[250px] h-9 mt-20 rounded-md text-white font-semibold">Login</button>
        </div>
        </form>
        <!-- login -->
        <p class=" w-full text-center text-sm"><router-link to ="/forgot-password">Forgot password?</router-link></p>
    </div>
</div>
</template>

<script setup>
</script>
<style>
</style>