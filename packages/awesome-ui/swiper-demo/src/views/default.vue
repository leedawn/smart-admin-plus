<template>
  <div :class="$style.wrapper">
    <swiper
      :modules="[Navigation, Pagination, Scrollbar, A11y]"
      :slides-per-view="3"
      :space-between="50"
      :navigation="{ enabled: true }"
      :pagination="{ clickable: true, type: 'fraction' }"
      :scrollbar="{ draggable: true, dragSize: 2 }"
      :a11y="{ enabled: true, firstSlideMessage: 'haha' }"
      @swiper="onSwiper"
      @slide-change="onClideChange"
      @reach-end="reachEnd"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
      <template v-slot:wrapper-start><span>container-start</span></template>
    </swiper>
    <button @click="next">next</button>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onClideChange = () => {
  console.log("slideChange");
};
const reachEnd = (swiper) => {
  console.log(swiper);
};
// const swiper = useSwiper();
// const swiperSlide = useSwiperSlide();
const next = () => {
  // swiper.slideNext();
};
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

    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
}
</style>
