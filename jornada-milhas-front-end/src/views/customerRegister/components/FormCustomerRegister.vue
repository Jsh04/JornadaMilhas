<template>
  <section class="p-4 md:p-8 flex justify-center">
    <Loading is-full-page v-model:active="isLoading" loader="spinner" :can-cancel="false" :color="'#6750A4'"> </Loading>
    <div class="shadow-container w-full md:w-auto md:max-w-[800px] p-8 ">
      <h2 class="text-4xl text-center font-medium mb-8">Crie sua conta</h2>
      <form @submit.prevent="handlerSubmit()" class="space-y-8 md:space-y-6">
        <InputText type-input="text" v-model="registerCustomerViewModel.name" label-input="Nome*: " id-input="name"
          :placeholder-input="'Digite seu nome completo'" @blur="vuelidateObject.name.$touch()">
          <template #validation>
            <InputMessageErrorVuelidate :validate-object="vuelidateObject.name" />
          </template>
        </InputText>
        <div class="flex flex-col md:grid md:grid-cols-2 gap-8">
          <InputText type-input="date" :label-input="'Data de Nascimento*: '"
            v-model="registerCustomerViewModel.dtBirth" id-input="dtBirth" @blur="vuelidateObject.dtBirth.$touch()">
            <template #validation>
              <InputMessageErrorVuelidate :validate-object="vuelidateObject.dtBirth" />
            </template>
          </InputText>
          <div>
            <p class="text-[#49454F]">Gênero: </p>
            <div class="flex flex-col md:flex-row gap-4 ">
              <div v-for="genres in listsTypesGenre" :key="genres.key" class="flex items-center gap-2">
                <RadioButton v-model="registerCustomerViewModel.genre" :inputId="genres.key" name="genre"
                  :value="genres.key" />
                <label :for="genres.key">{{ genres.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:grid md:grid-cols-2 gap-8">
          <InputText type-input="text" :label-input="'CPF: '" v-model="registerCustomerViewModel.cpf" id-input="cpf"
            :mask-pattern="'###.###.###-##'" @blur="vuelidateObject.cpf.$touch()">
            <template #validation>
              <InputMessageErrorVuelidate :validate-object="vuelidateObject.cpf" />
            </template>
          </InputText>
          <InputText type-input="text" :label-input="'Telefone: '" :mask-pattern="'(##) #####-####'"
            v-model="registerCustomerViewModel.phone" id-input="phone" @blur="vuelidateObject.phone.$touch()">
            <template #validation>
              <InputMessageErrorVuelidate :validate-object="vuelidateObject.phone" />
            </template>
          </InputText>
        </div>
        <div class="flex flex-col md:grid md:grid-cols-2 gap-8">
          <InputText type-input="text" :label-input="'Cidade: '" v-model="registerCustomerViewModel.city"
            id-input="state" @blur="vuelidateObject.city.$touch()">
            <template #validation>
              <InputMessageErrorVuelidate :validate-object="vuelidateObject.city" />
            </template>
          </InputText>
          <Select v-model="registerCustomerViewModel.state" id="'state'" label="Estado" :list-options="refListOptions"
            :placeholder="'Selecione seu estado'" @change="vuelidateObject.state.$touch()">
            <template #validation>
              <InputMessageErrorVuelidate :validate-object="vuelidateObject.state" />
            </template>
          </Select>

        </div>
        <div class="flex flex-col md:grid md:grid-cols-2 gap-8">
          <InputText type-input="email" :label-input="'Email: '" v-model="registerCustomerViewModel.email"
            id-input="email" @blur="vuelidateObject.email.$touch()">
            <template #validation>
              <InputMessageErrorVuelidate :validate-object="vuelidateObject.email" />
            </template>
          </InputText>
          <InputText type-input="email" :label-input="'Confirmar e-mail: '"
            v-model="registerCustomerViewModel.emailConfirm" id-input="emailConfirm"
            @blur="vuelidateObject.emailConfirm.$touch()">
            <template #validation>
              <InputMessageErrorVuelidate :validate-object="vuelidateObject.emailConfirm" />
            </template>
          </InputText>
        </div>
        <div class="flex flex-col md:grid md:grid-cols-2 gap-8">
          <InputText type-input="password" :label-input="'Senha: '" v-model="registerCustomerViewModel.password"
            id-input="password" @blur="vuelidateObject.password.$touch()">
            <template #validation>
              <InputMessageErrorVuelidate :validate-object="vuelidateObject.password" />
            </template>
          </InputText>

          <InputText type-input="password" :label-input="'Confirmar Senha: '"
            v-model="registerCustomerViewModel.passwordConfirm" id-input="passwordConfirm"
            @blur="vuelidateObject.passwordConfirm.$touch()">
            <template #validation>
              <InputMessageErrorVuelidate :validate-object="vuelidateObject.passwordConfirm" />
            </template>
          </InputText>
        </div>
        <div class="flex gap-x-4 ">
          <Checkbox v-model="registerCustomerViewModel.confirmrReadTerms" binary input-id="confirmrReadTerms" />
          <label for="confirmrReadTerms">Li e aceito os termos e condições deste cadastro.</label>
        </div>
        <div class="flex justify-center">
          <ButtonPrimary :button-text="'Criar minha conta'" type-button="submit" :complemnetary-class="['uppercase']" />
        </div>
      </form>
    </div>

  </section>
</template>

<script setup lang="ts">

import { computed, inject, ref } from 'vue';
import InputText from '../../../shared/components/inputs/InputText.vue';
import { RegisterCustomerViewModel } from '../../../application/useCases/RegisterCustomerUseCase/RegisterCustomerViewModel';
import RadioButton from 'primevue/radiobutton';
import Select from '../../../shared/components/selects/Select.vue';
import type ISelectOption from '../../../shared/components/interfaces/ISelectOption';
import Checkbox from 'primevue/checkbox'
import ButtonPrimary from '../../../shared/components/buttons/ButtonPrimary.vue';
import CustomerRegisterValidation from '../validations/CustomerRegisterValidation';
import useVuelidate from '@vuelidate/core';
import InputMessageErrorVuelidate from '../../../shared/components/validators/InputMessageErrorVuelidate.vue';
import type { INotificationService } from '../../../application/interfaces/services/INotificationService';
import { InjectionKeys } from '../../../constants/ServiceInjectionKeys';
import Loading from 'vue-loading-overlay';
import type IUserFacade from '../../../application/facades/User/IUserFacade';

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

const notificationAlertService = inject<INotificationService>(InjectionKeys.NotificationService);
const userFacade = inject<IUserFacade>(InjectionKeys.UserFacade);

if (!userFacade || !notificationAlertService)
    throw new Error('Cannot resolve UserFacade Or notificationAlertService')

const refListOptions = ref<ISelectOption[]>(listOptionsSelectState)

const registerCustomerViewModel = ref<RegisterCustomerViewModel>(new RegisterCustomerViewModel());

const isLoading = ref<boolean>(false);

const rules = computed(() => CustomerRegisterValidation(registerCustomerViewModel.value));

const vuelidateObject = useVuelidate<RegisterCustomerViewModel>(
  rules,
  registerCustomerViewModel
);

const handlerSubmit = async () => {
  const objectSendForms = registerCustomerViewModel.value;

  if (!objectSendForms.confirmrReadTerms) {
    await notificationAlertService.showWarning('Por favor, confirme que você leu nossos termos e condições', "")
    return;
  }

  if(vuelidateObject.value.$invalid){
    await notificationAlertService.showError('Formulário inválido, verifique as informações e tente novamente', "")
    return;
  }

  isLoading.value = true;

  try {
    const resultRegister = await userFacade.customerRegister(objectSendForms);

    isLoading.value = false;

    if (resultRegister.isSuccess)
      await notificationAlertService.showSuccess("Usuário cadastrado com sucesso")
    else
      await notificationAlertService.showError(resultRegister.error.message, "");

  } finally {
    isLoading.value = false;
  }
}
</script>