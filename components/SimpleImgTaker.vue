<script setup>
import Camera from "simple-vue-camera";

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

const camera = ref();

const devices = ref([]);
const selectedDeviceId = ref(null);

const imgData = ref(null);
const permissionGranted = ref(true);
const message = ref("Make Sure to frame your face in the oval");
const imgSrc = ref();

const loading = () =>
  console.log("Camera is loading and will start any second");
const started = () => {
  permissionGranted.value = true;
  emit("cameraReady", true);
};

const stopped = () => {
  //   camera.value.stop();
};
const paused = () => console.log("Video feed has paused");
const resumed = () => console.log("Video feed has resumed");
const reset = () => {
  imgData.value = null;
};

const cameraChange = (deviceID) =>
  console.log(`Camera has been changed to ${deviceID}`);

const snapshot = async () => {
  if (imgData.value) {
    return;
  }

  message.value = "Please Place your face properly";
  const blob = await camera.value?.snapshot();
  console.log("A snapddd", blob);

  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = () => {
    const base64Image = reader.result;
    // console.log("A snapshot has been taken", base64Image);
    if (imgData.value) {
      return;
    }
    imgData.value = base64Image;
    emit("updateInput", imgData.value);
    emit("saveImg");
  };
};

const error = (error) => {
  permissionGranted.value = false;

  emit("cameraReady", false);
};

const getDevices = async () => {
  try {
    const deviceList = await camera.value?.devices(["videoinput"]);
    console.log(deviceList);
    if (deviceList && deviceList.length == 1 && deviceList[0].deviceId == "") {
      devices.value = null;
      await getDevices();
    } else {
      console.log(deviceList);
      devices.value = deviceList;
      selectedDeviceId.value = deviceList[0]?.deviceId;

      setTimeout(() => {
        camera.value?.changeCamera(selectedDeviceId.value);
      }, 1000);
    }
    // Set the initial selected device (e.g., the first one)

    // selectedDeviceId.value = deviceList[0]?.deviceId;
  } catch (error) {
    console.error("Error getting devices:", error);
  }
};

const changeCamera = async (e) => {
  console.log(e.target.value);
  try {
    await camera.value?.changeCamera(e.target.value);
    // selectedDeviceId.value = deviceId;
    console.log(devices.value);
  } catch (error) {
    console.error("Error changing camera:", error);
  }
};

onMounted(() => {
  getDevices();
});

watch(
  () => props.shouldRestart,
  () => {
    if (props.shouldRestart) {
      imgData.value = null;
      snapshot();
    } else {
      message.value = "";
      return;
    }
  }
);
</script>

<template>
  <section>
    <div class="w-full py-4">
      <p class="text-base md:text-xl text-primary h-6 text-center">
        {{ message }}
      </p>
    </div>
    <div class="oval-video2">
      <!-- <img :src="imgData" alt="" class="h-10 w-10" /> -->

      <Camera
        v-if="permissionGranted"
        :resolution="{ width: 375, height: 350 }"
        @loading="loading"
        @started="started"
        @stopped="stopped"
        @paused="paused"
        @resumed="resumed"
        @camera-change="cameraChange"
        @snapshot="snapshot"
        @error="error"
        ref="camera"
        :device-id="selectedDeviceId"
      >
      </Camera>
    </div>

    <div
      v-if="!permissionGranted"
      class="relative h-full w-full flex justify-center pb-8"
    >
      <div
        class="border border-2 border-red-500 h-72 w-72 rounded-full flex justify-center items-center"
      >
        <p class="text-red-500 text-center">
          Please give permission to <br />
          open your camera
        </p>
      </div>
    </div>

    <!-- {{ devices }} -->
    <div v-if="devices" class="flex justify-center py-5">
      <select
        v-model="selectedDeviceId"
        @change="changeCamera"
        class="text-sm p-1 rounded-lg bg-primary text-white"
      >
        <option
          v-for="device in devices"
          :key="device.deviceId"
          :value="device.deviceId"
        >
          {{ device.label ? device.label : "Please enable your device" }}
        </option>
      </select>
    </div>
  </section>
</template>

<style>
.oval-video2 {
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="40" ry="50"/></svg>');

  mask-repeat: no-repeat;
  mask-position: center;
}

video {
  transform: scaleX(-1); /* Flip the video horizontally */
}
</style>
