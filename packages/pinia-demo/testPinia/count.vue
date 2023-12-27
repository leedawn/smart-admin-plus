<template>
  <h2>应该是自己写的</h2>
  <div>num:{{ store.num }}</div>
  <div>doubleNum:{{ store.double }}</div>
  <button @click="add">add</button>
</template>

<script lang="ts" setup>
import { useCounterStore } from "./counter";

const store = useCounterStore();

function add() {
  store.add();
}
</script>
