<template>
  <q-page padding>
    <div class="row flex-center">
      <q-card flat bordered>
        <q-btn-dropdown
          flat
          square
          label="Add new home"
          menu-anchor="bottom middle"
          menu-self="top middle"
        >
          <q-form @submit="onCreateHome" class="q-pa-md q-gutter-md">
            <p class="text-subtitle1">
              Make sure the equipment has been installed in the home and is
              operational.
            </p>
            <q-input filled v-model="email" label="Home number" />
            <q-select
              filled
              v-model="selectedHomeowner"
              :options="homeownerNames"
              label="Homeowner"
            />
            <div class="row flex-center">
              <div class="column flex-center">
                <q-btn label="Create" type="submit" color="secondary" />
              </div>
            </div>
          </q-form>
        </q-btn-dropdown>
      </q-card>
    </div>
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
            color="info"
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
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminHomesPage",

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
        { name: "actions", label: "Actions", align: "center" },
      ],
      rows: [
        {
          number: 1,
          owner: "Ceren Janzen",
          power: 123,
          energy: 500,
        },
        {
          number: 2,
          owner: "Doris Björnsson",
          power: 321,
          energy: 5680,
        },
        {
          number: 3,
          owner: "Faustino Schuster",
          power: 231,
          energy: 5230,
        },
      ],
      selectedHomeowner: null,
      homeownerNames: ["Adam", "John", "Jessy"],
    };
  },
});
</script>
