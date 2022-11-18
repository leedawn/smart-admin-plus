<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <UInput v-model:value="value" trim @blur="test" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref("");

const test = (v) => {
  console.log(v);
};
</script>
