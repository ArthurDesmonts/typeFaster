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
    <div class="container mb-10 mx-auto rounded overflow-hidden drop-shadow-3xl">
      <table class="min-w-full divide-y divide-gray-800">
        <thead class="bg-gray-950">
        <tr>
          <th scope="col" class="px-1 py-3 text-xs font-medium text-white uppercase tracking-wider text-center">
            Rank
          </th>
          <th scope="col" class="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider text-center">
            Pseudo
          </th>
          <th scope="col" class="px-1 py-3 text-xs font-medium text-white uppercase tracking-wider text-center">
            WPM
          </th>
        </tr>
        </thead>
        <tbody class="bg-gray-900 divide-y divide-gray-800">
        <tr v-for="(user, index) in classmentList" :key="user.userId">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-customOrange-500">{{ index + 1 }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-customOrange-500 font-bold">{{ user.user }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-customOrange-500">{{ user.wpm }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>