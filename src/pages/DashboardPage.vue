<template>
  <q-page padding class="flex column">
    <div class="col row q-gutter-md flex-center">
      <div
        v-for="item in cardList"
        :key="item.title"
        class="col-xl-3 col-lg-3 col-md-4 col-sm-8 col-xs-8"
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
          dataset-title1="Instant power usage (W)"
          dataset-title2="Energy usage over time (Watt-minutes)"
          device="test"
          measurement1="power"
          measurement2="energy"
          style="height: 100%"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import LineChart from "src/components/LineChart.vue";
import { useUserStore } from "../stores/user-store";
import { mapState } from "pinia";

export default defineComponent({
  name: "DashboardPage",
  components: {
    LineChart,
  },

  data() {
    return {
      cardList: [
        {
          value: "",
          title: "Account balance",
          icon: "account_balance_wallet",
          class: "bg-secondary",
        },
        {
          value: "",
          title: "Current power usage",
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
          title: "Receive power during load shedding",
          icon: "electrical_services",
          class: "bg-positive",
        },
        {
          value: "",
          title: "Load limit",
          icon: "priority_high",
          class: "bg-accent",
        },
      ],
    };
  },

  computed: {
    ...mapState(useUserStore, ["user"]),
  },

  async mounted() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      let res = await this.$api.get(`api/dashboard/${this.user.user_id}`);

      // Set the correct values
      // Acount balance
      this.cardList[0].value = res.data.account_balance;
      // Current power usage
      if (typeof res.data.power === "number") {
        this.cardList[1].value = `${res.data.power} W`;
      } else {
        this.cardList[1].value = res.data.power;
      }
      // Current electrical rate
      this.cardList[2].value = `${res.data.current_rate} [c/kWh]`;
      // Load shedding status
      this.cardList[3].value = res.data.loadshedding;
      // Opt in to receive power during load shedding or not
      this.cardList[4].value = res.data.receive_power_loadshedding;
      // Load limit
      if (typeof res.data.load_limit !== "string") {
        this.cardList[5].value = `${res.data.load_limit} W`;
      } else {
        this.cardList[5].value = res.data.load_limit;
      }
    },
  },
});
</script>
