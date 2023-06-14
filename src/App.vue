<script setup>
import { computed, markRaw } from "vue";
import { RouterView, useRoute } from "vue-router";
import EmptyLayout from "./layout/EmpatyLayout.vue";
import MainLayout from "./layout/MainLayout.vue";
const route = useRoute();
const layouts = {
  "empty-layout": EmptyLayout,
  "main-layout": MainLayout,
};
const layout = computed(() =>
  markRaw(layouts[(route.meta?.layout || "empty") + "-layout"])
);
</script>

<template>
  <div>
    <component :is="layout">
      <template v-slot:content><RouterView /></template>
    </component>
  </div>
</template>
