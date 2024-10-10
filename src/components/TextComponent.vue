<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {receiverText, receiverIDText} from "@/utils/objectPreTreatmentReceiver.js";
import {initializer, pushWord} from "@/utils/TextTreatment.js";

const rawText = ref("");
const textDisplayed = ref("");
const id = ref(0);

const timer = ref(30);
const wpm = ref(0);

// Function to get text from server
async function getTextFromServer() {
  try {
    const response = await axios.get("http://localhost:5500/get");
    rawText.value = receiverText(response.data);
    id.value = receiverIDText(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Function to update the displayed text
async function updateText() {
  await getTextFromServer();
  if (rawText.value) {
    textDisplayed.value = initializer(rawText.value, 50);
  }
}

onMounted(() => {
  updateText();
});
</script>

<template>
  <div class="flex flex-col justify-center">
    <p class="text-2xl p-4 my-4 rounded text-center text-gray-100">{{timer}} s</p>
    <div class="flex justify-center w-full">
      <button class="bg-amber-400 rounded px-2 rounded-r-none" @click="updateText">&#x21bb;</button>
      <div class="rounded rounded-l-none bg-gray-950 max-w-xl">
        <p v-html="textDisplayed" class="font-mono text-gray-100 text-justify p-8"></p>
      </div>
    </div>
    <div class="flex justify-center w-full mt-5">
      <input type="text" class="rounded bg-gray-600 text-center text-orange-600 font-bold" placeholder="Commencer à taper">
    </div>
    <div class="flex justify-center w-full">
      <p class="text-2xl text-gray-100 mx-4">{{wpm}} wpm</p>
    </div>
  </div>
</template>

<style scoped>
</style>
