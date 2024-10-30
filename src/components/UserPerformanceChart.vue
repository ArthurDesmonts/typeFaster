<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useStore} from "vuex";

const chart = ref(null);
const store = useStore();

async function userData() {
  try {
    if (store.state.userId !== null) {
    const response = await axios.get(`https://api-rest-text-game.vercel.app/get/getResults?userId=${store.state.userId}`);
    console.log(response.data);
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