<script setup>
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";
import useSetColorTheme from "~/composables/useDarkmode";
</script>

<template>
  <button
    class=" "
    @click="
      useSetColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')
    "
  >

  <!-- {{ $colorMode.preference }} -->
    <MoonIcon v-if="$colorMode.preference == 'light'" class="text-blackPrimary h-7 w-7" />
    <SunIcon v-else-if="$colorMode.preference == 'dark'" class="text-white  h-7 w-7" />
    
    <SunIcon v-else class="text-blackPrimary  h-7 w-7" />
  </button>
</template>
