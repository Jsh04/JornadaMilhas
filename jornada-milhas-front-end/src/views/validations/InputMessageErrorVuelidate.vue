<template>
    <div class="relative">
        <slot name="customDivValidation">
            <Transition enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform -translate-y-2 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-2 opacity-0">
                <div v-if="props.validateObject && props.validateObject.$error"
                    class="absolute top-full z-10 text-left">
                    <span class="text-red-400 text-sm text-left">{{
                        props.validateObject.$errors[0].$message
                        }}</span>
                </div>
            </Transition>
        </slot>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    validateObject: {
        type: Object,
        required: true
    }
})
</script>
