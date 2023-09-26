<template>
  <q-page padding class="flex column">
    <div class="col row q-gutter-md flex-center">
      <div
        v-for="item in cardList"
        :key="item.title"
        class="col-xl-4 col-lg-4 col-md-5 col-sm-8 col-xs-8"
      >
        <q-card flat bordered>
          <q-card-section horizontal class="items-center">
            <q-card-section :class="item.class">
              <q-icon :name="item.icon" color="white" size="3em"></q-icon>
            </q-card-section>
            <q-card-section class="q-pa-none">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6">
                    {{ item.value }}
                  </q-item-label>
                  <q-item-label caption> {{ item.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col q-mt-md row justify-center">
      <q-card flat bordered class="col q-pa-sm" style="min-width: 300px">
        <LineChart
          chart-id="1"
          dataset-title1="Instant community power usage (W)"
          dataset-title2="Community energy usage (Watt-minutes)"
          device="community"
          measurement1="power"
          measurement2="energy"
          style="height: 100%"
          :update-flag="updateChart"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import LineChart from "src/components/LineChart.vue";

export default defineComponent({
  name: "AdminDashboardPage",
  components: {
    LineChart,
  },

  data() {
    return {
      cardList: [
        {
          value: "",
          title: "Current community power usage",
          icon: "bolt",
          class: "bg-info",
        },
        {
          value: "",
          title: "Current electrical rate",
          icon: "toll",
          class: "bg-accent",
        },
        {
          value: "",
          title: "Load shedding status",
          icon: "power",
          class: "bg-positive",
        },
        {
          value: "",
          title: "Community load control limit",
          icon: "priority_high",
          class: "bg-accent",
        },
      ],
      firstTime: true,
      timer: null,
      updateChart: false,
    };
  },
  async mounted() {
    await this.fetchData();
    this.timer = setInterval(this.fetchData, 15000);
  },

  methods: {
    async fetchData() {
      let res = await this.$api.get("api/dashboard/admin");

      // Set the correct values
      // Current power usage
      if (typeof res.data.power === "number") {
        this.cardList[0].value = `${res.data.power} W`;
      } else {
        this.cardList[0].value = res.data.power;
      }
      // Current electrical rate
      this.cardList[1].value = `${res.data.current_rate} [c/kWh]`;
      // Load shedding status
      this.cardList[2].value = res.data.loadshedding;
      if (this.cardList[2].value === "Inactive") {
        this.cardList[2].class = "bg-positive";
      } else {
        this.cardList[2].class = "bg-accent";
      }
      // Load limit
      if (typeof res.data.load_limit !== "string") {
        this.cardList[3].value = `${res.data.load_limit} W`;
        this.cardList[3].class = "bg-warning";
      } else {
        this.cardList[3].value = res.data.load_limit;
        this.cardList[3].class = "bg-positive";
      }

      if (!this.firstTime) {
        this.updateChart = !this.updateChart;
      } else {
        this.firstTime = false;
      }
    },
  },
});
</script>
