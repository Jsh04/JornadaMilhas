<template>
    <section class="flex-1 flex justify-center items-center">
        <article class="min-h-[50vh] min-w-[40vw] inset-shadow-sm rounded-xl grid grid-rows-[1fr_auto] p-4">
            <div class="grid grid-cols-2 items-center">
                <div
                    class="bg-[url(/src/assets/Simbolo-laranja.png)] bg-cover bg-center bg-no-repeat w-[200px] h-[200px] place-self-center">
                </div>
                <div class="grid grid-rows-3 gap-y-4">
                    <div>
                        <h2 class="text-3xl text-[#1D1B20] font-normal">Login</h2>
                    </div>
                    <div>
                        <InputText id-input="emailOrCpf" placeholder-input="Digite seu e-mail ou CPF"
                            label-input="E-mail ou CPF" v-model="loginInputModel.loginData" />
                    </div>
                    <div>
                        <InputText id-input="password" type-input="password" placeholder-input="Digite sua senha" label-input="Senha "
                            v-model="loginInputModel.password" />
                    </div>
                    <div>
                        <ButtonPrimary button-text="ACESSAR MINHA CONTA" :complemnetary-class="['w-full']" />
                    </div>
                </div>
            </div>
            <div class="text-center text-xl">
                <p>Ainda não possui sua conta?
                    <router-link to="/" class="text-black font-bold underline">Clique aqui para se cadastrar!</router-link>
                </p>
            </div>
        </article>
    </section>
</template>

<script setup lang="ts">
import InputText from '../../../shared/components/inputs/InputText.vue';
import { LoginViewModel } from '../../../application/useCases/LoginUseCase/LoginViewModel';
import { ref } from 'vue';
import ButtonPrimary from '../../../shared/components/buttons/ButtonPrimary.vue';

const loginInputModel = ref<LoginViewModel>(new LoginViewModel());

</script>

<style scoped></style>