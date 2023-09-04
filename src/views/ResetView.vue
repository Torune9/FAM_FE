<template>
  <main>
    <div class=" w-screen h-screen flex justify-center items-center bg-slate-300">
       <div class="rounded-md flex justify-center items-center flex-wrap h-[300px] w-[300px] shadow-lg bg-slate-700 text-zinc-200">
        <h1 class=" text-2xl font-semibold ">Reset password</h1>
        <small>Fill up the field to change it  your password</small>
        <form action="#" method="post">
            <label for="password" class=" font-semibold ">Password</label>
            <br>
            <input type="password" id = "password" class=" w-60 h-8 outline-none border rounded-md text-center bg-transparent" required>
            <br>
            <br>
            <div><Button class=" bg-red-500 w-40  rounded-md h-10 font-semibold text-sm text-zinc-100">Reset password</Button></div>
        </form>
       </div>
    </div>
  </main>
</template>
<script>
</script>

<style>
</style>