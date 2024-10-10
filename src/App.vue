<script setup>
import '@/assets/tailwind.css'
import TextComponent from '@/components/TextComponent.vue'
import NavBar from "@/components/NavBar.vue";

</script>

<template>
  <NavBar></NavBar>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
</style>
