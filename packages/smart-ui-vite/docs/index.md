# Button 按钮

## 基础用法

基础的函数用法
:::demo 使用`color`属性来定义 Button 的样式。

```vue
<template>
  <div style="margin-top:50px;">
    <UButton color="gray">gray button</UButton>
    <UButton color="red">red button</UButton>
    <UButton color="yellow">red button</UButton>
  </div>
</template>
```

:::

## 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。
:::demo 设置 icon 属性即可。

```vue
<template>
  <div style="margin-top:50px;">
    <UButton color="gray" icon="search">gray button</UButton>
    <UButton color="red" icon="edit">red button</UButton>
    <UButton color="yellow" icon="check">red button</UButton>
  </div>
</template>
```
