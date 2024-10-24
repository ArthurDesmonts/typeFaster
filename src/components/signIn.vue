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

const serverResponse = ref(false);

const nameInput = ref(null);
const passwordInput = ref(null);

const messageFromServer = ref("");

function allParamsCheck() {
  return checkInputs(nameInput,name.value, messageFromServer)
      && checkInputs(passwordInput,password.value, messageFromServer);
}

async function postLogin() {
  serverResponse.value = true;
  if(!allParamsCheck()){ return; }
  try {
    const response = await axios.post("https://api-rest-text-game.vercel.app/user/login", {
      name: name.value,
      password: password.value
    });
    serverResponse.value = false;
    console.log(response.data);
    await store.dispatch('updateUserId', response.data.userId);
    await router.push('/typeFaster/profil');
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.message) {
      messageFromServer.value = error.response.data.message;
    } else {
      messageFromServer.value = "An unexpected error occurred.";
    }
  }
}
</script>

<template>
  <div class="container bg-customBlue-900 flex justify-center rounded-2xl w-fit p-10 mx-auto mt-20">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center mb-1">Se connecter</h1>
        <form @submit.prevent="postLogin">
          <p class="text-center text-white rounded bg-blue-400">{{messageFromServer}}</p>
          <div class="flex flex-col gap-2">
            <div class="mb-3 mt-2">
              <input type="text" placeholder="Pseudo" ref="nameInput"
                     class="form-control bg-customBlue-800 rounded font-bold text-center w-full" v-model="name">
            </div>
            <div class="mb-3">
              <input type="password" placeholder="Mot de passe" ref="passwordInput"
                     class="form-control bg-customBlue-800 rounded font-bold text-center w-full" v-model="password">
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
              Connexion
            </button>
            <p class="text-center text-customOrange-500">Pas encore inscrit ? <router-link to="/typeFaster/signUp"><span class="text-blue-500">Inscrivez-vous</span></router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>