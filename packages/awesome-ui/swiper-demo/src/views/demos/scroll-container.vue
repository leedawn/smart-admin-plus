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
    </div>
  </template>
  
  <script setup lang="ts">
  import { Swiper, SwiperSlide } from "swiper/vue";
  import {FreeMode, Scrollbar, Mousewheel} from "swiper";
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
  



<template>
    <swiper
      :direction="'vertical'"
      :slidesPerView="'auto'"
      :freeMode="true"
      :scrollbar="true"
      :mousewheel="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide>
        <h4>Scroll Container</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, ex
          eu sagittis faucibus, ligula ipsum sagittis magna, et imperdiet dolor
          lectus eu libero. Vestibulum venenatis eget turpis sed faucibus.
          Maecenas in ullamcorper orci, eu ullamcorper sem. Etiam elit ante,
          luctus non ante sit amet, sodales vulputate odio. Aenean tristique nisl
          tellus, sit amet fringilla nisl volutpat cursus. Quisque dignissim
          lectus ac nunc consectetur mattis. Proin vel hendrerit ipsum, et
          lobortis dolor. Vestibulum convallis, nibh et tincidunt tristique, nisl
          risus facilisis lectus, ut interdum orci nisl ac nunc. Cras et aliquam
          felis. Quisque vel ipsum at elit sodales posuere eget non est. Fusce
          convallis vestibulum dolor non volutpat. Vivamus vestibulum quam ut
          ultricies pretium.
        </p>
        <p>
          Suspendisse rhoncus fringilla nisl. Mauris eget lorem ac urna
          consectetur convallis non vel mi. Donec libero dolor, volutpat ut urna
          sit amet, aliquet molestie purus. Phasellus faucibus, leo vel
          scelerisque lobortis, ipsum leo sollicitudin metus, eget sagittis ante
          orci eu ipsum. Nulla ac mauris eu risus sagittis scelerisque iaculis
          bibendum mauris. Cras ut egestas orci. Cras odio risus, sagittis ut nunc
          vitae, aliquam consectetur purus. Vivamus ornare nunc vel tellus
          facilisis, quis dictum elit tincidunt. Donec accumsan nisi at laoreet
          sodales. Cras at ullamcorper massa. Maecenas at facilisis ex. Nam mollis
          dignissim purus id efficitur.
        </p>
        <p>
          Curabitur eget aliquam erat. Curabitur a neque vitae purus volutpat
          elementum. Vivamus quis vestibulum leo, efficitur ullamcorper velit.
          Integer tincidunt finibus metus vel porta. Mauris sed mauris congue,
          pretium est nec, malesuada purus. Nulla hendrerit consectetur arcu et
          lacinia. Suspendisse augue justo, convallis eget arcu in, pretium tempor
          ligula. Nullam vulputate tincidunt est ut ullamcorper.
        </p>
        <p>
          Curabitur sed sodales leo. Nulla facilisi. Etiam condimentum, nisi id
          tempor vulputate, nisi justo cursus justo, pellentesque condimentum diam
          arcu sit amet leo. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. In placerat tellus a posuere vehicula.
          Donec diam massa, efficitur vitae mattis et, pretium in augue. Fusce
          iaculis mi quis ante venenatis, sit amet pellentesque orci aliquam.
          Vestibulum elementum posuere vehicula.
        </p>
        <p>
          Sed tincidunt diam a massa pharetra faucibus. Praesent condimentum id
          arcu nec fringilla. Maecenas faucibus, ante et venenatis interdum, erat
          mi eleifend dui, at convallis nisl est nec arcu. Duis vitae arcu
          rhoncus, faucibus magna ut, tempus metus. Cras in nibh sed ipsum
          consequat rhoncus. Proin fringilla nulla ut augue tempor fermentum. Nunc
          hendrerit non nisi vitae finibus. Donec eget ornare libero. Aliquam
          auctor erat enim, a semper risus semper at. In ut dui in metus tincidunt
          euismod eget et lacus. Aenean et dictum urna, sed rhoncus lorem. Duis
          pharetra sagittis odio. Etiam a libero ut nisi feugiat tincidunt vel
          vitae turpis. Maecenas vel orci sit amet lorem hendrerit venenatis
          sollicitudin ut dui. Quisque rhoncus nibh in massa pretium scelerisque.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, ex
          eu sagittis faucibus, ligula ipsum sagittis magna, et imperdiet dolor
          lectus eu libero. Vestibulum venenatis eget turpis sed faucibus.
          Maecenas in ullamcorper orci, eu ullamcorper sem. Etiam elit ante,
          luctus non ante sit amet, sodales vulputate odio. Aenean tristique nisl
          tellus, sit amet fringilla nisl volutpat cursus. Quisque dignissim
          lectus ac nunc consectetur mattis. Proin vel hendrerit ipsum, et
          lobortis dolor. Vestibulum convallis, nibh et tincidunt tristique, nisl
          risus facilisis lectus, ut interdum orci nisl ac nunc. Cras et aliquam
          felis. Quisque vel ipsum at elit sodales posuere eget non est. Fusce
          convallis vestibulum dolor non volutpat. Vivamus vestibulum quam ut
          ultricies pretium.
        </p>
        <p>
          Suspendisse rhoncus fringilla nisl. Mauris eget lorem ac urna
          consectetur convallis non vel mi. Donec libero dolor, volutpat ut urna
          sit amet, aliquet molestie purus. Phasellus faucibus, leo vel
          scelerisque lobortis, ipsum leo sollicitudin metus, eget sagittis ante
          orci eu ipsum. Nulla ac mauris eu risus sagittis scelerisque iaculis
          bibendum mauris. Cras ut egestas orci. Cras odio risus, sagittis ut nunc
          vitae, aliquam consectetur purus. Vivamus ornare nunc vel tellus
          facilisis, quis dictum elit tincidunt. Donec accumsan nisi at laoreet
          sodales. Cras at ullamcorper massa. Maecenas at facilisis ex. Nam mollis
          dignissim purus id efficitur.
        </p>
        <p>
          Curabitur eget aliquam erat. Curabitur a neque vitae purus volutpat
          elementum. Vivamus quis vestibulum leo, efficitur ullamcorper velit.
          Integer tincidunt finibus metus vel porta. Mauris sed mauris congue,
          pretium est nec, malesuada purus. Nulla hendrerit consectetur arcu et
          lacinia. Suspendisse augue justo, convallis eget arcu in, pretium tempor
          ligula. Nullam vulputate tincidunt est ut ullamcorper.
        </p>
        <p>
          Curabitur sed sodales leo. Nulla facilisi. Etiam condimentum, nisi id
          tempor vulputate, nisi justo cursus justo, pellentesque condimentum diam
          arcu sit amet leo. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. In placerat tellus a posuere vehicula.
          Donec diam massa, efficitur vitae mattis et, pretium in augue. Fusce
          iaculis mi quis ante venenatis, sit amet pellentesque orci aliquam.
          Vestibulum elementum posuere vehicula.
        </p>
        <p>
          Sed tincidunt diam a massa pharetra faucibus. Praesent condimentum id
          arcu nec fringilla. Maecenas faucibus, ante et venenatis interdum, erat
          mi eleifend dui, at convallis nisl est nec arcu. Duis vitae arcu
          rhoncus, faucibus magna ut, tempus metus. Cras in nibh sed ipsum
          consequat rhoncus. Proin fringilla nulla ut augue tempor fermentum. Nunc
          hendrerit non nisi vitae finibus. Donec eget ornare libero. Aliquam
          auctor erat enim, a semper risus semper at. In ut dui in metus tincidunt
          euismod eget et lacus. Aenean et dictum urna, sed rhoncus lorem. Duis
          pharetra sagittis odio. Etiam a libero ut nisi feugiat tincidunt vel
          vitae turpis. Maecenas vel orci sit amet lorem hendrerit venenatis
          sollicitudin ut dui. Quisque rhoncus nibh in massa pretium scelerisque.
        </p>
      </swiper-slide>
    </swiper>
  </template>
  <script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  
  // Import Swiper styles
  import "swiper/css";
  
  import "swiper/css/free-mode";
  import "swiper/css/scrollbar";
  
  import "./style.css";
  
  // import required modules
  import { FreeMode, Scrollbar, Mousewheel } from "swiper";
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [FreeMode, Scrollbar, Mousewheel],
      };
    },
  };
  </script>
  