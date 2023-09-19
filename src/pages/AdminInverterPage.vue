<template>
  <q-page padding class="flex flex-center">
    <div class="full-width full-height column wrap content-center q-gutter-md">
      <q-card flat bordered class="q-pa-sm col-5">
        <q-toggle
          size="lg"
          keep-color
          color="secondary"
          v-model="simulateInverterToggle"
          label="Simulate inverter"
        />
      </q-card>
      <q-card flat bordered class="q-pa-md" v-show="simulateInverterToggle">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Power outage active</q-item-label>
              <q-item-label caption>
                Electricity on municipal side is unavailable
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-toggle v-model="powerOutageToggle" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Load control active</q-item-label>
              <q-item-label caption> Make load control active </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-toggle v-model="loadControlToggle" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Load limit</q-item-label>
              <q-item-label caption>
                Limit maximum power used by entire community
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-input v-model="loadLimit" label="Load limit (W)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <q-btn
        class="self-center"
        color="secondary"
        label="Apply"
        @click="updateData"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminInverterPage",

  data() {
    return {
      simulateInverterToggle: false,
      powerOutageToggle: false,
      loadControlToggle: false,
      loadLimit: null,
    };
  },

  async mounted() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      let res = await this.$api.get("api/inverter");
      let resData = res.data;

      this.simulateInverterToggle = resData.simulateInverterToggle;
      this.powerOutageToggle = resData.powerOutageToggle;
      this.loadControlToggle = resData.loadControlToggle;
      this.loadLimit = resData.loadLimit;
    },

    async updateData() {
      await this.$api.post("api/inverter/edit", {
        simulate_inverter: this.simulateInverterToggle,
        loadshedding: this.powerOutageToggle,
        load_control: this.loadControlToggle,
        load_limit_community: this.loadLimit,
      });
      await this.fetchData();
    },
  },
});
</script>
