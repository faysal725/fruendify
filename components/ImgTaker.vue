<script setup>
import { ref, watchEffect } from "vue";
import { CameraIcon, XMarkIcon, ArrowPathIcon } from "@heroicons/vue/24/solid";
import { useDevicesList, useUserMedia } from "@vueuse/core";
import * as faceapi from "face-api.js";

const props = defineProps({
  userImages: {
    type: Array,
    default: [],
  },
  insiderCall:{
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(["updateInput", "saveImg", "closeModal"]);

const currentCamera = ref();
const video = ref();
const canvas = ref();
const img_container = ref();
let matchingImg = ref();
const isMatched = ref("");
const currentImg = ref(0);
const processRepeatation = ref({
  noOfTries: 0,
  noOfMatched: 0,
});

onMounted(async () => {
  //   await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  //   await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  //   await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  // await faceapi.nets.faceExpressionNet.loadFromUri("/models");
});

onMounted(async () => {
  enabled.value = true;
  //   setTimeout(() => {
  //     capturePic();
  //   }, 1000);
});

const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find((i) => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId;
  },
});

const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera } },
});

const capturePic = () => {
  isMatched.value = "";
  canvas.value
    .getContext("2d")
    .drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

  let image_data_url = canvas.value.toDataURL("image/jpeg");
  img_container.value.src = image_data_url;

  //   let fileData = convertBase64ToFile(image_data_url, "image/jpeg", "image/jpeg")
  //   clickOnInput();

  emit("updateInput", image_data_url);
};

const clickOnInput = () => {
};

watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value;
});
</script>

<template>
  <div class="flex flex-col gap-4 text-center">
    <p class="text-xl text-primary h-6">{{ isMatched }}</p>
    <div class="flex items-center gap-3 justify-end">
      <!-- <button
        @click="enabled = !enabled"
        class="bg-primary p-2 rounded-lg text-white w-fit"
      >
        {{ enabled ? "Stop" : "Start" }}
      </button> -->


      <button
        @click="capturePic()"
        class="bg-primary dark:bg-red-900 hover:bg-red-800 dark:hover:bg-red-500 p-2 rounded-lg text-white w-fit transition-all duration-150"
      >
        <CameraIcon class="h-6 w-6 text-white" />
      </button>
      <button
        @click="emit('saveImg')"
        class="bg-primary dark:bg-red-900 hover:bg-red-800 dark:hover:bg-red-500 p-2 rounded-lg text-white w-fit transition-all duration-150"
      v-if="insiderCall"
      >
        Save
      </button>
      <button
        @click="img_container.src = ''"
        class="bg-primary dark:bg-red-900 hover:bg-red-800 dark:hover:bg-red-500 p-2 rounded-lg text-white w-fit transition-all duration-150 mr-auto"
      >
        <ArrowPathIcon class="h-6 w-6 text-white" />
      </button>
      <button
        @click="emit('closeModal')"
        class=" w-fit "
      v-if="insiderCall"
      >
        <XMarkIcon class="h-7 w-7 text-blackPrimary dark:text-whitePrimary transition-all duration-150" />
      </button>
    </div>
    <div class="flex justify-center flex-col items-start w-full gap-3 ">
      <div class="relative overflow-hidden ">
        <span class="absolute top-0 right-0 bg-transparent w-full h-full z-10">
          <img
            ref="img_container"
            alt=""
            class="h-full w-full rounded-full border-none"
            id="img_taker"
          />
        </span>
        <video
          ref="video"
          muted
          autoplay
          controls
          class="h-full w-full rounded-full "
        />
      </div>
      <div class="flex gap-2 pt-2 w-full">
        <div class="relative rounded-lg overflow-hidden mr-10">
          <!-- <img
            ref="img_container"
            alt=""
            class="h-20 w-20 rounded-lg"
            id="img_taker"
          /> -->
        </div>
        <div
          v-for="(data, index) in userImages"
          class="relative rounded-lg overflow-hidden"
          :class="index == currentImg ? 'border-2 border-primary' : ''"
        >
          <img :src="data.imgSrc" alt="" class="h-20 w-14" />
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-center max-w-5xl mx-auto hidden">
      <img
        ref="matchingImg"
        :src="userImages[currentImg].imgSrc"
        alt=""
        class="h-40 w-28"
      />
    </div> -->

    <div class="flex justify-center hidden">
      <canvas ref="canvas" width="320" height="240"></canvas>
    </div>
  </div>
</template>
