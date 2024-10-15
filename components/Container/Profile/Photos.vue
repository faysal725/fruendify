<script setup>
import {
  MapPinIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/vue/24/solid";
import { useProfileStore } from "~~/stores/profileStore";

const props = defineProps({
  pageType: {
    type: String,
    default: "none",
  },
});


const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

const additionalImages = ref([
  "/profilePg/2.png",
  "/profilePg/3.png",
  "/profilePg/4.png",
  "/profilePg/5.png",
  "/profilePg/6.png",
  "/profilePg/7.png",
]);
</script>

<template>
  <section class="space-y-3">
    <p class="text-xl font-semibold dark:text-white">Photos</p>

    <div
      v-if="pageType == 'none'"
      class="grid grid-cols-2 md:grid-cols-4 gap-2"
    >
    <div v-for="(data, index) in profileStore.profileData.userImages" class="">
        <div
          class="border border-lightGrey flex justify-center flex-col items-center rounded-lg h-36 w-full bg-no-repeat bg-cover bg-center relative"
          :style="{
            backgroundImage: `url(${networkImage(data.image)})`,
          }"
        ></div>
      </div>
    </div>

    <div
      v-if="pageType == 'edit'"
      class=""
    >
    <ContainerProfileImagesUploader />
      <!-- <div
        class="rounded-xl cursor-pointer bg-slate-300 flex justify-center items-center"
      >
        <PlusIcon class="h-12 w-12 text-slate-700" />
      </div>
      <div v-for="data in additionalImages" class="relative">
        <img :src="data" alt="" class="w-full h-full rounded-lg" />

        <div class="bg-secondary rounded-full absolute bottom-2 right-2 p-1">
          <MinusIcon class="h-4 w-4 text-white" />
        </div>
      </div> -->
    </div>
  </section>
</template>
