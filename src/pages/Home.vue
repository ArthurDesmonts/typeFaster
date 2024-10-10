<script setup>

import TextComponent from "@/components/TextComponent.vue";
</script>

<template>
  <div class="bg-gray-700 h-max">
    <div id="top-part" class="container mx-auto">
        <h1 class="text-5xl font-extrabold justify-center uppercase text-center p-10">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-500">
            Type Faster
          </span>
        </h1>
    </div>
    <div id="main-content" class="container mx-auto px-4">
      <TextComponent/>
    </div>
  </div>
</template>

<style scoped>

</style>