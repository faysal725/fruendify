<script setup>
import {
  BuildingStorefrontIcon,
  ArrowRightCircleIcon,
  ChevronLeftIcon
} from "@heroicons/vue/24/solid";
const props = defineProps({
  title: String,
  items: String,
  link: String,
  linkTitle: String,
});

const route = useRoute();

let containerId = "container-" + Math.random();

const scroll = (direction) => {
  let scrollOffset;
  if (direction == "right") {
    scrollOffset = 1000;
  } else {
    scrollOffset = -1000;
  }
  const element = document.getElementById(`${containerId}`);

  element.scroll({
    left: element.scrollLeft + scrollOffset,
    behavior: "smooth",
  });
};
</script>

<template>
  <div
    class="relative overflow-x-scroll scrollbar-hide  px-2 pb-3 group_hover"
  >
  <div class="pb-8 flex justify-between items-center">
    <p class="text-xl font-semibold">{{title}}</p>
    <div class="flex justify-center items-center gap-5">
      <ChevronLeftIcon class="h-5 w-5 text-mediumBlack hover:scale-150 transition-all duration-150 cursor-pointer" @click="scroll('left')"/>
      <ChevronLeftIcon class="h-5 w-5 text-mediumBlack rotate-180 hover:scale-150 transition-all duration-150 cursor-pointer" @click="scroll('right')"/>
    </div>
  </div>

    <div class="relative">
      <ul
        :id="containerId"
        class="flex whitespace-nowrap scrollbar-hide w-full overflow-x-scroll gap-6"
      >
        <slot />
      </ul>
      <!-- <div
        class="absolute transition-all duration-100 scroll_btn top-1/2 -translate-y-1/2 cursor-pointer z-20 right-2 "
      >
        <ButtonArrowBtn @click="scroll('right')" />
      </div>
      


      <div
        class="absolute transition-all duration-100 scroll_btn top-1/2 -translate-y-1/2 cursor-pointer z-20 left-2 rotate-180"
      >
        <ButtonArrowBtn @click="scroll('left')" />
      </div> -->

    </div>
  </div>
</template>

<style scoped>
.scroll_btn {
  scale: 0;
}
.group_hover:hover .scroll_btn {
  scale: 1;
}
</style>

<!-- <ButtonArrowBtn @click="scroll('right')"/> -->
