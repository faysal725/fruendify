<script setup>
import { HeartIcon } from "@heroicons/vue/24/solid";

const profileImages = [
  { imgSrc: "/profileImg/1.png" },
  { imgSrc: "/profileImg/2.png" },
  { imgSrc: "/profileImg/3.png" },
  { imgSrc: "/profileImg/4.png" },
  { imgSrc: "/profileImg/5.png" },
  { imgSrc: "/profileImg/1.png" },
];

const interests = [
  "Hiking",
  "Riding",
  "Swimming",
  "Traveling",
  "Fishing",
  "Fishing",
];
</script>

<template>
  <main
    class="flex flex-col items-center gap-8 border border-gray-300 p-5 rounded-lg"
  >
    <section class="flex flex-col items-center gap-3 w-full">

      <div class="w-full pb-5">
        <LoaderCircle />
      </div>

      <div class="flex justify-between w-full">
        <p class="text-gray-600 font-medium">Favorites</p>
        <p class="flex items-center gap-2 font-bold text-mediumBlack">
          <HeartIcon class="h-5 w-5 text-red-600" /> 345
        </p>
      </div>
      <div class="flex justify-between w-full">
        <p class="text-gray-600 font-medium">Event Created</p>
        <p class="flex items-center gap-2 font-bold text-mediumBlack">42</p>
      </div>

      <div class="flex justify-between w-full">
        <p class="text-gray-600 font-medium">Joined Event</p>
        <p class="flex items-center gap-2 font-bold text-mediumBlack">13</p>
      </div>

      <!-- <p class="text-primary font-bold">65% Complete</p> -->
    </section>

    <section class="w-full text-justify pt- text-darkGrey">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt veniam
        perferendis aspernatur, ratione impedit ad culpa iure cupiditate
        deserunt quaerat!
      </p>
    </section>

    <section class="w-full grid grid-cols-3 gap-5">
      <img v-for="data in profileImages" :src="data.imgSrc" alt="" />
    </section>

    <section class="w-full">
      <p class="text-base font-semibold pb-3">Interest</p>
      <div class="flex flex-wrap gap-4 border p-4">
        <p v-for="interest in interests" class="text-sm text-gray-600">
          {{ interest }}
        </p>
      </div>
    </section>

    <section class="w-full">
      <p class="text-base font-semibold pb-3">More About Me</p>
      <div class="flex flex-col gap-4 border p-4">
        <div class="flex items-center gap-3">
          <img src="~~/assets/images/profile/genders.png" alt="" />
          <p class="text-sm text-gray-600">Gender</p>

          <p class="text-sm text-gray-700 ml-auto">Female</p>
        </div>

        <div class="flex items-center gap-3">
          <img src="~~/assets/images/profile/pray.png" alt="" />
          <p class="text-sm text-gray-600">Religion</p>

          <p class="text-sm text-gray-700 ml-auto">Muslim</p>
        </div>

        <div class="flex items-center gap-3">
          <img src="~~/assets/images/profile/healthy-food.png" alt="" />
          <p class="text-sm text-gray-600">Diet</p>

          <p class="text-sm text-gray-700 ml-auto">Vegeterian</p>
        </div>

        <div class="flex items-center gap-3">
          <img src="~~/assets/images/profile/drink.png" alt="" />
          <p class="text-sm text-gray-600">Drinking</p>

          <p class="text-sm text-gray-700 ml-auto">Vegeterian</p>
        </div>

        <div class="flex items-center gap-3">
          <img src="~~/assets/images/profile/smoke.png" alt="" />
          <p class="text-sm text-gray-600">Drinking</p>

          <p class="text-sm text-gray-700 ml-auto">Vegeterian</p>
        </div>
      </div>
    </section>
  </main>
</template>
