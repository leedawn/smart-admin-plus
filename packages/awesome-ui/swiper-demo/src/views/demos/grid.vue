<template>
  <div :class="$style.wrapper">
    <swiper
      :slidesPerView="3"
      :grid="{
        rows: 2,
      }"
      :spaceBetween="30"
      :pagination="{
        clickable: true,
      }"
      :modules="[Grid, Pagination]"
      class="mySwiper"
    >
      <swiper-slide>Slide 1</swiper-slide><swiper-slide>Slide 2</swiper-slide
      ><swiper-slide>Slide 3</swiper-slide><swiper-slide>Slide 4</swiper-slide
      ><swiper-slide>Slide 5</swiper-slide><swiper-slide>Slide 6</swiper-slide
      ><swiper-slide>Slide 7</swiper-slide><swiper-slide>Slide 8</swiper-slide
      ><swiper-slide>Slide 9</swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Grid, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
</script>

<style lang="less" module>
.wrapper {
  height: 100%;
  width: 100%;
  :global(.swiper) {
    width: 100%;
    height: 100%;
  }

  :global(.swiper-slide) {
    text-align: center;
    font-size: 18px;
    background: #fff;
    height: calc((100% - 30px) / 2) !important;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
}
</style>
