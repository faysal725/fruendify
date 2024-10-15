<script setup>
import { ChevronDoubleDownIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  shouldOpen: {
    type: Boolean,
    default: false,
  },
  expand: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["updateInput"]);
const close = ref(false);

const closeModal = () => {
  // close.value =
  emit("updateInput", false);
};
</script>
<template>
  <section
    class="fixed right-0 z-50 w-full h-full transition-all duration-500 flex items-end"
    :class="shouldOpen ? '-top-10' : 'top-full'"
  >
    <!-- modal close  -->
    <span
      @click="closeModal()"
      class="absolute top-0 right-0 bg-slate-500/50 w-full h-full transition-all duration-500 ease-in-out"
      :class="shouldOpen ? 'opacity-100' : 'opacity-0'"
    ></span>

    <div
      class="bg-whitePrimary dark:bg-blackPrimary w-full p-4 transition-all duration-700 rounded-2xl ease-in-out"
      :class="shouldOpen ? 'translate-y-20' : 'translate-y-full'"
    >
      <!-- modal close  -->
      <ChevronDoubleDownIcon
        @click="closeModal()"
        class="h-8 w-8 text-primary dark:text-white cursor-pointer mx-auto mb-6 modalCloser animate-bounce"
      />
      <div class="overflow-y-scroll scrollbar-hide transition-all duration-200"
      :class="expand ? 'h-[98vh]' : 'h-[80vh]'"
      >
        <slot :expand="expand" />
      </div>
    </div>
  </section>
</template>
