<template>
    <div class="relative w-full">
        <label :for="id" class="absolute left-4 -top-2 px-1 bg-white text-gray-500 text-base focus:text-purple-primary">
            {{ label }}
        </label>

        <select :id="id" v-model="inputValue" class="input-text-primary cursor-pointer appearance-none transition-all duration-200" :class="{ 'text-gray-900': modelValue }" @change="emits('change')">
            <option value="" disabled>{{ placeholder }}</option>
            <option v-for="option in listOptions" :key="option.value" :value="option.value">{{ option.name }}</option>
        </select>

        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>

        <slot name="validation"></slot>
    </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type ISelectOption from '../interfaces/ISelectOption';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  listOptions: {
    type: Array as PropType<ISelectOption[]>,
    required: true,
    default: [{ value: "0", name: "Defina as opções"  }] as ISelectOption[]
  },
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Selecione uma opção'
  }
})

const emits = defineEmits(['update:modelValue', 'change']);

const inputValue = computed({
    get: () => props.modelValue,
    set: (newValue: string) => emits("update:modelValue", newValue)
});
</script>

<style scoped></style>