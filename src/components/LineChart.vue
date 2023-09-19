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
    datasetTitle1: {
      type: String,
      required: true,
    },
    datasetTitle2: {
      type: String,
    },
    device: {
      type: String,
      required: true,
    },
    measurement1: {
      type: String,
      required: true,
    },
    measurement2: {
      type: String,
    },
  },

  data() {
    return {
      chartData: {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: this.datasetTitle1,
              data: [],
              fill: true,
              order: 2,
            },
            {
              label: this.datasetTitle2,
              data: [],
              fill: true,
              order: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          lineTension: 0,
          plugins: {
            legend: {
              display: true,
            },
            title: {
              display: true,
              text: "Measurements",
            },
            colors: {
              enabled: true,
            },
          },
        },
      },
    };
  },

  async mounted() {
    const ctx = document.getElementById(this.chartId);
    await this.fetchChartData();
    new Chart(ctx, this.chartData);
  },

  methods: {
    async fetchChartData() {
      let res = await this.$api.get(
        `api/measurement/${this.measurement1}/${this.device}`
      );
      let resData = res.data;
      this.chartData.data.labels = resData.labels;
      this.chartData.data.datasets[0].data = resData.data;

      if (this.measurement2 !== null) {
        let res = await this.$api.get(
          `api/measurement/${this.measurement2}/${this.device}`
        );
        let resData = res.data;
        this.chartData.data.datasets[1].data = resData.data;
      }
    },
  },
});
</script>
