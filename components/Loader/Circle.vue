<script setup>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
</script>

<template>
  <div class="hidden md:flex justify-center flex-col items-center w-full">
    <div class="relative overflow-hidden rounded-full  w-fit">
      <circle-progress
        :percent="65"
        :is-gradient="true"
        :gradient="{
          angle: 90,
          startColor: '#FF5353',
          stopColor: '#FF774D',
        }"
        :size="128"
        :border-width="6"
        :border-bg-width="6"
      />
      <img
        src="../../assets/images/register/lgAvatar.png"
        alt=""
        class="rounded-full absolute top-2 right-2 h-28 w-28"
      />
    </div>
    <p class="text-3xl font-semibold text-center">Alia Aysha</p>
  </div>
  <div class="flex md:hidden items-center justify-start gap-4  w-full">
    <div class="relative overflow-hidden rounded-full">
      <circle-progress
        :percent="65"
        :is-gradient="true"
        :gradient="{
          angle: 90,
          startColor: '#FF5353',
          stopColor: '#FF774D',
        }"
        :size="128"
        :border-width="6"
        :border-bg-width="6"
      />
      <img
        src="../../assets/images/register/lgAvatar.png"
        alt=""
        class="rounded-full absolute top-2 right-2 h-28 w-28"
      />
    </div>
    <div>
      <p class="text-xl font-semibold">Alia Aysha</p>
      <p class="text-base text-darkGrey">Complete Profile</p>
    </div>
  </div>
</template>
