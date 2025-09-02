<template>
    <div class="flex flex-col h-full">
        <Banner :url-image="bannerImage" />
        <section class="flex-1 flex justify-center items-center">
            <article class="min-h-[60vh] min-w-[45vw] inset-shadow-sm rounded-xl grid grid-rows-[1fr_auto] p-4" >
                <div class="grid grid-cols-2 items-center">
                    <div class="bg-[url(/src/assets/Simbolo-laranja.png)] bg-cover bg-center bg-no-repeat w-[200px] h-[200px] place-self-center"></div>
                    <div class="grid grid-rows-3 gap-y-4">
                        <div>
                            <h2 class="text-3xl text-[#1D1B20] font-normal">Login</h2>
                        </div>
                        <div>
                            <InputText />
                        </div>
                        <div>
                            <InputText />
                        </div>
                    </div>
                    <div></div>
                </div>
                <div>
                    <p>Ainda não possui sua conta? 
                        <router-link to="/">Clique aqui para se cadastrar!</router-link> 
                    </p>
                </div>
            </article>
        </section>
    </div>
</template>

<script setup lang="ts">
import Banner from '../../shared/components/Banner.vue';
import bannerImage from '../../assets/Banner-Login.png';
import InputText from '../../shared/components/inputs/InputText.vue';


</script>

<style scoped>

</style>
