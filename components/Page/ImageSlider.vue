<script setup>
import { VueMarqueeSlider } from "vue3-marquee-slider";
import "@/node_modules/vue3-marquee-slider/dist/style.css";
import {
  CalendarIcon,
  MapPinIcon,
  UserIcon
} from "@heroicons/vue/24/outline";



const props = defineProps({
  usersData: Array,
  isReverse: {
    default: false,
    type: Boolean
  },
  title: String,
  zIndex: String,
  imgWidth: {
    type: Number,
    default:200
  }
});

const stop = ref(false)

</script>

<template>
  <ul :class="'relative ' +zIndex"  @mouseover="stop = true"    @mouseleave="stop = false" >
    <vue-marquee-slider :id="title" :speed="50000" :width="imgWidth ? imgWidth : 200" :space="20" :reverse="isReverse" :paused="stop">
        <div v-for="(user, index) in usersData" :key="index" class="relative cursor-pointer group z-10">
            <img   :src="user.imgSrc" class="h-full w-full group-hover:scale-0" /> 
            <span class="group-hover:scale-0 transition-all duration-150 bg-slate-200/70 absolute top-0 right-0 w-full h-full"></span> 

            <div class="scale-0 group-hover:scale-100 transition-all duration-200 absolute top-0 right-0 w-full h-fit z-40 bg-white pb-3 rounded-lg shadow-xl">
                <div class="w-full h-full rounded-lg overflow-hidden">
                    <img   :src="user.imgSrc" class="h-full w-full object-cover" />
                    <div class="flex bg-secondary items-center justify-start px-3 py-1  gap-x-2">
                        <CalendarIcon class="h-4 w-4 text-white" />
                        <p class="font-thin  text-white text-sm"> 
                        July 25, 2022</p>
                    </div> 
                    
                </div>
                <div class="px-3 space-y-2">
                    <p class="text-primary text-lg font-bold pt-3">Going to a Coffee Date</p>
                    <p class="text-sm text-darkGrey">Lorem ipsum dolor, sit amet consectetur adipisicing elit.  </p>
                    <div class="flex justify-between">
                        <span class="text-xs text-darkGrey flex items-center gap-x-1">
                          <span class="block h-1.5 w-1.5 bg-primary rounded-full"></span>
                          Singapore</span>
                        <span class="text-xs text-darkGrey flex items-center gap-x-1">
                          <MapPinIcon class="text-primary gap-x-2 h-4 w-4" />
                          800 meter
                        </span>
                        <span class="text-xs text-darkGrey flex items-center gap-x-1">
                          <UserIcon class="text-primary gap-x-2 h-4 w-4" />
                          
                          Dating
                        </span>
                    </div>
                </div>
            </div>
        </div>

    </vue-marquee-slider>

    
  </ul>
</template>
