<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props:{
    perSlide: Number,
    autoPlay: {
      type:Boolean,
      default: true,
    }
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
};
</script>

<template>
    
     <swiper
      :pagination="true"
      :modules="modules"
      :autoplay="autoPlay"
    :slides-per-view="perSlide"
      class="mySwiper"
    >
      
      <slot />

    </swiper>
</template>