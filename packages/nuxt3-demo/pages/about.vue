<template>
  <section>
    <p class="text">This page will be displayed at the /about route.</p>
    <img src="/favicon.ico" alt="" />
    <img class="shen" src="~/assets/shen.jpeg" alt="" />
  </section>
</template>

<script>
useHead({
  title: "about",
});
</script>

<style lang="scss">
.shen {
  width: 20px;
}
.text {
  color: $secondary;
}
</style>
