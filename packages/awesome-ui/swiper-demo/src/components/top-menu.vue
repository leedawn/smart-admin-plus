<template>
  <div :class="$style.wrapper">
    <div :class="$style.button"><RouterLink to="/">默认</RouterLink></div>
    <div :class="$style.button">
      <RouterLink to="/timeline">时间轴</RouterLink>
    </div>
    <div :class="$style.button">
      <RouterLink to="/grid">grid</RouterLink>
    </div>
  </div>
</template>

<style lang="less" module>
.wrapper {
  display: flex;
  align-items: center;
  height: 60px;
}
.button {
  width: 50px;
  padding: 5px;
  :global(a) {
    text-decoration: none;
    color: #000;
  }
}
</style>
