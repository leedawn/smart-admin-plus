<script lang="ts" setup>
import AsyncButton from "./demo/async-button.vue";
import Modal from "./demo/modal.vue";
import DatePicker from "./demo/date-picker.vue";
import Icon from "./demo/icon.vue";
import Input from "./demo/input.vue";
import UButton from "./demo/button.vue";
</script>

<template>
  <div :class="$style.wrapper">
    <AsyncButton />
    <DatePicker />
    <Icon />
    <Input />
    <Modal />
    <UButton />
  </div>
</template>

<style lang="less" module>
.wrapper {
  width: 200px;
}
</style>
