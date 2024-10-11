<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { receiverText, receiverIDText } from "@/utils/objectPreTreatmentReceiver.js";
import { initializer, pushWord, textToTab } from "@/utils/TextTreatment.js";
import { countDownFrom } from "@/utils/TimeHandler.js";

let rawText = ref("");
let textDisplayed = ref("");
const id = ref(0);
const textArray = ref([]);

const currentWordToType = ref("");
const currentWordIndex = ref(0);
const typedWords = ref([]);
const typedWordsLenght = ref(0);

const timer = ref(30);
const timerDefault = timer;
const wpm = ref(0);

const input = ref(null);
const summary = ref(false);

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
  textArray.value = textToTab(textDisplayed.value);
  currentWordToType.value = textArray.value[currentWordIndex.value];
  input.value.disabled = false;
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keydown", handleStartGame, { once: true });
  timer.value = 30;
}

const typing = () => {
  if (input.value.value === currentWordToType.value) {
    //add 1 to the wpm
    currentWordIndex.value++;
    currentWordToType.value = textArray.value[currentWordIndex.value];
    //push for wpm
    typedWords.value.push(input.value.value);
    typedWordsLenght.value = typedWords.value.length;

    //remove the word from the input
    textDisplayed.value = pushWord(textDisplayed.value);

    //empty the field
    input.value.value = "";
    window.addEventListener("keyup", handleKeyup);
  } else {
    console.log(input.value.value + " : NOPE !");
    window.removeEventListener("keyup", handleKeyup);
  }
};

const countDown = () => {
  countDownFrom(timer.value, (remainingSeconds) => {
    timer.value = remainingSeconds;
    if (remainingSeconds === 0) {
      blockTypingSignal();
    }
  });
}

function blockTypingSignal() {
  input.value.value = "";
  input.value.disabled = true;
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("keydown", handleStartGame);
  wpm.value = typedWordsLenght.value * 2;
  summary.value = true;
}

const handleKeydown = (event) => {
  if (event.keyCode === 32) { // spacebar
    typing();
  }
};

const handleKeyup = (event) => {
  if (event.keyCode === 32) { // spacebar
    input.value.value = "";
  }
};

const handleStartGame = () => {
  countDown();
};

onMounted(() => {
  input.value = document.getElementById("input");
  updateText();
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
  window.addEventListener("keydown", handleStartGame,  { once: true });
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("keyup", handleKeyup);
  window.removeEventListener("keydown", handleStartGame);
});
</script>

<template>
  <div class="flex flex-col justify-center">
    <p class="text-2xl p-4 my-4 rounded text-center text-customBlue-100">{{ timer }}</p>
    <div class="flex justify-center w-full">
      <button class="bg-amber-400 text-black font-bold rounded px-2 rounded-r-none" @click="updateText">&#x21bb;
      </button>
      <div class="rounded rounded-l-none bg-gray-950 max-w-xl">
        <p v-html="textDisplayed" class="font-mono text-customBlue-100 text-justify p-8"></p>
      </div>
    </div>
    <div class="flex justify-center w-full mt-5">
      <input id="input" type="text" autocomplete="off"
             class="outline-0 caret-transparent rounded text-center text-customOrange-600 font-bold"
             placeholder="Commencer à taper">
    </div>
    <div class="flex justify-center w-full">
      <p class="text-2xl text-customBlue-100 mx-4">{{ typedWordsLenght }} words</p>
      <p v-if="summary" class="text-2xl text-customBlue-100 mx-4">{{ wpm }} wpm</p>
    </div>
  </div>
</template>