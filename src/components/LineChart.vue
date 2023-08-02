<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Chart } from "chart.js/auto";

export default defineComponent({
  name: "LineChart",

  data() {
    return {
      data: {
        type: "line",
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          datasets: [
            {
              label: "Power usage",
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              backgroundColor: "#507ea1",
              borderColor: "#507ea1",
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
        },
      },
    };
  },

  mounted() {
    const ctx = document.getElementById("chart");
    new Chart(ctx, this.data);
  },
});
</script>
