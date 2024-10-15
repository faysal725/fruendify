<script setup>
import useImage from "~/composables/useImage";


const props = defineProps({
  modelValue: [String, Number],
  oldValue: [String, null],
});


const { image, url, process } = useImage();
const {
  image: cover_image,
  url: cover_image_url,
  process: cover_image_process,
} = useImage();


const emit = defineEmits(["update:modelValue"]);
// const emit = defineEmits(['updateInput'])

const setImage = (data) => {
  process(data)
  emit('update:modelValue', data)
}
watch(
  () => image,
  () => {
    // emit('updateInput', image.value)
    console.log(image.value)
  },
  { deep: true }
);


</script>

<template>
  <div class="pb-4">
    <Label value="Profile Picture" />
    <div class="flex justify-between items-center">
      <Label for="avatar">
        <span
          class="inline-block h-28 w-28 overflow-hidden rounded-full bg-gray-100  border border-dashed hover:border-violet-600 "
        >
          <img v-if="url || oldValue" :src="url ? url : oldValue" class="h-full w-full rounded-full" />
          <svg
            v-else
            class="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </span>
      </Label>

      <input
        @input="setImage($event.target.files[0])"
        id="avatar"
        name="file-upload"
        type="file"
        class="pt-6 hidden relative max-w-lg w-full h-20 font-semibold px-4 sm:max-w-full sm:text-base required text-gray-500 focus:outline-none"
      />
    </div>
  </div>
</template>
