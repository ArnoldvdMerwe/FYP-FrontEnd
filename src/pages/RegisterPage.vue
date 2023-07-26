<template>
  <q-page class="flex flex-center">
    <div class="fit column flex-center">
      <q-icon name="home" size="10em" color="secondary" />
      <div class="full-width row flex-center">
        <div class="column flex-center">
          <q-stepper v-model="step" ref="stepper" color="primary" animated>
            <q-step
              :name="1"
              title="Are you a homeowner or admin?"
              icon="group"
              :done="step > 1"
              style="min-height: 395px"
            >
              <q-select
                filled
                v-model="role"
                :options="roleOptions"
                label="Role"
              />
            </q-step>
            <q-step
              :name="2"
              title="Details"
              icon="info"
              :done="step > 2"
              style="min-height: 395px"
            >
              <div class="q-gutter-md">
                <q-input filled v-model="first" label="First Name" />
                <q-input filled v-model="last" label="Last Name" />
                <q-input filled v-model="email" label="Email" />
                <q-input filled v-model="cellphone" label="Cellphone number" />
                <q-input
                  v-if="role == 'Homeowner'"
                  filled
                  v-model="home"
                  label="Home number"
                />
              </div>
            </q-step>
            <q-step
              :name="3"
              title="Password"
              icon="lock"
              :done="step > 3"
              style="min-height: 395px"
            >
              <div class="q-gutter-md">
                <q-input
                  filled
                  type="password"
                  v-model="password"
                  label="Password"
                />
                <q-input
                  filled
                  type="password"
                  v-model="confirmPassword"
                  label="Confirm password"
                />
              </div>
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn
                  @click="$refs.stepper.next()"
                  color="primary"
                  :label="step === 3 ? 'Register' : 'Continue'"
                />
                <q-btn
                  v-if="step > 1"
                  flat
                  color="primary"
                  @click="$refs.stepper.previous()"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </template>
          </q-stepper>
          <div class="row q-pa-sm">
            <p>
              Already have an account?
              <router-link to="/login">Sign in</router-link>
            </p>
          </div>
          <p>
            <router-link to="/dashboard">Guest login</router-link>
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useUserStore } from "../stores/user-store";

export default {
  name: "RegisterPage",
  data() {
    return {
      step: 1,
      first: null,
      last: null,
      email: null,
      cellphone: null,
      home: null,
      password: null,
      confirmPassword: null,
      role: null,
      roleOptions: ["", "Homeowner", "Admin"],
    };
  },
  methods: {
    async onSubmit() {},
  },
};
</script>
