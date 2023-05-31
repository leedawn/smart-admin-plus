<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <UModal
    v-model:visible="visible"
    title="test modal"
    :confirm-loading="confirmLoading"
    @ok="ok"
  >
    {{ content }}
  </UModal>
  <Button @click="show" type="primary"> show </Button>
</template>

<script setup lang="ts">
import { Button } from "ant-design-vue";
import { ref } from "vue";

const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const content = ref<string>("this is content");

function show() {
  visible.value = true;
}

function ok() {
  confirmLoading.value = true;
  content.value = "this modal will be closed after two seconds";
  setTimeout(() => {
    confirmLoading.value = false;
    visible.value = false;
  }, 2000);
}
</script>
