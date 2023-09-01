<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Prompt:wght@100&display=swap" rel="stylesheet">
    <div class=" w-screen h-screen flex justify-center items-center">
       <div class="rounded-md flex justify-center items-center flex-wrap h-[300px] w-[300px] shadow-lg">
        <h1 class=" text-2xl font-semibold text-slate-800">Reset password</h1>
        <small>Fill up the field to changegit  your password</small>
        <form action="#" method="post">
            <label for="password" class=" font-semibold ">Password</label>
            <br>
            <input type="password" id = "password" class=" w-60 h-8 outline-none border border-slate-600 rounded-md text-center" required>
            <br>
            <br>
            <div><Button class=" bg-red-500 w-40  rounded-md h-10 font-semibold text-sm text-zinc-100">Reset password</Button></div>
        </form>
       </div>
    </div>
</template>
    
    <style>
        div{
            font-family: 'Poppins', sans-serif;
        }
    </style>