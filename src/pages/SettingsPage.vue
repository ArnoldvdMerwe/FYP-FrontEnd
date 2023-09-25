<template>
  <q-page padding>
    <q-card flat bordered class="q-pa-sm">
      <q-list>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Receive power during power outages</q-item-label>
            <q-item-label caption>
              Note that the electrical rates during loadshedding and other power
              outages can be different from the normal rate.
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle color="secondary" v-model="optInLoadsheddingToggle" />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Add balance</q-item-label>
            <q-item-label caption>
              Add funds to your account balance.
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              color="secondary"
              label="Add"
              @click="this.editBalancePrompt = true"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <!-- Add account balance prompt -->
    <q-dialog v-model="editBalancePrompt">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add account balance</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-input filled v-model="addBalance" label="Balance" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" @click="onAddBalance" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "../stores/user-store";
import { mapState } from "pinia";

export default defineComponent({
  name: "SettingsPage",

  data() {
    return {
      optInLoadsheddingToggle: false,
      editBalancePrompt: false,
      addBalance: null,
    };
  },

  computed: {
    ...mapState(useUserStore, ["user"]),
  },

  watch: {
    optInLoadsheddingToggle(value) {
      this.$api.post("/api/home/edit_receive_power_loadshedding", {
        id: this.user.user_id,
        receive_power: value,
      });
    },
  },

  async mounted() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      let res = await this.$api.get(`/api/home/home/${this.user.user_id}`);
      this.optInLoadsheddingToggle = res.data.receive_power_loadshedding;
    },

    onAddBalance() {
      this.$api.post("/api/home/add_balance", {
        id: this.user.user_id,
        add_balance: this.addBalance,
      });
    },
  },
});
</script>
