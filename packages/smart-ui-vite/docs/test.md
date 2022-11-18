## 基本使用

`switch` 的基本使用，需要使用 `v-model` 绑定一个值

<input v-model="value1" />
<br />
<input v-model="value2" />

::: details 显示代码

```html
<template>
  <input v-model="value1" />
  <input v-model="value2" />
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const value1 = ref(true);
  const value2 = ref(false);
</script>
```

:::
