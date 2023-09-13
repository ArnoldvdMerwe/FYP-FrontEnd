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
    <div class="col q-mt-md row q-gutter-md justify-evenly">
      <q-card flat bordered class="col q-pa-sm" style="min-width: 300px">
        <LineChart
          chart-id="1"
          dataset-title="Instant community power usage"
          dataset-color="#507ea1"
          style="height: 100%"
        />
      </q-card>
      <q-card flat bordered class="col q-pa-sm" style="min-width: 300px">
        <LineChart
          chart-id="2"
          dataset-title="Community energy usage"
          dataset-color="#004d40"
          style="height: 100%"
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
          value: "1234 W",
          title: "Current community power usage",
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
          value: "467 W",
          title: "Load control limit",
          icon: "priority_high",
          class: "bg-accent",
        },
      ],
    };
  },
});
</script>
