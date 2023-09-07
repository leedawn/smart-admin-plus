<template>
  <div>this is {{ isVue3 ? "vue3" : "vue2" }}</div>
  <button @click="change">change</button>
</template>
<script setup lang="ts">
import { ref } from "vue";

let isVue3 = ref(true);
function change() {
  isVue3.value = !isVue3.value;
}
</script>
