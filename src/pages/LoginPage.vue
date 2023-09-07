<template>
  <q-page class="flex flex-center">
    <div class="fit column flex-center">
      <h3 class="text-secondary text-center" style="margin-bottom: 1%">
        Renewable energy trading platform
      </h3>
      <q-icon name="home" size="10em" color="secondary" />
      <div class="full-width row flex-center">
        <div class="col-md-2">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              hide-bottom-space
              :error-message="this.errorMsg"
              :error="!validEntries"
              v-model="email"
              label="Email address"
            />
            <q-input
              filled
              hide-bottom-space
              :error-message="this.errorMsg"
              :error="!validEntries"
              type="password"
              v-model="password"
              label="Password"
            />
            <div class="row flex-center">
              <div class="column flex-center">
                <q-btn label="Log in" type="submit" color="primary" />
                <div class="row q-pa-sm">
                  <p>
                    Need an account?
                    <router-link to="/register">Sign up</router-link>
                  </p>
                </div>
                <p>
                  <router-link to="/dashboard">Guest login</router-link>
                </p>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "../stores/user-store";

export default {
  name: "LoginPage",
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      email: null,
      password: null,
      validEntries: true,
      errorMsg: "Invalid username or password",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["signIn"]),

    // When the log in button is pressed
    async onSubmit() {
      if (this.email !== null && this.password !== null) {
        this.validEntries = await this.signIn(this.email, this.password);
      } else {
        this.validEntries = false;
      }
    },
  },
};
</script>
