<script setup>
import { useMediaQuery } from "@vueuse/core";
import Rectangle1 from "../../assets/images/herosection/Rectangle1.jpg";
import Rectangle2 from "../../assets/images/herosection/Rectangle2.jpg";
import Rectangle3 from "../../assets/images/herosection/Rectangle3.jpg";
import Rectangle5 from "../../assets/images/herosection/Rectangle5.jpg";
import Rectangle6 from "../../assets/images/herosection/Rectangle6.jpg";
// import Rectangle2 from "../../assets/images/herosection/Rectangle2.jpg"
// import Rectangle3 from "../../assets/images/herosection/Rectangle3.jpg"
// import Rectangle4 from "../../assets/images/herosection/Rectangle4.jpg"

const users = [
  { imgSrc: Rectangle1 },
  { imgSrc: Rectangle2 },
  { imgSrc: Rectangle3 },
  { imgSrc: Rectangle5 },
  { imgSrc: Rectangle6 },
];
const users2 = [
  { imgSrc: Rectangle1 },
  { imgSrc: Rectangle2 },
  { imgSrc: Rectangle3 },
  { imgSrc: Rectangle5 },
  { imgSrc: Rectangle6 },
];

const titleText = ref(["Coffee Partner", "New Friend"]);
const activeIndex = ref(0);
let showSmallSlider = ref(true);

function titleChanger() {
  setInterval(() => {
    activeIndex.value == 0 ? (activeIndex.value = 1) : (activeIndex.value = 0);
  }, 3050);
}

titleChanger();

const isLargeScreen = useMediaQuery("(min-width: 1024px)");
</script>

<template>
  <main class="pb-14 md:pb-0 md:h-screen flex flex-col ">
    <section class="hidden md:block">
      <PageSlider />
    </section>
    <section class="grow flex flex-col gap-y-4 relative max-w-[100vw] overflow-hidden ">
      <div
        class="block md:hidden transition-all duration-150 absolute top-40 right-0 z-40 w-full bg-slate-800/30 py-10"
        :class="showSmallSlider ? '' : 'opacity-0 scale-0'"
      >
        <PageHeaderSmall />
      </div>
      <PageImageSlider
        :usersData="users"
        title="userData"
        zIndex="z-30"
        :imgWidth="isLargeScreen ? 200 : 250"
        @mouseover="showSmallSlider = false"
        @mouseleave="showSmallSlider = true"
      />
      <PageImageSlider
        :usersData="users2"
        :isReverse="true"
        title="userData2"
        zIndex="z-20"
        :imgWidth="isLargeScreen ? 200 : 250"
        @mouseover="showSmallSlider = false"
        @mouseleave="showSmallSlider = true"
      />
    </section>
  </main>
</template>
