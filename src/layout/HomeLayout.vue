<template>
    <main class="bg-blackCurrent w-screen h-screen justify-center items-center p-20 relative grid grid-cols-2 gap-x-6 max-[700px]:flex max-[700px]:flex-col max-[700px]:h-full max-[700px]:w-full max-[700px]:gap-y-36">
        <section class="z-20">
            <h1 class="text-white text-4xl font-rubik w-full text-center font-bold">WELCOME</h1>
            <br>
            <p class="text-white font-rubik text-justify indent-4 whitespace-break-spaces text-xl">
                A Fixed Asset Management System is a set of processes and tools designed to track, manage, and optimize an organization's fixed assets throughout their lifecycle. Fixed assets typically include physical items such as buildings, machinery, equipment, vehicles, and other long-term assets that hold value for the organization.
            </p>
        </section>
        <section class="z-10">
            <div class="w-full text-center text-white">
                <font-awesome-icon icon="fa-solid fa-shrimp" size="10x"/>
            </div>
        </section>
        <section class="fixed -top-20 -right-20">
            <div class="w-96 h-96 rounded-full border-4 border-dashed overflow-hidden p-2 animate-[spin_40s_linear_infinite]">
            </div>
        </section>
        <section class="fixed -top-24 -right-24">
            <div class="bg-mintHunt w-[375px] h-[375px] rounded-full flex justify-center items-center"/>
        </section>
        <section class="fixed -top-20 -right-20">
            <div class="w-[500px] h-[500px] border-4 border-dashed rounded-full "/>
        </section>
        <section class="fixed -top-20 -right-20">
            <div class="w-[400px] h-[600px] border-4 border-dashed rounded-full"/>
        </section>
        <section class="w-full flex justify-center col-span-2">
            <router-link to="/login">
                <button class="bg-indigo-500 text-white w-40 h-10 rounded font-rubik hover:bg-indigo-700 duration-300">
                        Login
                </button>
            </router-link>
        </section>
    </main>
</template>