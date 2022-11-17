<template>
  <div @click="wow">
    <AsyncButton type="primary" stop :click="test">test</AsyncButton>
  </div>
</template>

<script setup lang="ts">
const test = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 2000);
  });
};
const wow = () => {
  console.log("wow");
};
</script>
