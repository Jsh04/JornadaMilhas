<script setup lang="ts">
import HomeFooter from './views/home/components/HomeFooter.vue';
import HomeHeader from './views/home/components/HomeHeader.vue';

  
</script>

<template>
  <div class="h-screen grid grid-rows-[auto_1fr]">
    <HomeHeader />
    <main>
      <router-view></router-view>
    </main>
    <HomeFooter />
  </div>
 
  
</template>