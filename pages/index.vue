<script setup>
import { XMarkIcon, PlusIcon } from "@heroicons/vue/24/outline";
import useSetColorTheme from "~/composables/useDarkmode";

definePageMeta({
  layout: "common",
  middleware: "home"
});

onMounted(() => {
  useSetColorTheme("light");
});
</script>

<template>
  <main class="md:px-2">
    <div>
      <!-- <PageHerosection /> -->
      <div class="hidden md:block">
        <PageHerosection />
      </div>
      <div class="block md:hidden">
        <PageHerosectionMobile />
      </div>
    </div>
    <!-- <ContainerDiscount /> -->
    <ContainerHowWorks />
    <ContainerMeetup />
    <ContainerTestimonial />

    <!-- <ContainerStories /> -->
  </main>

  <!-- <LoaderUniversal :loaderState="'pending'" /> -->
</template>
