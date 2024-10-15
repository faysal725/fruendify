<script setup>
const workflow = [
  {
    id: 0,
    title: "This is awesome",
    step: "Unlock Adventures, Connect with New Faces, and Save Big with OurExclusive Event Discounts.",
  },
  {
    id: 1,
    title: "This is beautiful",
    step: "Unlock Adventures, Connect with New Faces, and Save Big with Our Exclusive Event Discounts.",
  },
  {
    id: 2,
    title: "This is fabolus",
    step: "Unlock Adventures, Connect with New Faces, and Save Big with Our Exclusive Event Discounts.",
  },
  {
    id: 3,
    title: "This is awesome",
    step: "Unlock Adventures, Connect with New Faces, Exclusive Event Discounts.",
  },
];

const currentStep = ref(0);
let intervalId = ref();

onMounted(() => {
  intervalId.value = setInterval(() => {
    // console.log("Interval running");
    if (currentStep.value == 3) {
      currentStep.value = -1;
    }
    currentStep.value++;
  }, 3000); // Adjust interval time as needed
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});
</script>
<template>
  <section class="max-w-7xl mx-auto pb-28 overflow-hidden">
    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-6">
        <p class="work-process-title">How it works ?</p>
        <div class="pt-10 px-2">
          <div class="" v-for="(data, index) in workflow">
            <div class="flex items-center gap-5">
              <p
                class="text-lg md:text-2xl md:text-4xl p-1 md:p-3 rounded-lg px-4 transition-all duration-150"
                :class="
                  data.id == currentStep
                    ? 'bg-gradient-to-b from-[#FC5A5A] via-[#FC5A5A] to-[#FF774D] text-white'
                    : 'text-mediumBlack'
                "
              >
                {{ data.id }}
              </p>
              <p class="text-xs md:text-lg font-semibold text-mediumBlack">
                {{ data.step }}
              </p>
            </div>
            <span
              v-if="workflow.length !== data.id"
              class="block h-7 w-1 bg-barley ml-5 md:ml-5 my-1"
            ></span>
          </div>

          

          <div class="pt-16 flex gap-6">
            <button>
              <img src="../../assets/images/howWorks/googlePlay.png" alt="" />
            </button>
            <button>
              <img src="../../assets/images/howWorks/appStore.png" alt="" />
            </button>
          </div>
        </div>
      </div>

      <div class="col-span-6 flex items-end relative z-0 justify-end">


        <img
          src="~~/assets/images/howWorks/Freundify-portrait.png"
          alt=""
          class="z-30 transition-all duration-300 absolute top-0 right-0 hidden md:block object-contain h-[75vh]"
          :style="{ backgroundImage: `url(~~/assets/images/howWorks/Freundify-portrait.png)` }"
          :class="currentStep == 0 ? 'translate-x-0' : 'translate-x-full'"
        />

        <img
          src="~~/assets/images/howWorks/slides/2.png"
          alt=""
          class="z-30 transition-all duration-300 absolute top-0 right-0 hidden md:block object-contain h-[75vh]"
          :class="currentStep == 1 ? 'translate-x-0' : 'translate-x-full'"
        />

        <img
          src="~~/assets/images/howWorks/slides/1.png"
          alt=""
          class="z-30 transition-all duration-300 absolute top-0 right-0 hidden md:block object-contain h-[75vh]"
          :class="currentStep == 2 ? 'translate-x-0' : 'translate-x-full'"
        />

        <img
          src="~~/assets/images/howWorks/slides/3.png"
          alt=""
          class="z-30 transition-all duration-300 absolute top-0 right-0 hidden md:block object-contain h-[75vh]"
          :class="currentStep == 3 ? 'translate-x-0' : 'translate-x-full'"
        />
      </div>
    </div>
  </section>
</template>
