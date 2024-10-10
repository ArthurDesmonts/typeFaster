<script setup>
import '@/assets/tailwind.css'
import TextComponent from '@/components/TextComponent.vue'
import NavBar from "@/components/NavBar.vue";

</script>

<template>
  <div class="flex">
    <NavBar></NavBar>
    <div class="flex-grow">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
</style>
