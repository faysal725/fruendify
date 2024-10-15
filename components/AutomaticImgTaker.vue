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
  insiderCall: {
    type: Boolean,
    default: true,
  },
  shouldRestart: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits([
  "updateInput",
  "saveImg",
  "closeModal",
  "cameraReady",
]);

const currentCamera = ref();
const video = ref();
const canvas = ref();
const img_container = ref();
let matchingImg = ref();
const message = ref("Make Sure to frame your face in the oval");
const currentImg = ref(0);
const isCameraOn = ref(false);
const processRepeatation = ref({
  noOfTries: 0,
  noOfMatched: 0,
});

const { videoInputs: cameras, permissionGranted } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    console.log(cameras.value);
    if (!cameras.value.find((i) => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId;
  },
});

const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera } },
});

const capturePic = () => {
  canvas.value
    .getContext("2d")
    .drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

  let image_data_url = canvas.value.toDataURL("image/jpeg");
  img_container.value.src = image_data_url;

  //   let fileData = convertBase64ToFile(image_data_url, "image/jpeg", "image/jpeg")
  //   clickOnInput();

  //   message.value= ""
  console.log(img_container.value)
  emit("updateInput", image_data_url);
};

const restartCamera = async () => {
  console.log("rundded");
  message.value = "Please Place your face properly";
  await capturePic();
  await emit("saveImg");
};

const clickOnInput = () => {};

watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value;
});

onMounted(async () => {
  enabled.value = true;
  emit("cameraReady", false);
});


onUnmounted(async () => {
  emit("cameraReady", false);
});

watch(
  () => props.shouldRestart,
  () => {
    if (props.shouldRestart) {
      console.log("restart application", props.shouldRestart);
      restartCamera();
    } else {
      message.value = "";
      return;
    }
  }
);

watch(
  () => permissionGranted.value,
  () => {
    if (permissionGranted.value) {
      setTimeout(() => {
        isCameraOn.value = true;
        emit("cameraReady", isCameraOn.value);
      }, 1000);
    } else {
      isCameraOn.value = false;
      emit("cameraReady", isCameraOn.value);
    }
  }
);
</script>

<template>
  <div class="flex flex-col gap-4 text-center">
    <div class="flex justify-center flex-col items-start w-full gap-3 relative">
      <!-- {{ permissionGranted }}sdfsdf -->
      <div v-if="permissionGranted" class="relative h-full w-full">
        <span
          class="absolute top-0 right-0 w-full h-full z-10 oval-video"
          :class="isCameraOn ? 'bg-white/5' : 'bg-black'"
        >
        </span>
        <video ref="video" muted autoplay class="h-full w-full oval-video" />
      </div>

      <div v-else class="relative h-full w-full flex justify-center">
        <div
          class="border border-2 border-red-500 h-72 w-72 rounded-full flex justify-center items-center"
        >
          <p class="text-red-500">
            Please give permission to <br />
            open your camera
          </p>
        </div>
      </div>

      <div class="w-full py-5 pt-2">
        <p v-if="message" class="text-base md:text-xl text-primary h-6">
          {{ message }}
        </p>
      </div>

      <div class="flex gap-2 pt-2 w-full">
        <div class="relative rounded-lg overflow-hidden mr-10 hidden">
          <img
            ref="img_container"
            alt=""
            class="h-20 w-20 rounded-lg"
            id="img_taker"
          />
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

    <div class="flex justify-center hidden">
      <canvas ref="canvas" width="320" height="240"></canvas>
    </div>
  </div>
</template>

<style>
.oval-video {
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="40" ry="50"/></svg>');

  mask-repeat: no-repeat;
  mask-position: center;
}

video {
  transform: scaleX(-1); /* Flip the video horizontally */
}
</style>
