import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const res = await this.$api.get("/api/user");
      const user = await res.data;
      this.user = user;
    },
    async signUp(email, password) {
      const res = await this.$api.post("/api/user/register");
      const user = await res.data;
      this.user = user;
    },
    async signIn(email, password) {
      const res = await this.$api.post("/api/user/login");
      const user = await res.data;
      this.user = user;
    },
  },
});
