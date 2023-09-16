<template>
  <q-page padding class="flex flex-center">
    <q-list>
      <q-card flat bordered>
        <q-expansion-item
          label="Add new home"
          icon="home"
          v-model="expansion"
          caption="Add a new home to the community and assign a homeowner to the home."
        >
          <q-form @submit="onCreateHome" class="q-pa-md q-gutter-md">
            <p class="text-subtitle1">
              Make sure the equipment has been installed in the home and is
              operational.
            </p>
            <div class="row justify-between">
              <q-input
                filled
                v-model="inputHomeNumber"
                label="Home number"
                class="col q-mr-md"
              />
              <q-select
                filled
                v-model="selectedHomeowner"
                :options="homeownerNames"
                label="Homeowner"
                class="col q-ml-md"
              />
            </div>
            <div class="row flex-center">
              <div class="column flex-center">
                <q-btn label="Create" type="submit" color="secondary" />
              </div>
            </div>
          </q-form>
        </q-expansion-item>
      </q-card>
      <q-table
        class="q-mt-md"
        flat
        bordered
        :rows="rows"
        :columns="columns"
        row-key="number"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              icon="show_chart"
              @click="onView(props.row)"
              color="secondary"
            ></q-btn>
            <q-btn
              flat
              icon="mode_edit"
              @click="onEdit(props.row)"
              color="warning"
            ></q-btn>
            <q-btn
              flat
              icon="delete"
              @click="onDelete(props.row)"
              color="accent"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </q-list>
    <!-- Edit home dialog -->
    <q-dialog v-model="editPrompt">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit home</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-select
              filled
              v-model="editHomeowner"
              :options="homeownerNames"
              label="Homeowner"
            />
            <q-input filled v-model="editBalance" label="Balance" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" @click="onEditHome" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Delete home dialog -->
    <q-dialog v-model="deletePrompt">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="accent" text-color="white" />
          <span class="q-ml-sm"
            >Are you sure you want to delete this home?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="accent"
            @click="onDeleteHome"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Charts dialog -->
    <q-dialog
      v-model="chartsPrompt"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-secondary text-white">
        <q-bar>
          <q-icon name="show_chart" />
          <div>Home charts</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-secondary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="column q-gutter-md" style="height: 95%">
          <q-card flat bordered class="col q-pa-sm" style="min-width: 300px">
            <LineChart
              chart-id="1"
              dataset-title="Power usage"
              dataset-color="#507ea1"
              style="height: 100%"
            />
          </q-card>
          <q-card flat bordered class="col q-pa-sm" style="min-width: 300px">
            <LineChart
              chart-id="2"
              dataset-title="Energy usage"
              dataset-color="#004d40"
              style="height: 100%"
            />
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import LineChart from "src/components/LineChart.vue";

export default defineComponent({
  name: "AdminHomesPage",
  components: {
    LineChart,
  },

  data() {
    return {
      columns: [
        {
          name: "number",
          required: true,
          label: "Home number",
          field: "number",
          align: "left",
          sortable: true,
        },
        {
          name: "owner",
          label: "Homeowner",
          field: "owner",
          align: "center",
        },
        {
          name: "power",
          label: "Instant power usage (W)",
          field: "power",
          sortable: true,
        },
        {
          name: "energy",
          label: "Energy usage over last 24 hours (kWh)",
          field: "energy",
          sortable: true,
        },
        {
          name: "balance",
          label: "Account balance",
          field: "balance",
          sortable: true,
        },
        { name: "actions", label: "Actions", align: "center" },
      ],
      rows: [],
      inputHomeNumber: null,
      selectedHomeowner: null,
      homeowners: null,
      homeownerNames: null,
      chartsPrompt: false,
      chartsMaximizedToggle: false,
      editPrompt: false,
      editHomeowner: null,
      editHomeNumber: null,
      deleteHomeNumber: null,
      deletePrompt: false,
      expansion: false,
    };
  },

  async mounted() {
    await this.fetchHomeowners();
    await this.fetchHomes();
  },

  methods: {
    onView(row) {
      this.chartsPrompt = true;
    },

    onEdit(row) {
      this.editHomeNumber = row.number;
      this.editHomeowner = row.owner;
      this.editBalance = row.balance;
      this.editPrompt = true;
    },

    onDelete(row) {
      this.deleteHomeNumber = row.number;
      this.deletePrompt = true;
    },

    async fetchHomeowners() {
      // Fetch homeowners
      let res = await this.$api.get("api/user/homeowners");
      this.homeowners = res.data;

      // Get names as separate list
      this.homeownerNames = this.homeowners.map((obj) => obj.name);
    },

    async fetchHomes() {
      let res = await this.$api.get("api/home/homes");
      this.rows = res.data;
    },

    // Add new home using API
    async onCreateHome() {
      await this.$api.post("api/home/add", {
        home_number: this.inputHomeNumber,
        homeowner_id: this.homeowners.find(
          (obj) => obj.name === this.selectedHomeowner
        ).userId,
      });
      this.expansion = false;
      this.selectedHomeowner = null;
      this.inputHomeNumber = null;
      this.fetchHomes();
    },

    // Edit home details
    async onEditHome() {
      await this.$api.post("api/home/edit", {
        home_number: this.editHomeNumber,
        homeowner_id: this.homeowners.find(
          (obj) => obj.name === this.editHomeowner
        ).userId,
        account_balance: this.editBalance,
      });
      this.fetchHomes();
    },

    // Delete home
    async onDeleteHome() {
      await this.$api.delete(`api/home/delete/${this.deleteHomeNumber}`);
      this.fetchHomes();
    },
  },
});
</script>
