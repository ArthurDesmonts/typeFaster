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

const nameInput = ref(null);
const passwordInput = ref(null);

const messageFromServer = ref("");

function allParamsCheck() {
  return checkInputs(nameInput,name.value, messageFromServer)
      && checkInputs(passwordInput,password.value, messageFromServer);
}

async function postLogin() {
  if(!allParamsCheck()){ return; }
  try {
    const response = await axios.post("https://api-rest-text-game.vercel.app/user/login", {
      name: name.value,
      password: password.value
    });
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
            <button type="submit" class="btn btn-primary bg-customOrange-500 rounded text-customBlue-900 p-2">
              Connexion
            </button>
            <p class="text-center text-customOrange-500">Pas encore inscrit ? <router-link to="/typeFaster/signUp"><span class="text-blue-500">Inscrivez-vous</span></router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>