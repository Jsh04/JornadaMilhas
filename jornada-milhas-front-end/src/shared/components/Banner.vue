<template>
    <section class="relative overflow-hidden">
        <div  :style="{ backgroundImage: `url(${props.urlImage})` }" class="bg-cover bg-center bg-no-repeat" :class="heightClass"></div>
        <div class="absolute border-none inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
    </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    urlImage: {
        type: String,
        required: true,
    },
    heightClass: {
        type: String,
        required: false,
        default: () => 'h-35'
    }
})


</script>