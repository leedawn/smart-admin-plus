# AsyncButton 异步按钮

## 基础用法

::: tip
这是一个用于测试的提示
:::

基础的函数用法
:::demo 可以异步处理的按钮。

```vue
<template>
  <div style="margin-top:50px;">
    <AsyncButton type="primary" :click="test">异步{{str}}</AsyncButton>
  </div>
</template>

<script lang="ts" setup>
console.log('script')
import {ref} from 'vue'
const str=ref('er')
const test = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(alert("hello"));
    }, 2000);
  });
};
</script>
```

:::
