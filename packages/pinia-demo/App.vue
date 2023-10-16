<template>
  <div>hello{{ counter }}</div>
  <button @click="increment">add</button>
  <div>{{ double }}</div>
  <button @click="store.$patch((state) => state.counter++)">reset</button>
  <p>{{ store.secret }}</p>
  <p>----------------</p>
  <My />
  <p>----------------</p>
  <Count />
</template>

<script setup lang="ts">
import { useCounterStore } from "./stores/counter";
import { storeToRefs } from "pinia";
import My from "./my.vue";
import Count from "./testPinia/count.vue";

const store = useCounterStore();
const { increment } = store;
// const { counter, double } = store;

const { counter, double } = storeToRefs(store);
console.log("🚀 ~ file: App.vue:21 ~ store:", store.counter, counter);
store.$subscribe((mutation, state) => {
  console.log("🚀 ~ file: App.vue:15 ~ store.$subscribe ~ mutation:", mutation, state);
});
store.$onAction(({ name, after }) => {
  const now = Date.now();
  console.log(now, name);
  after((res) => {
    console.log(res, name);
  });
});
</script>
<!-- <script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "./stores/counter";
export default defineComponent({
  computed: {
    ...mapState(useCounterStore, ["counter"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["increment"]),
  },
});
</script> -->
