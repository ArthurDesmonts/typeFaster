<script setup>
import {useRouter} from "vue-router";
import axios from "axios";
import {ref} from "vue";
import {useStore} from "vuex";
import {validateUserName} from "@/utils/FormPreTraitement.js";

const router = useRouter();
const store = useStore();

const name = ref("");
const password = ref("");
const confirmedPassword = ref("");

const messageFromServer = ref("");

const nameInput = ref(null);

async function postSignUp() {
  messageFromServer.value = "";
  validateUserName(name.value,messageFromServer);
  if (messageFromServer.value !== "") {
    nameInput.value.classList.add("border");
    nameInput.value.classList.add("border-red-500");
    return;
  }
  try {
    if(allParamsPreTraitment()) {
      const response = await axios.post("https://api-rest-text-game.vercel.app/user/signup", {
        name: name.value,
        password: password.value
      });
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
              <input type="password" placeholder="Mot de passe" class="form-control w-full bg-customBlue-800 rounded font-bold text-center px-2" autocomplete="false" v-model="password">
            </div>
            <div class="mb-3">
              <input type="password" placeholder="Confirmer mot de passe" class="form-control w-full bg-customBlue-800 rounded font-bold text-center px-2" autocomplete="false" v-model="confirmedPassword">
            </div>
            <button type="submit" class="btn btn-primary bg-customOrange-500 rounded text-customBlue-900 p-2">S'inscrire</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>