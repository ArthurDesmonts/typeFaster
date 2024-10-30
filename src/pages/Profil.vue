<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import {format} from "date-fns";
import UserPerformanceChart from "@/components/UserPerformanceChart.vue";

const pseudo = ref("");
const dateInscription = ref("");
const classement = ref("");
const recordWPM = ref("");
const moyenneWPM = ref("");

const router = useRouter();
const route = useRoute();
const store = useStore();

const serverResponse = ref(false);

const setViewSignIn = () => {
  router.push('/typeFaster/signIn');
};

const setViewSignUp = () => {
  router.push('/typeFaster/signUp');
};

const disconectUser = () => {
  store.dispatch('logout', null);
  router.push('/typeFaster/profil');
};

async function fetchUserData() {
  try {
    if (store.state.userId !== null) {
      serverResponse.value = true;

      const response = await axios.get(`https://api-rest-text-game.vercel.app/user/userInfo?userId=${store.state.userId}`);

      serverResponse.value = false;

      pseudo.value = response.data.name;
      dateInscription.value = format(new Date(response.data.creationDate),'dd / MM / yyyy');
      classement.value = response.data.classement;
      recordWPM.value = response.data.recordWPM;
      moyenneWPM.value = response.data.moyenneWPM;
      console.log(response.data);
    }
  } catch (error) {
    console.error(error);
  }
}

async function getClassmentIndex() {
  try {
    await axios.get("https://api-rest-text-game.vercel.app/get/classment");
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  const queryUserId = route.query.userId;
  if (queryUserId) {
    store.dispatch('updateUserId', queryUserId);
  }
  fetchUserData();
  getClassmentIndex();
});

watch(() => store.state.userId, () => {
  fetchUserData();
});
</script>

<template>
  <div id="top-part" class="container mx-auto">
    <div>
      <h1 class="text-5xl font-extrabold justify-center uppercase text-center p-10">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-customYellow-500 to-customOrange-500">
            Profil
          </span>
      </h1>
    </div>
    <div v-if="store.state.connected" class="grid grid-cols-3 gap-4 bg-gray-900 rounded p-4 border-2 border-customOrange-500">
      <div v-if="serverResponse" class="grid col-span-3">
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
      </div>
      <div v-if="!serverResponse" class="flex flex-col justify-between">
        <h1 class="font-bold text-customYellow-600 text-center">{{ pseudo }}</h1>
        <h3 class="text-center">Date d'inscription : <span class="text-customOrange-500">{{ dateInscription }}</span></h3>
      </div>
      <div v-if="!serverResponse" class="flex flex-col">
        <h3>Classement : <span class="text-customOrange-500">{{ classement }}</span></h3>
        <h3>Record de WPM : <span class="text-customOrange-500">{{ recordWPM }}</span></h3>
        <h3>Moyenne de WPM : <span class="text-customOrange-500">{{ moyenneWPM }}</span></h3>
      </div>
      <div v-if="!serverResponse" class="flex justify-end">
        <button @click="disconectUser" class="btn btn-primary h-max bg-customOrange-500 rounded text-customBlue-900 p-2 hover:bg-customOrange-600">Déconnexion</button>
      </div>
    </div>
    <div v-if="store.state.connected" class="flex justify-center w-full bg-gray-900 rounded p-4 border-2 border-customOrange-500 mt-5">
      <div v-if="serverResponse" class="grid col-span-3">
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
      </div>
      <UserPerformanceChart v-if="!serverResponse"></UserPerformanceChart>
    </div>
    <div id="connectionChoice" v-else class="w-full flex justify-center">
      <div class="flex flex-col gap-6 w-fit mt-20 rounded text-customOrange-500 bg-customBlue-900 p-6">
        <h3 class="text-center font-extrabold">Veillez vous connecter</h3>
        <hr>
        <div class="flex flex-row gap-6 w-full justify-center">
          <button @click="setViewSignIn" class="btn btn-primary bg-customOrange-500 rounded text-customBlue-900 p-2">Se connecter</button>
          <button @click="setViewSignUp" class="btn btn-primary bg-customOrange-500 rounded text-customBlue-900 p-2">S'inscrire</button>
        </div>
      </div>
    </div>
  </div>
</template>