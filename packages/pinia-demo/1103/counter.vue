<template>
  <div>default num:{{ store.num }}</div>
  <div>double num:{{ store.double }}</div>
  <div><button @click="store.add">add</button></div>
</template>

<script setup lang="ts">
import { useCounterStore } from "./counter";
const store = useCounterStore();
</script>
