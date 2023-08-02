<template>
  <q-page class="q-pa-md flex justify-center">
    <div class="column justify-evenly">
      <div class="row q-gutter-md flex-center">
        <div v-for="item in cardList" :key="item.title">
          <q-card flat bordered style="width: 250px">
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
      <div class="q-pa-md">
        <q-card flat bordered class="q-pa-md">
          <LineChart />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import LineChart from "src/components/LineChart.vue";

export default defineComponent({
  name: "DashboardPage",
  components: {
    LineChart,
  },

  data() {
    return {
      cardList: [
        {
          value: "10000",
          title: "Account balance",
          icon: "account_balance_wallet",
          class: "bg-secondary",
        },
        {
          value: "1234 kW",
          title: "Current power usage",
          icon: "bolt",
          class: "bg-info",
        },
        {
          value: "217.3 [c/kWh]",
          title: "Current electrical rate",
          icon: "toll",
          class: "bg-accent",
        },
        {
          value: "Inactive",
          title: "Load shedding status",
          icon: "power",
          class: "bg-positive",
        },
        {
          value: "Opted in",
          title: "Receive power during load shedding",
          icon: "electrical_services",
          class: "bg-positive",
        },
      ],
    };
  },
});
</script>
