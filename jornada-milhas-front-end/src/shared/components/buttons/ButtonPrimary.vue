<template>
    <div>
        <button :type="typeButton" class="btn-primary-purple" :class="complemnetaryClass" >{{ buttonText }}</button>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
    typeButton: {
        type: String as PropType<"button" | "submit" | "reset" | undefined>,
        required: false,
        default: () => "button"
    },
    complemnetaryClass: {
        type: Array as PropType<string[]>,
        required: false,
        default: () => []
    },
    buttonText: {
        type: String,
        required: true,
    }
});
</script>

<style scoped>

</style>