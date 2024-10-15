<script setup>
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  profile: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <li class="max-w-lg  rounded-lg space-y-5">
    <div class=" grid grid-cols-4 grid-rows-2 gap-2 max-h-40">
      <div class="col-span-2 row-span-2 rounded-lg overflow-hidden">
        <img :src="profile.imgSrc" alt="" class="h-full w-full object-cover" />
      </div>
      <div class="  rounded-lg overflow-hidden">
        <img
          :src="profile.allImages[0]"
          alt=""
          class="h-full w-full object-cover"
        />
      </div>
      <div class=" rounded-lg overflow-hidden ">
        <img
          :src="profile.allImages[0]"
          alt=""
          class="h-full w-full object-cover"
        />
      </div>
      <div class="col-span-2  rounded-lg overflow-hidden">
        <img
          :src="profile.allImages[0]"
          alt=""
          class="h-full w-full object-cover"
        />
      </div>
    </div>

    <div class=" flex flex-col justify-between gap-3">
      <div class="space-y-2 min-w-72">
        <p class="text-xl font-semibold">{{ profile.title }}</p>
        <p class="text-sm 	text-wrap ">
          {{ profile.description }}
        </p>
      </div>

      <div class="grid grid-cols-2 text-sm">
        <p class="flex items-center gap-1">
          <img src="~~/assets/images/profile/calendar.png" alt="" />
          {{ profile.date }}
        </p>
        <p class="text-center flex items-center gap-2 justify-center">
          <span class="block bg-red-600 h-1 w-1 rounded-full"></span>
          {{ profile.address }}
        </p>
      </div>

      <div class="grid grid-cols-2 text-sm">
        <p
          class="bg-primary p-1 px-3 capitalize text-white flex items-center gap-1"
        >
          <img
            src="../../assets/images/profile/dating.png"
            alt=""
            class="h-4 w-4"
          />
          {{ profile.type }}
        </p>
        <p class="bg-secondary p-1 px-3 flex items-center gap-2 text-white">
          <MapPinIcon class="h-4 w-4" />{{ profile.distance }}
        </p>
      </div>
    </div>
  </li>
</template>
