<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chart = ref(null);
const store = useStore();
const wpmValues = ref([]);

async function userData() {
  try {
    if (store.state.userId !== null) {
      const response = await axios.get(`https://api-rest-text-game.vercel.app/get/getResults?userId=${store.state.userId}`);
      wpmValues.value = response.data.results.map((result) => result.wpm);
      createChart();
    }
  } catch (error) {
    console.error(error);
  }
}

function createChart() {
  const ctx = chart.value.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: wpmValues.value.map((_, index) => index + 1),
      datasets: [{
        label: 'WPM (Mots par minute)',
        data: wpmValues.value,
        borderColor: 'color(display-p3 0.98 0.51 0.23)',
        backgroundColor: 'color(display-p3 0.9 0.45 0.2)',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Résultats'
          }
        },
        y: {
          title: {
            display: true,
            text: 'WPM'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14
            }
          }
        }
      }
    }
  });
}

onMounted(() => {
  userData();
});
</script>

<template>
  <div v-if="store.state.connected" class="flex justify-center w-full bg-gray-900 rounded p-4 mt-5">
    <canvas class="w-full h-64" ref="chart"></canvas>
  </div>
</template>