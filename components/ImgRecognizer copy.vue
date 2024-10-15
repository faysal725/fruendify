<script setup>
import * as faceapi from "face-api.js";

const modelsLoaded = ref(false);
let video = ref();

onMounted(async () => {
  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");

  console.log(faceapi);
  modelsLoaded.value = true;
});

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.value.srcObject = stream),
    (err) => console.error(err)
  );
}

const play = async () => {
  //   video = document.getElementById("video");
  let matchingImg = document.getElementById("matchingImg");

  const canvas = await faceapi.createCanvasFromMedia(video.value);
  await document.getElementById("d-container").append(canvas);
  //   document.body.append(canvas);

  const displaySize = { width: video.value.width, height: video.value.height };

  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video.value, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (!detections.length) {
      return;
    }
    const faceMatcher = new faceapi.FaceMatcher(detections);

    // const singleResult = await faceapi
    //   .detectSingleFace(matchingImg , new faceapi.TinyFaceDetectorOptions())
    //   .withFaceLandmarks()
    //   .withFaceDescriptor();

    // console.log(singleResult);
    // if (singleResult) {
    //   const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);
    //   console.log(bestMatch.toString(), 'asdfasdfsdf');
    //   return bestMatch;
    // }

    const isMatched = await faceMatch(matchingImg, faceMatcher)
    console.log(isMatched._label)

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 1000);
};

async function faceMatch(queryImage1, faceMatcher) {
  const singleResult = await faceapi
    .detectSingleFace(queryImage1, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (singleResult) {
    const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);
    return bestMatch;
  }
}

watch(
  () => modelsLoaded.value,
  () => {
    if (modelsLoaded.value) {
      startVideo();
      play();
    }
  }
);
</script>
<template>
  <div class="max-w-7xl mx-auto flex">
    <div id="d-container" class="relative">
      <video ref="video" @play="play" width="720" height="560" autoplay></video>
    </div>
    <img id="matchingImg" src="/face/self.jpeg" alt="" class="h-96 w-72" />
  </div>
</template>

<style>
canvas {
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
}

video {
  z-index: 10;
}
</style>
