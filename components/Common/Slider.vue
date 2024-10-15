<script setup>
import { ref, onUnmounted } from "vue";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  MapPinIcon,
  XCircleIcon,
  HeartIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  sliderData: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits([
  "forward",
  "backword",
  "currentdata",
  "callfavorite",
]);

const images = 2;

const currentSliderIndex = ref(0);
let intervalId;

const isTimerPaused = ref(false);
const isFavourite = ref(false);

const nextSlide = async () => {
  await emit("forward");
  console.log(props.sliderData.length);
  currentSliderIndex.value =
    (await (currentSliderIndex.value + 1)) % props.sliderData.length;
  // console.log(currentSliderIndex.value);
  // (await isTimerPaused) ? "" : startSlider();
  // console.log(props.sliderData, currentSliderIndex.value);
  // await emit(
  //   "currentdata",
  //   props.sliderData[currentSliderIndex.value]
  //     ? props.sliderData[currentSliderIndex.value]
  //     : props.sliderData[0]
  // );
};

const prevSlide = async () => {
  await emit("backword");
  // console.log("inside slider");
  currentSliderIndex.value =
    (await (currentSliderIndex.value - 1 + props.sliderData.length)) %
    props.sliderData.length;
  (await isTimerPaused) ? "" : startSlider();

  // console.log(props.sliderData, currentSliderIndex.value);
  // await emit("currentdata", props.sliderData[currentSliderIndex.value]);
};

// console.log(props.sliderData, currentSliderIndex.value)
//   await emit("currentdata", currentSliderIndex.value );

const startSlider = () => {
  intervalId = setInterval(() => {
    nextSlide();
  }, 3000);
};

const playSlider = () => {
  isTimerPaused.value = false;
  startSlider();
};

const stopSlider = () => {
  clearInterval(intervalId);
  isTimerPaused.value = true;
};

function metersToKilometers(meters) {
  return Math.floor(meters / 1000);
}

const addOrRemoveFavorite = (id, status) => {
  emit("callfavorite", {
    toUserId: id,
    isFavourite: status,
  });
};

onMounted(() => {
  // console.log(props.sliderData.allData.isFavourite);
  // console.log(props.sliderData.allData.to_user);
  // emit("callfavorite", {
  //   toUserId: props.sliderData.allData.to_user,
  //   isFavourite: props.sliderData.allData.isFavourite,
  // });
});

onUnmounted(() => {
  clearInterval(intervalId);
});

watch(
  () => currentSliderIndex.value,
  () => {
    console.log("curerntslider ", props.sliderData, currentSliderIndex.value);
    emit("currentdata", props.sliderData[currentSliderIndex.value]);
  }
);
watch(
  () => props.sliderData.length,
  () => {
    emit("currentdata", props.sliderData[currentSliderIndex.value]);
  }
);
</script>

<template>
  <div class="h-fit flex flex-col">
    <div class="slider flex h-[100%]">
      <div
        class="flex mx-auto justify-center relative w-[90vw] h-[50vh] md:w-[90vw] md:h-[65vh] lg:w-[450px] lg:h-[500px] m-auto overflow-hidden"
      >
        <template v-for="(profile, index) in props.sliderData" :key="index">
          <transition name="slide-fade">
            <div
              v-if="index === currentSliderIndex"
              class="h-full w-full absolute rounded-xl bg-no-repeat bg-cover bg-center overflow-hidden z-0"
            >
              <img
                :src="profile.src"
                alt=""
                class="absolute top-0 right-0 w-full h-full -z-10 object-cover"
              />
              <div
                class="bg-gradient-to-b from-transparent via-transparent to-black w-full h-full flex items-end z-10"
              >
                <div class="mb-14 ml-8 space-y-2">
                  <p class="text-3xl font-semibold text-whitePrimary">
                    {{ profile.name }}
                  </p>
                  <div class="flex items-center gap-3">
                    <span
                      class="flex items-center gap-1 text-slate-200 dark:text-slate-300 text-sm"
                    >
                      <MapPinIcon class="h-5 w-5 text-secondary" />
                      {{ Math.floor(profile.distance) }} KM away
                    </span>

                    <!-- <span
                      class="flex items-center gap-1 text-slate-200 dark:text-slate-300 text-sm"
                    >
                      <HeartIcon class="h-5 w-5 text-secondary" />
                      {{ profile.likes }}
                    </span> -->
                  </div>
                </div>

                <!-- <div class="absolute top-3 right-3">
                  <button
                  @click="addOrRemoveFavorite(profile.allData.user[0]._id, false)"
                    class="bg-red-200 p-2 rounded-full"
                  >
                    <HeartIcon class="h-8 w-8 text-primary" />
                  </button>
                </div> -->
              </div>
            </div>
          </transition>
        </template>
      </div>

      <div
        class="absolute right-0 top-[45%] md:-right-2 md:top-[50%] lg:-right-20 lg:top-[50%]"
        @click="nextSlide"
      >
        <ButtonChevron :left="false" />
      </div>

      <div
        class="absolute left-0 top-[45%] md:-left-2 md:top-[50%] lg:-left-20 lg:top-[50%]"
        @click="prevSlide"
      >
        <ButtonChevron :left="true" />
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, transform 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(0);
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}
</style>
