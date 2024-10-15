<script setup>
import { CalendarIcon, MapPinIcon, UserIcon } from "@heroicons/vue/24/outline";
import { Vue3Marquee } from "vue3-marquee";

const props = defineProps({
  usersData: Array,
  isReverse: {
    default: false,
    type: Boolean,
  },
  title: String,
  zIndex: String,
  imgWidth: {
    type: Number,
    default: 200,
  },
});

const stop = ref(false);

</script>

<template>
    
  <div  class=" max-h-screen w-28  ">
    <Vue3Marquee :vertical="true" :direction="isReverse ? 'normal' : 'reverse'" duration="50">
      <img v-for="(user, index) in usersData" :src="user.imgSrc" :key="user" class="py-1"  />
    </Vue3Marquee>

  </div>

  
</template>
