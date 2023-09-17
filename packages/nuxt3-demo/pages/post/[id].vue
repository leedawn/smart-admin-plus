<template>
  <div>
    <Head><Title>post page</Title></Head>
    <div>{{ route.params.id }}</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  validate(route) {
    return /^[\d]+$/.test(route.params.id);
  },
});
const route = useRoute();
</script>
