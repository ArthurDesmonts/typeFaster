<script setup>
import '@/assets/tailwind.css'
import TextComponent from '@/components/TextComponent.vue'

</script>

<template>
  <div class="bg-gray-700 h-screen">
    <div id="top-part" class="container mx-auto">
      <h1 class="text-yellow-600 font-bold text-4xl justify-center uppercase text-center p-10">Type Faster</h1>
    </div>
    <div id="main-content" class="container mx-auto px-4">
      <TextComponent/>
    </div>
  </div>
</template>

<style scoped>
</style>
