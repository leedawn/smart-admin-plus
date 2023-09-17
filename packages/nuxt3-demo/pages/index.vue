<template>
  <div>
    <div @click="counter++">hello,world{{ counter }}</div>
    <Bar />
    <UserAvatar />
  </div>
</template>

<script setup lang="ts">
console.log(foo);
console.log(isDark);
// const count = ref(1);
const counter = useCounter();
const { data, error } = await useFetch("https://widgets.wp.com/languages/zh-cn-v1.1.json?ver=202337");
console.log(data);
const configs = useRuntimeConfig();
console.log(configs.apiSecret);
const appConfig = useAppConfig();
console.log(appConfig);
</script>
