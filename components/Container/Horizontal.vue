<script setup>
import {
  BuildingStorefrontIcon,
  ArrowRightCircleIcon,
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
    class="relative overflow-x-scroll scrollbar-hide pt-2 pb-3 group_hover w-full"
  >
    <div class="relative">
      <ul
        :id="containerId"
        class="flex whitespace-nowrap scrollbar-hide w-full overflow-x-scroll gap-2"
      >
        <slot />
      </ul>

      <div
        class="hidden md:absolute transition-all duration-100 scroll_btn top-1/2 -translate-y-1/2 cursor-pointer z-20 right-2"
      >
        <ButtonArrowBtn @click="scroll('right')" />
      </div>

      <div
        class="hidden md:absolute z-10 right-0 top-0 cursor-pointer bg-slate-200/30 dark:bg-slate-800/30 w-8 md:w-10 h-full"
      ></div>

      <div
        class="hidden md:absolute transition-all duration-100 scroll_btn top-1/2 -translate-y-1/2 cursor-pointer z-20 left-2 rotate-180"
      >
        <ButtonArrowBtn @click="scroll('left')" />
      </div>

      <div
        class="hidden md:absolute z-10 left-0 top-0 cursor-pointer bg-slate-200/30 dark:bg-slate-800/30 w-8 md:w-10 h-full"
      ></div>
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
