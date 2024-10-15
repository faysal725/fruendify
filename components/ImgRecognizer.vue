<script setup>
import { ref, watchEffect } from "vue";
import { useDevicesList, useUserMedia } from "@vueuse/core";
import * as faceapi from "face-api.js";

const props = defineProps({
  userImages: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(["update:modelValue"]);

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
  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  // await faceapi.nets.faceExpressionNet.loadFromUri("/models");
});

onMounted(async () => {
  enabled.value = true;
  setTimeout(() => {
    capturePic();
  }, 1000);
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
  Matching();
};

const Matching = async () => {
  const firstResult = await faceapi
    .detectSingleFace(
      img_container.value,
      new faceapi.TinyFaceDetectorOptions()
    )
    .withFaceLandmarks()
    .withFaceDescriptor();
  if (!firstResult) {
    isMatched.value = "Place your face properly.";
    setTimeout(() => {
      capturePic();
    }, 2000);
    return;
  }

  // create faceMatcher
  const faceMatcher = new faceapi.FaceMatcher(firstResult);

  // console.log(matchingImg.value);
  const secondResult = await faceapi
    .detectSingleFace(matchingImg.value, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();
  console.log(secondResult);
  if (secondResult) {
    const bestMatch = faceMatcher.findBestMatch(secondResult.descriptor);

    if (bestMatch._label == "person 1") {
      isMatched.value = "Matched";
      processRepeatation.value.noOfMatched++;
      processRepeatation.value.noOfTries = 0;
      nextImageSrc();
    } else {
      isMatched.value = "Did not match";
      if (processRepeatation.value.noOfTries <= 5) {
        processRepeatation.value.noOfTries++;
        setTimeout(() => {
          capturePic();
        }, 2000);
      } else {
        skipOneImageSrc();
      }
    }
    return bestMatch;
  } else {
    processRepeatation.value.noOfTries++;
    isMatched.value = "Place your face according to image.";

    if (processRepeatation.value.noOfTries <= 5) {
      setTimeout(() => {
        capturePic();
      }, 2000);
    } else {

      skipOneImageSrc();
    }
  }
};

const skipOneImageSrc = () => {
  if (currentImg.value < props.userImages.length - 1) {
    let curr = currentImg.value;
    currentImg.value = curr + 1;
    isMatched.value = "Skipping to next image";
    processRepeatation.value.noOfTries = 0;
    setTimeout(async () => {
      await Matching();
    }, 2000);
  } else if (
    currentImg.value == props.userImages.length - 1 &&
    processRepeatation.value.noOfMatched >= 2
  ) {
    isMatched.value = "Done. Go to next step";
    emit("update:modelValue", true);
  } else {
    isMatched.value = "Process failed !!! Please upload image again";
    emit("update:modelValue", false);
  }
};

const nextImageSrc = () => {
  if (currentImg.value < props.userImages.length - 1) {
    let curr = currentImg.value;
    currentImg.value = curr + 1;
    isMatched.value = "Matched!! Try Another";
    processRepeatation.value.noOfTries = 0
    setTimeout(() => {
      Matching();
    }, 2000);
  } else if (
    currentImg.value == props.userImages.length - 1 &&
    processRepeatation.value.noOfMatched >= 2
  ) {
    isMatched.value = "Done. Go to next step";
  } else {
    isMatched.value = "Process failed !!! Please upload image again";
  }
};

watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value;
});
</script>

<template>
  <div class="flex flex-col gap-4 text-center">
    <p class="text-xl text-primary h-6">{{ isMatched }}</p>
    <div class="flex items-center gap-3 justify-end">
      <!-- {{ processRepeatation.noOfTries }} -->
      <!-- <button
        @click="enabled = !enabled"
        class="bg-primary p-2 rounded-lg text-white w-fit"
      >
        {{ enabled ? "Stop" : "Start" }}
      </button> -->
      <!-- <button
        @click="capturePic()"
        class="bg-primary p-2 rounded-lg text-white w-fit"
      >
        Match your face
      </button> -->
    </div>
    <div class="flex justify-center flex-col items-start w-full gap-3">
      <video ref="video" muted autoplay controls class="h-full w-full" />
      <div class="flex gap-2 pt-2 w-full">
        <div class="relative rounded-lg overflow-hidden mr-10">
          <img ref="img_container" alt="" class="h-20 w-14" />
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
    <div class="flex justify-center max-w-5xl mx-auto hidden">
      <img
        ref="matchingImg"
        :src="userImages[currentImg].imgSrc"
        alt=""
        class="h-40 w-28"
      />
    </div>

    <div class="flex justify-center hidden">
      <canvas ref="canvas" width="320" height="240"></canvas>
    </div>
  </div>
</template>
