<script setup>
import '@/assets/tailwind.css'
import NavBar from "@/components/NavBar.vue";

</script>

<template>
  <div class="flex bg-gray-700 text-gray-100">
    <NavBar></NavBar>
    <div class="flex-grow">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
</style>
