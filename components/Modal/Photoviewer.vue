<script setup>

const props = defineProps({
    openModal: {
        type:Boolean,
        default: false,
    },
    src: {
        type: String,
        default: ""
    }
})

const emit = defineEmits(["updateInput"]);

const closeModal = () => {
  emit("updateInput", false);
};
</script>

<template>
  <section
    class="fixed top-0 right-0 w-full h-full flex justify-center items-center p-4 transition-all duration-100"
    :class="
      openModal
        ? '-translate-y-0 -translate-x-0 '
        : 'translate-y-full translate-x-full '
    "
  >
    <span
      @click="closeModal"
      class="absolute top-0 right-0 w-full h-full bg-slate-500/20 transition-all duration-200"
      :class="openModal ? ' opacity-100' : ' opacity-0'"
    ></span>

    <section
      @click="closeModal"
      class="w-full md:w-[50vw] max-h-fit bg-barley p-2 rounded-xl z-10"
    >
    
      <div
        class="bg-no-repeat bg-cover bg-center w-full h-full py-40 md:py-52"
        :style="{ backgroundImage: `url(${src})` }"
      ></div>
    </section>
  </section>
</template>
