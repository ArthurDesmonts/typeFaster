<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {receiverText, receiverIDText} from "@/utils/objectPreTreatmentReceiver.js";

const text = ref("");
const id = ref(0);

function getTextFromServer() {
  axios.get("http://localhost:5500/get")
    .then(response => {
      text.value = receiverText(response.data);
      id.value = receiverIDText(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

onMounted(() => {
  getTextFromServer();
});

</script>

<template>
  <div>
    <p v-html="text" class="font-mono text-gray-100"></p>
  </div>
</template>

<style scoped>

</style>