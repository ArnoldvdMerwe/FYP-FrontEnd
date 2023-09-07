<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Renewable energy trading platform </q-toolbar-title>

        <q-btn
          flat
          dense
          label="Log out"
          class="q-mr-xs"
          @click="userStore.logOut()"
        />
      </q-toolbar>
    </q-header>

    <!-- Links menu -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list v-if="userStore.user.user_role === 'Homeowner'">
        <q-item-label header> Main Menu </q-item-label>
        <EssentialLink
          v-for="link in homeownerLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-list v-if="userStore.user.user_role === 'Admin'">
        <q-item-label header> Main Menu </q-item-label>
        <EssentialLink
          v-for="link in adminLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container
      style="
        background-image: url(login_background.jpg);
        background-repeat: no-repeat;
        background-size: cover;
      "
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useUserStore } from "../stores/user-store";
import EssentialLink from "components/EssentialLink.vue";

const homeownerLinksList = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/dashboard",
  },
  {
    title: "Settings",
    icon: "settings",
    link: "/settings",
  },
];

const adminLinksList = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/admindashboard",
  },
  {
    title: "Homes",
    icon: "house",
    link: "/adminhomes",
  },
  {
    title: "Inverter",
    icon: "bolt",
    link: "/admininverter",
  },
  {
    title: "Electrical rates",
    icon: "toll",
    link: "/adminrates",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const userStore = useUserStore();

    return {
      homeownerLinks: homeownerLinksList,
      adminLinks: adminLinksList,
      leftDrawerOpen,
      userStore,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
