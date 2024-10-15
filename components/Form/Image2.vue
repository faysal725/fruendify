<script setup>
import useImage from "~/composables/useImage";
import { useImageStore } from "~~/stores/imageStore";

const props = defineProps({
  modelValue: [String, Number],
  oldValue: [String, null],
  emptyImage: {
    type:Boolean,
    default: false
  },
});

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages, clearImages } = imageStore;

const key = ref(0)

const { image, url, process, multiple, empty, resetFiles } = useImage();
const {
  image: cover_image,
  url: cover_image_url,
  process: cover_image_process,
} = useImage();

const emit = defineEmits(["update:modelValue"]);

const fileInput = ref(null)

const setImage = (data) => {
  console.log(data)
  process(data);
  // emit("update:modelValue", data);
  // emit("update:modelValue", multiple.value);
  console.log(image)
  emit("update:modelValue", image);
  fileInput.value.value = null;
};


// watch(
//   () => image,
//   () => {
//     // emit('updateInput', image.value)
//     console.log(typeof url)
//     // setImages(url)
//   },
//   { deep: true }
// );


watch(
  () => url,
  () => {
    console.log('asdfasdfasdfsdf')
    if (url.value) {
      setImages(multiple.value);
      key.value++
    }

  },
  { deep: true }
);



watch(
  () => imageStore.profileImageUrl,
  () => {

    if (imageStore.profileImageUrl.length < multiple.value.length) {
      empty()
      imageStore.profileImageUrl.map((imgData) => {
        resetFiles(imgData.imgSrc)
      })
    }
  },
  { deep: true }
);

watch(
  () => props.emptyImage,
  () => {

    if (props.emptyImage) {
      console.log('runn image2')
      clearImages()
      empty()
      key.value++
    }
  },
  { deep: true }
);


</script>

<template>
  <div class="pb-4">
    <label value="Profile Picture" />
    <div class="flex justify-between items-center">
      <label for="avatar" class="w-full">
        <span
          class="inline-block h-fit w-full overflow-hidden bg-gray-100 dark:bg-gray-500 border rounded-lg"
        >
          <!-- <img v-if="url || oldValue" :src="url" class="h-28 w-28 hidden" /> -->
          <!-- {{ imageStore.isImgLoaded }} -->

          <!-- <div class="flex justify-center flex-wrap" :key="key">
          <img
          v-for="data in multiple"
              :src="data"
              class="h-28 w-28"
            />
          </div> -->

          <!-- <div class="flex justify-center flex-wrap">
            <img
              v-for="data in imageStore.profileImageUrl"
              :src="data"
              class="h-28 w-28"
            />
          </div> -->
          <div
            class="border border-lightGrey flex justify-center flex-col items-center p-2 rounded-lg w-fit"
          >
            <img src="~~/assets/images/profile/camera.png" alt="" />
            <!-- <p class="text-sm text-darkGrey">Upload here</p> -->
          </div>
        </span>
      </label>

      <input
        @change="($event) => {
          console.log($event.target.files[0])
          setImage($event.target.files[0])
        }"
        ref="fileInput"
        id="avatar"
        name="file-upload"
        type="file"
        class="pt-6 hidden relative max-w-lg w-full h-20 font-semibold px-4 sm:max-w-full sm:text-base required text-gray-500 focus:outline-none"
      />
    </div>
  </div>
</template>
