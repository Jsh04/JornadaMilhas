<template>
    <section class="flex-1 flex justify-center items-center">
        <Loading is-full-page v-model:active="isLoading" loader="spinner" :can-cancel="false" :color="'#6750A4'"> </Loading>
        <article class="min-h-[50vh] min-w-[40vw] shadow-container rounded-xl grid grid-rows-[1fr_auto] p-8">
            <div class="grid grid-cols-2 items-center p-4">
                <div
                    class="bg-[url(/src/assets/Simbolo-laranja.png)] bg-cover bg-center bg-no-repeat w-[200px] h-[200px] place-self-center">
                </div>
                <div class="grid grid-rows-3 gap-y-8">
                    <div>
                        <h2 class="text-3xl text-[#1D1B20] font-medium">Login</h2>
                    </div>
                    <div>
                        <InputText id-input="emailOrCpf" placeholder-input="Digite seu e-mail ou CPF"
                            label-input="E-mail ou CPF" v-model="loginInputModel.loginData"
                            @blur="vuelidateObject.loginData.$touch()" />
                        <InputMessageErrorVuelidate :validate-object="vuelidateObject.loginData" />
                    </div>
                    <div>
                        <InputText id-input="password" type-input="password" placeholder-input="Digite sua senha"
                            label-input="Senha " v-model="loginInputModel.password"
                            @blur="vuelidateObject.password.$touch()" />
                        <InputMessageErrorVuelidate :validate-object="vuelidateObject.password" />

                    </div>
                    <div>
                        <ButtonPrimary button-text="ACESSAR MINHA CONTA" :complemnetary-class="['w-full']"
                            @click="sendLoginToBack()" />
                    </div>
                </div>
            </div>
            <div class="text-center text-xl">
                <p>Ainda não possui sua conta?
                    <router-link to="/" class="text-black font-bold underline">Clique aqui para se
                        cadastrar!</router-link>
                </p>
            </div>
        </article>
    </section>
</template>

<script setup lang="ts">
import Loading from 'vue-loading-overlay';
import InputText from '../../../shared/components/inputs/InputText.vue';
import { LoginViewModel } from '../../../application/useCases/LoginUseCase/LoginViewModel';
import { computed, inject, ref } from 'vue';
import ButtonPrimary from '../../../shared/components/buttons/ButtonPrimary.vue';
import useVuelidate from '@vuelidate/core';
import { loginValidation } from '../validations/LoginValidation';
import type IUserFacade from '../../../application/facades/User/IUserFacade';
import { InjectionKeys } from '../../../constants/ServiceInjectionKeys';
import InputMessageErrorVuelidate from '../../../shared/components/validators/InputMessageErrorVuelidate.vue';


const userFacade = inject<IUserFacade>(InjectionKeys.UserFacade);

if (!userFacade)
    throw new Error('Cannot resolve UserFacade')

const isLoading = ref<boolean>(false);

const loginInputModel = ref<LoginViewModel>(new LoginViewModel());

const rules = computed(() => loginValidation());

const vuelidateObject = useVuelidate<LoginViewModel>(
    rules,
    loginInputModel
);

const sendLoginToBack = async () => {
    isLoading.value = true;
    try {
        await userFacade.login(loginInputModel.value);
    } catch {
        
    } finally {
        isLoading.value = !isLoading.value
    }

}

</script>

<style scoped>
.shadow-container {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>