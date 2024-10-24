<script setup>
import {useRouter} from "vue-router";
import axios from "axios";
import {ref} from "vue";
import {useStore} from "vuex";
import {checkInputs} from "@/utils/FormPreTraitement.js";

const router = useRouter();
const store = useStore();

const name = ref("");
const password = ref("");
const confirmedPassword = ref("");

const serverResponse = ref(false);

const messageFromServer = ref("");

const nameInput = ref(null);
const passwordInput = ref(null);
const confPasswordInput = ref(null);

function allParamsCheck() {
  return checkInputs(nameInput,name.value, messageFromServer)
      && checkInputs(passwordInput,password.value, messageFromServer)
      && checkInputs(confPasswordInput,confirmedPassword.value, messageFromServer);
}

async function postSignUp() {
  serverResponse.value = true;
  if(!allParamsCheck()){ return; }
  try {
    if(allParamsPreTraitment()) {
      const response = await axios.post("https://api-rest-text-game.vercel.app/user/signup", {
        name: name.value,
        password: password.value
      });
      serverResponse.value = false;
      console.log(response.data);
      await store.dispatch('updateUserId', response.data.userId);
      await router.push('/typeFaster/profil');
    }else{
      messageFromServer.value = "Mots de passes différents !";
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.message) {
      messageFromServer.value = error.response.data.message;
    } else {
      messageFromServer.value = "An unexpected error occurred.";
    }
  }
}

function allParamsPreTraitment() {
  return (password.value === confirmedPassword.value);
}
</script>

<template>
  <div class="container bg-customBlue-900 flex justify-center rounded-2xl w-fit py-10 px-20 mx-auto mt-20">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center mb-1 font-bold text-customOrange-500">Inscription</h1>
        <form @submit.prevent="postSignUp">
          <p class="text-center text-white rounded bg-blue-400">{{messageFromServer}}</p>
          <div class="flex flex-col gap-2">
            <div class="mb-3 mt-5">
              <input ref="nameInput" type="text" placeholder="Pseudo" class="form-control w-full bg-customBlue-800 rounded font-bold text-center px-2" v-model="name">
            </div>
            <div class="mb-3">
              <input ref="passwordInput" type="password" placeholder="Mot de passe" class="form-control w-full bg-customBlue-800 rounded font-bold text-center px-2" autocomplete="false" v-model="password">
            </div>
            <div class="mb-3">
              <input ref="confPasswordInput" type="password" placeholder="Confirmer mot de passe" class="form-control w-full bg-customBlue-800 rounded font-bold text-center px-2" autocomplete="false" v-model="confirmedPassword">
            </div>
            <button type="submit" class="btn btn-primary bg-customOrange-500 rounded text-customBlue-900 p-2 flex items-center gap-x-2 justify-center">
              <svg v-if="serverResponse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="w-6 h-6">
                <radialGradient id="a10" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                  <stop offset="0" stop-color="#000000"></stop>
                  <stop offset=".3" stop-color="#000000" stop-opacity=".9"></stop>
                  <stop offset=".6" stop-color="#000000" stop-opacity=".6"></stop>
                  <stop offset=".8" stop-color="#000000" stop-opacity=".3"></stop>
                  <stop offset="1" stop-color="#000000" stop-opacity="0"></stop>
                </radialGradient>
                <circle transform-origin="center" fill="none" stroke="url(#a10)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70">
                  <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                </circle>
                <circle transform-origin="center" fill="none" opacity=".2" stroke="#000000" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle>
              </svg>
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>