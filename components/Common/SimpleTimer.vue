<script setup>
const props = defineProps({
  start: Boolean,
  totalSecond: Number,
});

const emit = defineEmits(["timerStart"]);

const initialTime = 100; // Change this to your desired initial time (seconds)

const timer = ref(props.totalSecond);
const isTimeUp = ref(false);
const intervalId = ref(null);

const formattedTime = computed(() => {
  const minutes = Math.floor(timer.value / 60);
  const seconds = timer.value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
});

const buttonText = computed(() => {
  return timer.value > 0 ? "Stop" : "Start";
});

const startTimer = () => {
  intervalId.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(intervalId.value);
      intervalId.value = null;
      isTimeUp.value = true;

      emit("timerStart");
    }
  }, 1000);
};

const toggleTimer = () => {
  if (timer.value > 0) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  } else {
    startTimer();
  }
};

onMounted(() => {
  if (props.start) {
    startTimer();
  } else {
    isTimeUp.value = true;
  }
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});

watch(
  () => props.start,
  () => {
    if (props.start) {
      console.log(props.start);
      timer.value = props.totalSecond
      startTimer();
      isTimeUp.value = false;
    }
  },
  { deep: true }
);
</script>

<template>
  <section>
    <h1 v-if="!isTimeUp" class="text-base">
      Please request OTP after
      <span class="text-red-500 font-semibold">{{ formattedTime }}</span>
      seconds
    </h1>

    <slot v-if="isTimeUp" />
  </section>
</template>
