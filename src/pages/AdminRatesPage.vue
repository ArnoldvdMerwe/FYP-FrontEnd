<template>
  <q-page padding class="flex flex-center">
    <q-list>
      <q-card flat bordered>
        <q-expansion-item
          label="Add new time slot"
          icon="schedule"
          caption="Create a new time slot for electrical rates."
        >
          <q-form @submit="onAddTimeSlot" class="q-pa-md q-gutter-md">
            <p class="text-subtitle1">Time slots use the 24-hour system.</p>
            <div class="row justify-between">
              <q-input
                filled
                v-model="inputStartTime"
                label="Start time [hh:mm]"
                class="col q-mr-md"
              />
              <q-input
                filled
                v-model="inputEndTime"
                label="End time [hh:mm]"
                class="col q-ml-md"
              />
            </div>
            <q-input
              filled
              v-model="inputNormalRate"
              label="Normal electrical rate (c/kWh)"
            />
            <q-input
              filled
              v-model="inputLoadSheddingRate"
              label="Electrical rate during load shedding (c/kWh)"
            />
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
        row-key="startTime"
        hide-pagination
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              icon="mode_edit"
              @click="onEdit(props.row)"
              color="warning"
            >
            </q-btn>
            <q-btn
              flat
              icon="delete"
              @click="onDelete(props.row)"
              color="accent"
            >
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminRatesPage",

  data() {
    return {
      columns: [
        {
          name: "startTime",
          required: true,
          label: "Start time",
          field: "start",
        },
        {
          name: "endTime",
          label: "End time",
          field: "end",
        },
        {
          name: "normalRate",
          label: "Normal electrical rate (c/kWh)",
          field: "normalRate",
        },
        {
          name: "loadsheddingRate",
          label: "Electrical rate during load shedding (c/kWh)",
          field: "loadsheddingRate",
        },
        { name: "actions", label: "Actions", align: "center" },
      ],
      rows: [
        {
          start: "00:00",
          end: "23:59",
          normalRate: 200,
          loadsheddingRate: 200,
        },
      ],
    };
  },
});
</script>
