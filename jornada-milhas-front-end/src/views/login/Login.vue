<template>
    <div class="flex flex-col h-full">
        <Banner :url-image="bannerImage" />
        <FormLogin />
    </div>
</template>

<script setup lang="ts">
import Banner from '../../shared/components/Banner.vue';
import bannerImage from '../../assets/Banner-Login.png';
import FormLogin from './components/FormLogin.vue';

</script>

<style scoped>

</style>
