<template>
  <h1>处理错误的页面</h1>
  <div @click="nagivate">click</div>
</template>

<script setup lang="ts">
const nagivate = () => clearError({ redirect: "/about" });
</script>
