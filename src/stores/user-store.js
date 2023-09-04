import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const res = await api.get("/api/user");
      const user = await res.data;
      this.user = user;
    },

    async signUp(
      firstName,
      lastName,
      email,
      cellphone,
      userType,
      password,
      home
    ) {
      await api.post("/api/user/sign-up/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        cellphone: cellphone,
        user_type: userType,
        password: password,
        home_number: home,
      });
    },

    async signIn(email, password) {
      console.log("signIn called");
      const res = await api.post("/api/user/login", {
        email: email,
        password: password,
      });
      const user = await res.data;
      this.user = user;
    },
  },
});
