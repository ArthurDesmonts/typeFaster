<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { receiverIDText, receiverText } from "@/utils/objectPreTreatmentReceiver.js";
import { cleanString, countWpm, initializer, textToTab } from "@/utils/TextTreatment.js";
import { countDownFrom, resetCountDown } from "@/utils/TimeHandler.js";
import { insertGameResults } from "@/utils/gameAPICalls.js";
import { useStore } from "vuex";

const serverResponse = ref(false);

let rawText = ref("");
let textDisplayed = ref("");
const id = ref(0);
const textArray = ref([]);

const currentWordToType = ref("");
const currentWordIndex = ref(0);
const typedWords = ref([]);
const typedWordsLenght = ref(0);

const timer = ref(30);
const timerScale = ref(30);
const wpm = ref(0);

const input = ref("");
const summary = ref(false);
const updateButton = ref(null);

const isBlocked = ref(false); // Flag

const store = useStore();

// Function to get text from server
async function getTextFromServer() {
  serverResponse.value = true;
  try {
    const response = await axios.get("https://api-rest-text-game.vercel.app/get/getText");
    serverResponse.value = false;
    rawText.value = receiverText(response.data);
    id.value = receiverIDText(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Function to reset variables
const resetVariables = () => {
  currentWordIndex.value = 0;
  currentWordToType.value = textArray.value[currentWordIndex.value];
  wpm.value = 0;
  typedWordsLenght.value = 0;
  typedWords.value = [];
  summary.value = false;
  input.value = "";
  isBlocked.value = false; // Reset the flag
  window.addEventListener("keydown", handleTypingLetterKey);
}

// Function to update the displayed text
async function updateText() {
  document.querySelector("select").disabled = false;
  await getTextFromServer();
  if (rawText.value) {
    textDisplayed.value = initializer(rawText.value, 300);
    textArray.value = textToTab(textDisplayed.value);
  }

  resetVariables();

  window.addEventListener("keydown", handleSpaceBarDown);
  window.addEventListener("keydown", handleStartGame, { once: true });
  timer.value = timerScale.value;

  // Remove the focus on the button
  updateButton.value.blur();
}

const updateTimer = () => {
  timer.value = timerScale.value;
};

// Function to handle typing
const typing = () => {
  if (cleanString(input.value) === currentWordToType.value) {
    currentWordIndex.value++;
    currentWordToType.value = textArray.value[currentWordIndex.value];
    typedWords.value.push(input.value);
    typedWordsLenght.value = typedWords.value.length;
    input.value = "";
  } else {
    console.log(input.value + " != " + currentWordToType.value + " : NOPE !");
  }
};

// Function to handle countdown
const countDown = () => {
  document.querySelector("select").disabled = true;
  countDownFrom(timer.value, (remainingSeconds) => {
    timer.value = remainingSeconds;
    if (remainingSeconds === 0) {
      blockTypingSignal();
    }
  });
}

// Function to block typing signal
function blockTypingSignal() {
  if (isBlocked.value) return;
  isBlocked.value = true;

  window.removeEventListener("keydown", handleTypingLetterKey);
  window.removeEventListener("keydown", handleSpaceBarDown);
  window.removeEventListener("keydown", handleStartGame);
  wpm.value = countWpm(typedWords.value, input.value, currentWordToType.value, timerScale.value);
  input.value = "";
  summary.value = true;
  document.querySelector("select").disabled = false;
  if (store.state.userId !== null) {
    insertGameResults(store.state.userId, wpm.value);
  } else {
    console.log("No user connected");
  }
}

// Function to highlight characters
function highlightCharacters(array, currentIndex, input) {
  return array.map((word, index) => {
    if (index < currentIndex) {
      return `<span class="typed-word">${word}</span>`;
    } else if (index === currentIndex) {
      let highlightedWord = '';
      for (let i = 0; i < word.length; i++) {
        if (i < input.length) {
          if (word[i] === input[i]) {
            highlightedWord += `<span class="typed-word">${word[i]}</span>`;
          } else {
            highlightedWord += `<span class="wrong-char">${word[i]}</span>`;
          }
        } else {
          highlightedWord += word[i];
        }
      }
      if (input.length > word.length) {
        highlightedWord += `<span class="wrong-char underline">${input.slice(word.length)}</span>`;
      }
      return highlightedWord;
    }
    return word;
  }).join(' ');
}

// Event handler for space bar down
const handleSpaceBarDown = (event) => {
  if (event.keyCode === 32) {
    currentWordToType.value = cleanString(currentWordToType.value);
    typing();
  }
};

// Event handler to start game
const handleStartGame = () => {
  countDown();
};

// Event handler for typing letter key
const handleTypingLetterKey = (event) => {
  if (event.keyCode <= 90 && event.keyCode >= 65 && event.ctrlKey === false) {
    input.value += event.key;
  }
  if (event.keyCode === 8) {
    input.value = input.value.slice(0, -1);
  }
};

//ctrl + r to refresh text
const handleKeyRefreshText = (event) => {
  if (event.ctrlKey && event.keyCode === 82) {
    resetCountDown();
    updateText();
  }
};

// Lifecycle hook for component mount
onMounted(() => {
  updateText();
  window.addEventListener("keydown", handleKeyRefreshText);
  window.addEventListener("keydown", handleSpaceBarDown);
  window.addEventListener("keydown", handleStartGame, { once: true });
  window.addEventListener("keydown", handleTypingLetterKey);
});

// Lifecycle hook for component unmount
onUnmounted(() => {
  window.removeEventListener("keydown", handleSpaceBarDown);
  window.removeEventListener("keydown", handleStartGame);
  window.removeEventListener("keydown", handleTypingLetterKey);
});
</script>

<template>
  <div class="flex flex-col justify-center">
    <p class="text-2xl p-4 my-4 rounded text-center text-customBlue-100">{{ timer }} s</p>
    <div class="flex justify-center w-full">
      <div class="flex flex-col gap-10 bg-amber-400 text-black font-bold rounded px-2 rounded-r-none">
        <button ref="updateButton" type="button" class="p-2 rounded-l text-black font-bold"
                @click="updateText">&#x21bb;
        </button>
        <select v-model="timerScale" class="bg-amber-400 text-black font-bold rounded px-2 rounded-l-none" @change="updateTimer" >
          <option value="30">30 s</option>
          <option value="60">60 s</option>
          <option value="90">90 s</option>
        </select>
      </div>
      <div
          class="rounded rounded-l-none bg-gray-950 max-w-xl min-w-[600px] min-h-[250px] max-h-[250px] overflow-hidden ">
        <svg v-if="serverResponse" class="flex items-center justify-center h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle fill="#FFFAFD" stroke="#FFFAFD" stroke-width="15" r="15" cx="35" cy="100">
            <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate>
          </circle>
          <circle fill="#FFFAFD" stroke="#FFFAFD" stroke-width="15" opacity=".8" r="15" cx="35" cy="100">
            <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate>
          </circle>
          <circle fill="#FFFAFD" stroke="#FFFAFD" stroke-width="15" opacity=".6" r="15" cx="35" cy="100">
            <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate>
          </circle>
          <circle fill="#FFFAFD" stroke="#FFFAFD" stroke-width="15" opacity=".4" r="15" cx="35" cy="100">
            <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate>
          </circle>
          <circle fill="#FFFAFD" stroke="#FFFAFD" stroke-width="15" opacity=".2" r="15" cx="35" cy="100">
            <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate>
          </circle>
        </svg>
        <p v-if="!serverResponse" v-html="highlightCharacters(textArray, currentWordIndex, input)"
           class="font-mono text-customBlue-100 text-justify p-2"></p>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <p class="text-2xl text-customBlue-100 mx-4">{{ typedWordsLenght }} mots</p>
      <p v-if="summary" class="text-2xl text-customBlue-100 mx-4">{{ wpm }} wpm</p>
    </div>
  </div>
</template>

<style>
.typed-word {
  color: gray;
}

.wrong-char {
  color: chocolate;
}

.underline {
  text-decoration: underline;
}
</style>