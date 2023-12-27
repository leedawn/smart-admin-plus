<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import VueModal from "./components/modal.vue";

const show: Ref<Boolean> = ref(false);

function controlModal() {
  show.value = !show.value;
}
</script>

<template>
  <button class="controlButton" @click="controlModal">control</button>
  <VueModal v-model:show="show">
    <h1 class="content">this is content</h1>
  </VueModal>
</template>

<style scoped>
.controlButton {
  cursor: pointer;
}
.content {
  color: blue;
}
</style>
