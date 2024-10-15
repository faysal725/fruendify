<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import { ArrowLeftIcon, MapPinIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  pageType: {
    type: String,
    default: "",
  },
});

const editSection = ref("");
const userData = ref({
  about:
    "I am honest, encouraging, sweet , and always pure. I'm passionate about art, music, and good food, and I'm always up for a lively conversation or a fun adventure. In my free time, you can usually find me painting, hiking in the mountains, or checking out the latest",
});

const editController = (sectionName) => {
  if (editSection.value == sectionName) {
    editSection.value = "";
  } else {
    editSection.value = sectionName;
  }
};
</script>

<template>
  <section
    class="space-y-5 bg-lightBarley dark:bg-blackTertiary p-3 rounded-lg"
  >
    <ContainerProfileImage :pageType="pageType == 'edit' ? 'edit' : ''" />

    <ContainerProfileName :pageType="pageType == 'edit' ? 'edit' : ''" :showRoute="false"/>
    

    <!-- about me  -->
    <ContainerProfileAbout
      :data="userData.about"
      :pageType="pageType == 'edit' ? 'edit' : ''"
    />

    <!-- about  -->
    <ContainerProfileHabits :pageType="pageType == 'edit' ? 'edit' : ''" />
  </section>
</template>
