<template>
    <div class="flex flex-col h-full">
        <Banner :url-image="bannerImager" />
        <FormCustomerRegister />
    </div>
</template>

<script setup lang="ts">
import Banner from '../../shared/components/Banner.vue';
import bannerImager from '../../assets/Banner cadastro.png'
import FormCustomerRegister from './components/FormCustomerRegister.vue';

</script>

<style scoped>

</style>