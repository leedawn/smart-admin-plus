<script lang="ts" setup></script>

<template>
  <NuxtLayout name="custom">
    <NuxtLink to="/">index</NuxtLink>
    <NuxtLink to="/about">about</NuxtLink>
    <NuxtLink to="/post/1">post1</NuxtLink>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.about-enter-active,
.about-leave-active {
  transition: all 0.4s;
}
.about-enter-from,
.about-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
