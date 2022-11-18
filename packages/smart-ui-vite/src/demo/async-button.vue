<template>
  <AsyncButton type="primary" stop :click="test">test</AsyncButton>
</template>

<script setup lang="ts">
const test = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 2000);
  });
};
</script>
