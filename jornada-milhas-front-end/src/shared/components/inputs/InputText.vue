<template>
    <div class="relative">
        <input type="text" id="email" placeholder="Digite seu e-mail ou CPF" class="w-full border-2 border-gray-400 rounded-lg px-3 py-4
                 focus:border-purple-600 focus:outline-none" />
        <label for="email" class="absolute left-4 -top-2 px-1 bg-white text-gray-500 text-sm ">
            {{ labelInput }}
        </label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: String,
    },
    labelInput: {
        type: String,
        required: true,
        default: () => "Label"
    }
})
</script>

<style scoped></style>