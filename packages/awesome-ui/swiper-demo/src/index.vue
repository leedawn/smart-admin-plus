<template>
  <TopMenu />
  <RouterView />
</template>

<script setup lang="ts">
import TopMenu from "./components/top-menu.vue";
</script>

<style>
body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
