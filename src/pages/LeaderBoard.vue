<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const classmentList = ref([]);

async function getClassment() {
  try {
    const response = await axios.get("https://api-rest-text-game.vercel.app/get/classment");
    classmentList.value = response.data.classement;
    console.log(response.data.classement);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getClassment();
});

</script>

<template>
  <div class="container mx-auto">
    <div id="top-part" class="container mx-auto">
      <h1 class="text-5xl font-extrabold justify-center uppercase text-center p-10">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-customYellow-500 to-customOrange-500">
            Classement général
          </span>
      </h1>
    </div>
    <div class="flex flex-col my-10">
      <div class="flex justify-between">
        <p>Rank</p>
        <p>Pseudo</p>
        <p>WPM</p>
      </div>
      <div v-for="(user,index) in classmentList" :key="user.userId" class="flex justify-between">
        <p>{{ index + 1 }}</p>
        <p>{{ user.user }}</p>
        <p>{{ user.wpm }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>