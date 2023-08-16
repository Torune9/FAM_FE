<template>
<div class="flex justify-center items-center  w-screen h-screen bg-white">
    <div class="h-[400px] w-[400px] border-2 border-indigo-400 rounded-sm flex flex-wrap justify-center items-center ">
        <p class="text-center text-black w-full">Login</p>
        <form action="" class="grid grid-rows-3 h-40 gap-10 ">
        <div class="text-black">
            <label for="username">username</label>
            <br>
            <input type="text" name="username" id="username" class="h-8 w-[180px] rounded-sm border border-indigo-500 outline-none">
        </div>
        <div class="text-black">
            <label for="password">password</label>
            <br>
            <input type="text" name="password" id="password" class="w-[180px] h-8 rounded-sm border border-indigo-500 outline-none">
        </div>
        <div class="flex justify-center items-center">      
            <button class="bg-indigo-600 w-24 h-9 mt-20 rounded-md text-white font-semibold">Login</button>
        </div>
        </form>
        <!-- login -->
        <p class=" w-full text-center text-sm"><a href="" class="text-indigo-500">forgot password ?</a></p>
    </div>
</div>
</template>