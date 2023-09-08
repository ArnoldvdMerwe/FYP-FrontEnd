import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
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
      this.router.push("/login");
    },

    async signIn(email, password) {
      const res = await api
        .post("/api/user/login", {
          email: email,
          password: password,
        })
        .catch(function (err) {
          // Incorrect credentials or other error occured
          return false;
        });
      if (res !== false) {
        const user = await res.data;

        // update pinia state
        this.user = user;

        // store user details and JWT in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));

        // redirect to previous url or default to dashboard page
        if (user.user_role == "Admin") {
          this.router.push(this.returnUrl || "/admindashboard");
        } else {
          this.router.push(this.returnUrl || "/dashboard");
        }
        return true;
      } else {
        return false;
      }
    },

    logOut() {
      this.user = null;
      localStorage.removeItem("user");
      this.router.push("/login");
    },
  },
});
