<template>
<header>
        <nav class="absolute right-0 bg-blueHunt top-0 w-4/5 flex justify-end h-14 items-center">
       <div class="flex flex-wrap justify-center items-center gap-4 w-[30%]">
        <h1 class=" text-zinc-200 font-semibold" v-text="user.username ? user.username : 'User'"></h1>
        <div class=" ">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" id="user"><g transform="translate(0 -1020.362)"><circle cx="16" cy="1036.362" r="16" fill="#424242" fill-rule="evenodd"></circle><path fill="#1f212a" style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M18.758 31.758a16 16 0 0 0 1.521-.342 16 16 0 0 0 1.518-.504 16 16 0 0 0 1.46-.652 16 16 0 0 0 1.388-.797 16 16 0 0 0 1.3-.93 16 16 0 0 0 1.201-1.054 16 16 0 0 0 1.092-1.172 16 16 0 0 0 .967-1.272 16 16 0 0 0 .836-1.365 16 16 0 0 0 .607-1.26L18.12 9.88A2.99 2.99 0 0 0 16 9c-1.652 0-3 1.348-3 3 0 .826.337 1.576.88 2.12l1.891 1.89C12.047 16.113 9 18.704 9 22l9.758 9.758z" color="#000" font-family="sans-serif" font-weight="400" transform="translate(0 1020.362)"></path><path fill="#fff" style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M8 2C6.348 2 5 3.348 5 5s1.348 3 3 3 3-1.348 3-3-1.348-3-3-3Zm0 .857c1.189 0 2.143.954 2.143 2.143A2.138 2.138 0 0 1 8 7.145 2.138 2.138 0 0 1 5.857 5c0-1.188.954-2.143 2.143-2.143ZM8 9c-3.828 0-7 2.636-7 6h1c0-2.73 2.626-5 6-5s6 2.27 6 5h1c0-3.364-3.172-6-7-6Z" color="#000" font-family="sans-serif" font-weight="400" overflow="visible" transform="translate(8 1027.362)"></path></g></svg>
        </div>
        <div class="">
          <button @click="logout" class="text-white border-2 border-white rounded p-2 text-[12px] font-semibold hover:bg-white hover:text-black hover:font-bold  hover:transition-all">logout</button>
        </div>
       </div>
    </nav>
</header>  
</template>

<script setup>
  import {loginStore} from '../store/loginStore'
  import {reactive} from 'vue'
  
  const auth = loginStore()
  const user = reactive({
    username : ''
  })
  if (auth) {
    user.username = auth.user.username
  }

  const logout = ()=>{
    auth.logout()
  }

</script>