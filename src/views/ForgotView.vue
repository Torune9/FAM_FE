<script setup>

</script>
<template>
  <main>
        <div class=" w-screen h-screen flex justify-center items-center bg-slate-300">
           <div class="rounded-md flex justify-center items-center flex-wrap h-[400px] w-[400px] p-4 shadow-lg bg-slate-800 text-zinc-200 relative">
            <h1 class=" text-2xl font-semibold mb-9">Forgot password</h1>
            <small class=" mb-4">Please provide your email addres that you used when you signed up for your account.</small>
            <form action="#" method="post" class="flex flex-wrap gap-5">
                <div>
                    <label for="email" class=" font-semibold ">Email</label>
                    <br>
                    <input type="text" id = "email" class=" w-60 h-9 outline-none border border-slate-600 rounded-md text-center text-sm bg-transparent" required placeholder="email">
                </div>
                <small>We will send you and email that will allow you to reset password.</small>
                <div><Button class=" bg-yellow-500 w-40  rounded-md h-10 font-semibold text-sm text-zinc-100">Reset password</Button>
                </div>
              </form>
              <div class="relative">
               <small class="before:absolute before:bottom-0 before:contents[''] before:bg-white before:h-[2px] before:w-[34px] before:mr-3 active:text-white before:scale-x-0 hover:before:scale-x-100 before:transition-transform active:scale-x-100 font-semibold"><router-link to="/">Login</router-link></small>
              </div>
           </div>
        </div>
  </main>
</template>
<style> 
 div{
  font-family: 'Poppins', sans-serif;
  }
</style>