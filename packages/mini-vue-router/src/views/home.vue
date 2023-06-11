<script setup>
import { onBeforeRouteLeave } from "../vue-router";

//   beforeRouteEnter(to, from, next) {
//     console.log('beforeRouterEnter')
//   },
//   beforeRouteUpdate(to, from, next) {
//     console.log('beforeRouteUpdate')
//   },
//   beforeRouteLeave(to, from, next) {
//     console.log('beforeRouteLeave')
//   },

onBeforeRouteLeave(() => {
  console.log("离开哈哈哈哈");
});
</script>

<template>
  <div class="home">
    首页
    <hr />

    <router-link to="/a">a页面</router-link>
    <router-link to="/b">b页面</router-link>
    <hr />
    <router-view></router-view>
  </div>
</template>
