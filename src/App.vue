<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
</style>
