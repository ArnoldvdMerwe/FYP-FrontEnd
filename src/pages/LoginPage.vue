<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="flex flex-center"
        style="
          background-image: url(../../public/login_background.jpg);
          background-repeat: no-repeat;
          background-size: cover;
        "
      >
        <div class="fit column flex-center">
          <h3 class="text-secondary" style="margin-bottom: 1%">
            Renewable energy trading platform
          </h3>
          <q-icon name="home" size="10em" color="secondary" />
          <div class="full-width row flex-center">
            <div class="col-md-2">
              <q-form @submit="onSubmit" class="q-gutter-md">
                <q-input filled v-model="email" label="Email address" />
                <q-input
                  filled
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
    </q-page-container>
  </q-layout>
</template>

<script>
import { useUserStore } from "../stores/user-store";
//import imgURL from "../assets/login_background.jpg";

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
    };
  },
  methods: {
    async onSubmit() {},
  },
};
</script>
