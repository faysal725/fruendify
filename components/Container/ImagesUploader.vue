<script setup>
import {
  CameraIcon,
  CheckCircleIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/solid";
import { useImageStore } from "~~/stores/imageStore";

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages, removeImages } = imageStore;

// const myComponentRef = ref(null);

// const triggerComponentClick = () => {
//   if (myComponentRef.value) {
//     myComponentRef.value.click(); // Trigger click on the component
//   }
// };
const imgData = ref({
  image: null,
  images: [],
});

const emit = defineEmits(["update:modelValue"]);

const clickOnInput = () => {

  const inputElement = document.getElementById("avatar");
  inputElement.click();
};

const imageRemover = (index) => {
  removeImages(index);
  imgData.value.images.splice(index, 1);
  emit("update:modelValue", imgData.value.images);
};

watch(
  () => imgData.value.image,
  () => {
    if (imgData.value.image) {
      imgData.value.images.push(imgData.value.image);

      emit("update:modelValue", imgData.value.images);
    }
  }
);

// watch(
//   () => imageStore.profileImageUrl,
//   () => {
//   },
//   { deep: true }
// );
</script>

<template>
  <section>
    <div class="flex justify-center">
      <FormImage2 v-show="false" v-model="imgData.image" />
    </div>
    <div class="pb-3 grid grid-cols-3 gap-5">
      <div v-for="(data, index) in [0, 1, 2, 3, 4, 5]" class="">
        <div
          v-if="imageStore.profileImageUrl[data]"
          @click="imageRemover(index)"
          class="border border-lightGrey flex justify-center flex-col items-center rounded-lg h-24 bg-no-repeat bg-cover bg-center relative"
          :style="{
            backgroundImage: `url(${imageStore.profileImageUrl[data].imgSrc})`,
          }"
        >
          <CheckCircleIcon
            v-if="index == 0 || index == 1"
            class="h-8 w-8 text-green-500 absolute -bottom-1 -right-4 z-20"
          />
          <span
            v-if="index == 0"
            class="w-full h-5 absolute bottom-0 right-0 text-xs bg-red-500/70 z-10 text-center text-xs text-white rounded-b-lg"
          >
            Profile Pic
          </span>
        </div>

        <div
          v-else
          class="border border-lightGrey flex justify-center flex-col items-center rounded-lg h-24 relative"
          @click="clickOnInput()"
        >
          <CameraIcon class="h-16 w-16 text-neutral-300" />

          <PlusCircleIcon
            v-if="index == 0 || index == 1"
            class="h-8 w-8 text-primary absolute -bottom-1 -right-4"
          />
        </div>
        <!-- <FormImage2 v-else /> -->
         
      </div>
    </div>
  </section>
</template>
