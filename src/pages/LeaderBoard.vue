<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const classmentList = ref([]);

const serverResponse = ref(false);

async function getClassment() {
  serverResponse.value = true;
  try {
    const response = await axios.get("https://api-rest-text-game.vercel.app/get/classment");

    serverResponse.value = false;

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
        <tr v-if="serverResponse">
          <td colspan="3" class="px-6 py-4 whitespace-nowrap text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="mx-auto" width="100" height="100">
              <circle fill="#FF7637" stroke="#FF7637" stroke-width="6" r="15" cx="40" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
              </circle>
              <circle fill="#FF7637" stroke="#FF7637" stroke-width="6" r="15" cx="100" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
              </circle>
              <circle fill="#FF7637" stroke="#FF7637" stroke-width="6" r="15" cx="160" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
              </circle>
            </svg>
          </td>
        </tr>
        <tr v-else v-for="(user, index) in classmentList" :key="user.userId">
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