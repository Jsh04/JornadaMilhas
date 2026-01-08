<template>
  <section class="p-4">
    <div class="shadow-container w-full p-8 ">
      <h2 class="text-4xl text-center font-medium mb-8">Crie sua conta</h2>
      <form @submit.prevent="handlerSubmit()" class="space-y-8 md:space-y-6">
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
          <InputText type-input="text" :label-input="'Cidade: '" v-model="registerCustomerViewModel.city"
            id-input="state" />
          <Select v-model="registerCustomerViewModel.state" id="'state'" label="Estado" :list-options="refListOptions" :placeholder="'Selecione seu estado'" >
          </Select>
        </div>
        <div class="flex flex-col md:grid md:grid-cols-2 gap-8">
          <InputText type-input="email" :label-input="'Email: '" v-model="registerCustomerViewModel.email"
            id-input="email" />
          <InputText type-input="email" :label-input="'Confirmar e-mail: '" v-model="registerCustomerViewModel.emailConfirm"
            id-input="emailConfirm" />
        </div>
        <div class="flex flex-col md:grid md:grid-cols-2 gap-8">
          <InputText type-input="password" :label-input="'Senha: '" v-model="registerCustomerViewModel.password"
            id-input="password" />
          <InputText type-input="password" :label-input="'Confirmar Senha: '" v-model="registerCustomerViewModel.passwordConfirm"
            id-input="passwordConfirm" />
        </div>
        <div class="flex gap-x-4 ">
           <Checkbox v-model="registerCustomerViewModel.confirmrReadTerms" binary input-id="confirmrReadTerms" />
           <label for="confirmrReadTerms">Li e aceito os termos e condições deste cadastro.</label>
        </div>
        <div class="flex justify-center">
          <ButtonPrimary :button-text="'Criar minha conta'" type-button="submit" :complemnetary-class="['uppercase']"/>
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
import Select from '../../../shared/components/selects/Select.vue';
import type ISelectOption from '../../../shared/components/interfaces/ISelectOption';
import Checkbox from 'primevue/checkbox'
import ButtonPrimary from '../../../shared/components/buttons/ButtonPrimary.vue';

const listsTypesGenre = [
  { name: "Masculino", key: '1' },
  { name: "Feminino", key: '2' },
  { name: "Prefiro não informar", key: '3' }
]

const listOptionsSelectState: ISelectOption[] = [
  { value: 'AC', name: 'Acre' },
  { value: 'AL', name: 'Alagoas' },
  { value: 'AP', name: 'Amapá' },
  { value: 'AM', name: 'Amazonas' },
  { value: 'BA', name: 'Bahia' },
  { value: 'CE', name: 'Ceará' },
  { value: 'DF', name: 'Distrito Federal' },
  { value: 'ES', name: 'Espírito Santo' },
  { value: 'GO', name: 'Goiás' },
  { value: 'MA', name: 'Maranhão' },
  { value: 'MT', name: 'Mato Grosso' },
  { value: 'MS', name: 'Mato Grosso do Sul' },
  { value: 'MG', name: 'Minas Gerais' },
  { value: 'PA', name: 'Pará' },
  { value: 'PB', name: 'Paraíba' },
  { value: 'PR', name: 'Paraná' },
  { value: 'PE', name: 'Pernambuco' },
  { value: 'PI', name: 'Piauí' },
  { value: 'RJ', name: 'Rio de Janeiro' },
  { value: 'RN', name: 'Rio Grande do Norte' },
  { value: 'RS', name: 'Rio Grande do Sul' },
  { value: 'RO', name: 'Rondônia' },
  { value: 'RR', name: 'Roraima' },
  { value: 'SC', name: 'Santa Catarina' },
  { value: 'SP', name: 'São Paulo' },
  { value: 'SE', name: 'Sergipe' },
  { value: 'TO', name: 'Tocantins' }
];

const refListOptions = ref<ISelectOption[]>(listOptionsSelectState)

const registerCustomerViewModel = ref<RegisterCustomerViewModel>(new RegisterCustomerViewModel());

const handlerSubmit = () => {
  console.log('Funcionando o click');
}

</script>