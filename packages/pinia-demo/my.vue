<template>
  <div>this is my</div>
  <div>num:{{ store.num }}</div>
  <div>double num:{{ store.double }}</div>
  <button @click="addNum">add</button>
</template>

<script setup lang="ts">
import { useCounterStore } from "./myPinia/counter";
import { watchEffect, onMounted } from "vue";

const store = useCounterStore();

onMounted(() => {
  setInterval(() => {
    store.$reset();
  }, 4000);
});

function addNum() {
  store.addNum();
}

watchEffect(() => {
  console.log("🚀 ~ file: my.vue:18 ~ watchEffect ~ watchEffect:", store.num);
});
</script>
