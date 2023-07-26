<template>
  <q-layout>
    <q-page-container
      style="
        background-image: url(login_background.jpg);
        background-repeat: no-repeat;
        background-size: cover;
      "
    >
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition" mode="out-in">
          <component :is="Component"
        /></transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LoginRegisterLayout",
  data() {
    return {};
  },
};
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: 0.5s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: 0.5s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
