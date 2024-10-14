<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { receiverText, receiverIDText } from "@/utils/objectPreTreatmentReceiver.js";
import { initializer, textToTab, cleanString } from "@/utils/TextTreatment.js";
import { countDownFrom, resetCountDown } from "@/utils/TimeHandler.js";

let rawText = ref("");
let textDisplayed = ref("");
const id = ref(0);
const textArray = ref([]);

const currentWordToType = ref("");
const currentWordIndex = ref(0);
const typedWords = ref([]);
const typedWordsLenght = ref(0);

const timer = ref(30);
const wpm = ref(0);

const input = ref("");
const summary = ref(false);
const updateButton = ref(null);

// Function to get text from server
async function getTextFromServer() {
  try {
    const response = await axios.get("https://api-rest-text-game.vercel.app/get");
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
}

// Function to update the displayed text
async function updateText() {
  await getTextFromServer();
  if (rawText.value) {
    textDisplayed.value = initializer(rawText.value, 300);
    textArray.value = textToTab(textDisplayed.value);
  }

  resetVariables();

  window.addEventListener("keydown", handleSpaceBarDown);
  window.addEventListener("keydown", handleStartGame, { once: true });
  timer.value = 30;

  // Remove the focus on the button
  updateButton.value.blur();
}

// Function to handle typing
const typing = () => {
  if (cleanString(input.value) === currentWordToType.value) {
    currentWordIndex.value++;
    currentWordToType.value = textArray.value[currentWordIndex.value];
    typedWords.value.push(input.value);
    typedWordsLenght.value = typedWords.value.length;
    input.value = "";
  } else {
    console.log(input.value + " != "+ currentWordToType.value + " : NOPE !");
  }
};

// Function to handle countdown
const countDown = () => {
  countDownFrom(timer.value, (remainingSeconds) => {
    timer.value = remainingSeconds;
    if (remainingSeconds === 0) {
      blockTypingSignal();
    }
  });
}

// Function to block typing signal
function blockTypingSignal() {
  input.value = "";
  window.removeEventListener("keydown", handleSpaceBarDown);
  window.removeEventListener("keydown", handleStartGame);
  wpm.value = typedWordsLenght.value * 2;
  summary.value = true;
}

// Function to highlight text
function highlightText(array, currentIndex) {
  return array.map((word, index) => {
    if (index < currentIndex) {
      return `<span class="typed-word">${word}</span>`;
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
  if (event.keyCode <= 90 && event.keyCode >= 65) {
    input.value += event.key;
  }
  if (event.keyCode === 8) {
    input.value = input.value.slice(0, -1);
  }
};

//ctrl + r to refresh text
const handleKeyRefreshText = (event) => {
  if (event.ctrlKey && event.keyCode === 82) {
    updateText();
    resetCountDown();
  }
};

// Lifecycle hook for component mount
onMounted(() => {
  updateText();
  window.addEventListener("keydown", handleKeyRefreshText);
  window.addEventListener("keydown", handleSpaceBarDown);
  window.addEventListener("keydown", handleStartGame, {once: true});
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
    <p class="text-2xl p-4 my-4 rounded text-center text-customBlue-100">{{ timer }}</p>
    <div class="flex justify-center w-full">
      <button ref="updateButton" type="button" class="bg-amber-400 text-black font-bold rounded px-2 rounded-r-none"
              @click="updateText">&#x21bb;
      </button>
      <div
          class="rounded rounded-l-none bg-gray-950 max-w-xl min-w-[600px] min-h-[250px] max-h-[250px] overflow-hidden">
        <p v-html="highlightText(textArray, currentWordIndex)"
           class="font-mono text-customBlue-100 text-justify p-2"></p>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <p class="text-2xl text-customBlue-100 mx-4">{{ typedWordsLenght }} words</p>
      <p v-if="summary" class="text-2xl text-customBlue-100 mx-4">{{ wpm }} wpm</p>
    </div>
  </div>
</template>

<style>
.typed-word {
  color: gray;
}
</style>