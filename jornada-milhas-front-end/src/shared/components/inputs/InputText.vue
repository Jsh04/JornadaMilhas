<template>
    <div>
        <div class="relative">
            <input 
                :type="typeInput" 
                :id="idInput" 
                :placeholder="placeholderInput" 
                v-model="inputValue"
                :class="complementaryClasses" 
                class="input-text-primary" 
                v-mask="maskPattern"
                v-if="maskPattern"
                @blur="emits('blur')" 
            />
            <input 
                :type="typeInput" 
                :id="idInput" 
                :placeholder="placeholderInput" 
                v-model="inputValue"
                :class="complementaryClasses" 
                class="input-text-primary" 
                v-else
                @blur="emits('blur')" 
            />
            <label :for="idInput"
                class="absolute left-4 -top-2 px-1 bg-white text-gray-500 text-base focus:text-purple-primary">
                {{ labelInput }}
            </label>
        </div>
        <slot name="validation"></slot>
    </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
        default: () => ''
    },
    labelInput: {
        type: String,
        required: true,
        default: () => "Label"
    },
    placeholderInput: {
        type: String,
        required: false,
    },
    idInput: {
        type: String,
        required: true,
    },
    typeInput: {
        type: String,
        required: false,
        default: () => "text"
    },
    maskPattern: {
        type: String,
        required: false,
        default: () => ''
    },
    complementaryClasses: {
        type: Array as PropType<string[]>,
    }
})

const emits = defineEmits(['update:modelValue', 'blur', 'click', 'focus']);

const inputValue = computed({
    get: () => props.modelValue,
    set: (newValue: string) => emits("update:modelValue", newValue)
});

</script>