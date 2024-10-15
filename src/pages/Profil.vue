<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";


const connected = ref(false);

const pseudo = ref("");
const dateInscription = ref("");
const classement = ref("");
const recordWPM = ref("");
const moyenneWPM = ref("");

const router = useRouter();

const setViewSignIn = () => {
  router.push('/typeFaster/signIn');
};

const setViewSignUp = () => {
  router.push('/typeFaster/signUp');
};

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
    <hr class="border-customOrange-500">
    <div v-if="connected" class="flex flex-col gap-4">
      <h1 class="font-bold text-customYellow-600 mt-10">{{ pseudo }}</h1>
      <h3 class="">Date d'inscription : <span class="text-red-600">{{ dateInscription }}</span></h3>
      <h3 class="">Classement : <span class="text-red-600">{{ classement }}</span></h3>
      <h3 class="">Record de WPM : <span class="text-red-600">{{ recordWPM }}</span></h3>
      <h3 class="">Moyenne de WPM : <span class="text-red-600">{{ moyenneWPM }}</span></h3>
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

<style scoped>

</style>