<script setup>
import {useRouter} from "vue-router";
import axios from "axios";
import {ref} from "vue";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();

const name = ref("");
const password = ref("");

async function postLogin() {
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
  }
}
</script>

<template>
  <div class="container bg-customBlue-900 flex justify-center rounded-2xl w-fit p-10 mx-auto mt-20">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center mb-1">Se connecter</h1>
        <form @submit.prevent="postLogin">
          <div class="flex flex-col gap-2">
            <div class="mb-3 mt-2">
              <input type="text" placeholder="Pseudo"
                     class="form-control bg-customBlue-800 rounded font-bold text-center" v-model="name">
            </div>
            <div class="mb-3">
              <input type="password" placeholder="Mot de passe"
                     class="form-control bg-customBlue-800 rounded font-bold text-center" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary bg-customOrange-500 rounded text-customBlue-900 p-2">
              Connection
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>