<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Prompt:wght@100&display=swap" rel="stylesheet">
  <header class="w-full font-bold">
    <nav class="w-full  flex justify-around items-center bg-slate-700 h-10 text-zinc-100">
     <h1>Asset Management</h1>
      <ul class="flex justify-evenly items-center  gap-10">
        <li><router-link to="/">Asset</router-link></li>
        <li><router-link to="/">Master Asset</router-link></li>
        <li><router-link to="/">Category</router-link></li>
      </ul>
     <h1><router-link to="/login">Login</router-link></h1>
    </nav>
  </header>
  <router-view/>
</template>

<style>
header{
  font-family: 'Poppins', sans-serif;
}
</style>
