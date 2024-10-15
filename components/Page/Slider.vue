<script setup>

const titleText = ref(["Coffee Partner", "New Friend"]);
const activeIndex = ref(0);

function titleChanger() {
  setInterval(() => {
    activeIndex.value == 0 ? (activeIndex.value = 1) : (activeIndex.value = 0);
  }, 3100);
}

titleChanger();
</script>

<template>
  <section class="">
    <div class="h-64 flex items-center justify-center  flex-col gap-y-10">
      <div class="flex justify-center gap-5 items-center flex-wrap">
        <p class="text-5xl font-semibold">Meet your next</p>
        <div class="flex items-center relative overflow-hidden">
          <p class="text-5xl font-semibold text-primary text-animation">
            {{ titleText[activeIndex] }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
