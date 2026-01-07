<template>
  <section class="p-4">
    <div class="shadow-container w-full p-8 ">
      <h2 class="text-4xl text-center font-medium mb-6">Crie sua conta</h2>
      <form @submit.prevent="" class="space-y-8 md:space-y-6">
        <InputText type-input="text" v-model="registerCustomerViewModel.name" label-input="Nome: " id-input="name"
          :placeholder-input="'Digite seu nome completo'" />
        <div class="flex flex-col md:grid md:grid-cols-2 gap-8">
          <InputText type-input="date" :label-input="'Data de Nascimento: '" v-model="registerCustomerViewModel.dtBirth"
            id-input="dtBirth" />
          <div class="flex flex-col md:flex-row gap-y-2 ">
            <p class="text-[#49454F]">Gênero: </p>
            <div v-for="genres in listsTypesGenre" :key="genres.key" class="flex items-center gap-2">
              <RadioButton v-model="registerCustomerViewModel.genre" :inputId="genres.key" name="dynamic"
                :value="genres.name" />
              <label :for="genres.key">{{ genres.name }}</label>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:grid md:grid-cols-2 gap-8">
          <InputText type-input="text" :label-input="'CPF: '" v-model="registerCustomerViewModel.cpf"
            id-input="cpf" />
          <InputText type-input="text" :label-input="'Telefone: '" v-model="registerCustomerViewModel.phone"
            id-input="phone" />
        </div>
        <div class="flex flex-col md:grid md:grid-cols-2 gap-8">
          <InputText type-input="text" :label-input="'Cidade: '" v-model="registerCustomerViewModel.state"
            id-input="state" />

        </div>
      </form>
    </div>

  </section>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import InputText from '../../../shared/components/inputs/InputText.vue';
import { RegisterCustomerViewModel } from '../../../application/useCases/RegisterCustomerUseCase/RegisterCustomerViewModel';
import RadioButton from 'primevue/radiobutton';

const listsTypesGenre = [
  { name: "Masculino", key: '1' },
  { name: "Feminino", key: '2' },
  { name: "Prefiro não informar", key: '3' }
]

const registerCustomerViewModel = ref<RegisterCustomerViewModel>(new RegisterCustomerViewModel());

</script>