<template>
  <div>
    <RouterLink to="/">默认</RouterLink>
    <RouterLink to="/timeline">时间轴</RouterLink>
  </div>
  <RouterView />
</template>
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
