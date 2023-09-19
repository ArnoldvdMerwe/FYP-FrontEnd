<template>
  <q-page padding class="flex flex-center">
    <q-list>
      <q-card flat bordered>
        <q-expansion-item
          label="Add new time slot"
          icon="schedule"
          caption="Create a new time slot for electrical rates."
          v-model="expansion"
        >
          <q-form @submit="onAddTimeSlot" class="q-pa-md q-gutter-md">
            <p class="text-subtitle1">Time slots use the 24-hour system.</p>
            <div class="row justify-between">
              <q-input
                filled
                v-model="inputStartTime"
                label="Start time [hh:mm:ss]"
                class="col q-mr-md"
              />
              <q-input
                filled
                v-model="inputEndTime"
                label="End time [hh:mm:ss]"
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
              v-model="inputLoadsheddingRate"
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
    <!-- Edit time slot dialog -->
    <q-dialog v-model="editPrompt">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Edit time slot</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-input
              filled
              v-model="editStartTime"
              label="Start time [hh:mm:ss]"
              class="col q-mr-md"
            />
            <q-input
              filled
              v-model="editEndTime"
              label="End time [hh:mm:ss]"
              class="col q-ml-md"
            />
            <q-input
              filled
              v-model="editNormalRate"
              label="Normal electrical rate (c/kWh)"
            />
            <q-input
              filled
              v-model="editLoadsheddingRate"
              label="Electrical rate during load shedding (c/kWh)"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" @click="onEditTimeSlot" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Delete time slot dialog -->
    <q-dialog v-model="deletePrompt">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="accent" text-color="white" />
          <span class="q-ml-sm"
            >Are you sure you want to delete this time slot?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="accent"
            @click="onDeleteTimeSlot"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      rows: [],
      inputStartTime: null,
      inputEndTime: null,
      inputNormalRate: null,
      inputLoadsheddingRate: null,
      editPrompt: false,
      editStartTime: null,
      editEndTime: null,
      editNormalRate: null,
      editLoadsheddingRate: null,
      oldStartTime: null,
      oldEndTime: null,
      oldNormalRate: null,
      oldLoadsheddingRate: null,
      deletePrompt: false,
      expansion: false,
    };
  },

  async mounted() {
    await this.fetchRates();
  },

  methods: {
    onEdit(row) {
      this.editStartTime = row.start;
      this.editEndTime = row.end;
      this.editNormalRate = row.normalRate;
      this.editLoadsheddingRate = row.loadsheddingRate;
      this.editPrompt = true;
      // Remember old values to send it to API as well
      this.oldStartTime = row.start;
      this.oldEndTime = row.end;
      this.oldNormalRate = row.normalRate;
      this.oldLoadsheddingRate = row.loadsheddingRate;
    },

    onDelete(row) {
      this.deletePrompt = true;
      // Remember old values to send it to API as well
      this.oldStartTime = row.start;
      this.oldEndTime = row.end;
      this.oldNormalRate = row.normalRate;
      this.oldLoadsheddingRate = row.loadsheddingRate;
    },

    // Fetch the rates and time slots from the API
    async fetchRates() {
      let res = await this.$api.get("api/rate/");
      this.rows = res.data;
    },

    // Add a new time slot and rate
    async onAddTimeSlot() {
      await this.$api.post("api/rate/add", {
        start: this.inputStartTime,
        end: this.inputEndTime,
        normalRate: this.inputNormalRate,
        loadsheddingRate: this.inputLoadsheddingRate,
      });

      this.expansion = false;
      this.inputStartTime = null;
      this.inputEndTime = null;
      this.inputNormalRate = null;
      this.inputLoadsheddingRate = null;
      await this.fetchRates();
    },

    // Edit a time slot and rate
    async onEditTimeSlot() {
      await this.$api.post("api/rate/edit", {
        newStartTime: this.editStartTime,
        newEndTime: this.editEndTime,
        newNormalRate: this.editNormalRate,
        newLoadsheddingRate: this.editLoadsheddingRate,
        oldStartTime: this.oldStartTime,
        oldEndTime: this.oldEndTime,
        oldNormalRate: this.oldNormalRate,
        oldLoadsheddingRate: this.oldLoadsheddingRate,
      });
      this.fetchRates();
    },

    async onDeleteTimeSlot() {
      await this.$api.delete(
        `api/rate/delete/${this.oldStartTime}/${this.oldEndTime}/${this.oldNormalRate}/${this.oldLoadsheddingRate}`
      );
      this.fetchRates();
    },
  },
});
</script>
