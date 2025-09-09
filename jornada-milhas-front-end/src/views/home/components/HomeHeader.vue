<template>
    <header class="grid grid-cols-2 bg-black p-4">
        <router-link to="/" class="place-items-center cursor-pointer">
            <img class="" src="../../../assets/Logo-branco-1.png" alt="Logo do Jornada Milhas" srcset="">
        </router-link>
        <div class="place-items-start flex items-center gap-x-8">
            <div>
                <button type="button" class="text-white text-base cursor-pointer">Vender milhas</button>
            </div>
            <div><button type="button" class="text-white text-base cursor-pointer">Sobre</button></div>
            <div>
                <button type="button" class="btn-primary-purple">Cadastre-se</button></div>
            <div>
                <router-link to="/login" type="button"
                    class="uppercase text-purple-primary text-base border border-[#79747E] px-5 py-2 rounded-md cursor-pointer">Login</router-link>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">

</script>
