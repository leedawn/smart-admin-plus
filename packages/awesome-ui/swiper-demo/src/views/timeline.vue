<template>
  <div :class="$style.wrapper">
    <swiper
      :slides-per-view="3"
      @swiper="onSwiper"
      @slide-change="onClideChange"
    >
      <swiper-slide v-for="(item, index) in record" :key="index">
        <div :class="$style.slideItemWrapper">
          <span :class="$style.event">{{ item.event }}</span>
          <div :class="$style.dot"></div>
          <div :class="$style.date">{{ item.date }}</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";
import "swiper/css";
import { nextTick, onMounted } from "vue";

const record = [
  { event: "公司成立", date: "2019.09" },
  { event: "演示版本", date: "2019.10" },
  { event: "使用版本", date: "2020.06" },
  { event: "发布版本", date: "2020.10" },
];

onMounted(() => {
  nextTick(() => {
    const swiper = useSwiper();
    console.log(swiper);
  });
});

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onClideChange = () => {
  console.log("slideChange");
};
</script>

<style lang="less" module>
.wrapper {
  height: 100%;
  background-color: #fff;
  :global(.swiper) {
  }
  :global(.swiper-slide) {
    margin: 40px 0;
    text-align: center;
    font-size: 18px;
    background: rgb(207, 208, 211);
    height: 2px;
  }
  .slideItemWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: -20px;

    .event {
      position: relative;
      bottom: 12px;
      cursor: pointer;
    }
    .dot {
      position: relative;
      top: -8px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #000;
      display: flex;
      cursor: pointer;
      &::before,
      &::after {
        content: "";
        width: 2px;
        height: 20px;
        background-color: #fff;
        display: block;
        position: relative;
      }
      &::before {
        left: -2px;
      }
      &::after {
        right: -8px;
      }
    }
    .date {
      cursor: pointer;
    }
  }
}
</style>
