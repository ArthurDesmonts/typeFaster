<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useStore} from "vuex";

const chart = ref(null);
const store = useStore();

const wpmValues = [];

async function userData() {
  try {
    if (store.state.userId !== null) {
    const response = await axios.get(`https://api-rest-text-game.vercel.app/get/getResults?userId=${store.state.userId}`);
    wpmValues.value = response.data.results.map((result) => result.wpm);
    console.log(response.data);
    console.log(wpmValues.value);
    }
  } catch (error) {
    console.error(error);
  }
}



onMounted(() => {
  userData();
});
</script>

<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>