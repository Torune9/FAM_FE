<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Prompt:wght@100&display=swap" rel="stylesheet">
        <div class=" w-screen h-screen flex justify-center items-center">
           <div class="rounded-md flex justify-center items-center flex-wrap h-[400px] w-[400px] p-4 shadow-lg">
            <h1 class=" text-2xl font-semibold text-slate-800 mb-9">Forgot password</h1>
            <small class=" mb-4">Please provide your email addres that you used when you signed up for your account.</small>
            <form action="#" method="post" class="flex flex-wrap gap-5">
                <div>
                    <label for="email" class=" font-semibold ">Email</label>
                    <br>
                    <input type="text" id = "email" class=" w-60 h-9 outline-none border border-slate-600 rounded-md text-center" required placeholder="email">
                </div>
                <small>We will send you and email that will allow you to reset password.</small>
                <div><Button class=" bg-emerald-700 w-40  rounded-md h-10 font-semibold text-sm text-zinc-100">Reset password</Button></div>
            </form>
           </div>
        </div>
    </template>
        
        <style>
            div{
                font-family: 'Poppins', sans-serif;
            }
        </style>