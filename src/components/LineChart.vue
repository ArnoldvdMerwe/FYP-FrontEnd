<template>
  <div>
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script>
import { defineComponent, toHandlers } from "vue";
import { Chart, Colors } from "chart.js/auto";

export default defineComponent({
  name: "LineChart",

  props: {
    chartId: {
      type: String,
      required: true,
    },
    datasetTitle: {
      type: String,
      required: true,
    },
    datasetColor: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      data: {
        type: "line",
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          datasets: [
            {
              label: this.datasetTitle,
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              backgroundColor: this.datasetColor,
              borderColor: this.datasetColor,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          lineTension: 1,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: this.datasetTitle,
            },
          },
        },
      },
    };
  },

  mounted() {
    const ctx = document.getElementById(this.chartId);
    new Chart(ctx, this.data);
  },
});
</script>
