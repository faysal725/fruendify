<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const selectedOptions = ref([]);

const selectOption = (option) => {
  if (selectedOptions.value.includes(option.id)) {
    let index = selectedOptions.value.indexOf(option.id);
    selectedOptions.value.splice(index, 1);
  } else {
    selectedOptions.value.push(option.id);
  }

  console.log(selectedOptions.value);
  emit("update:modelValue", selectedOptions.value);
};
</script>

<template>
  <section class="grid grid-cols-2 md:grid-cols-5 gap-5">
    <div
      v-for="data in options"
      class="relative rounded-md overflow-hidden"
      :class="
        selectedOptions.includes(data.id)
          ? 'border border-2 border-red-400'
          : ''
      "
      @click="selectOption(data)"
    >
      <img src="~~/assets/images/interest/1.png" alt="" />
      <div
        class="absolute bottom-2 left-2 rounded-sm font-medium bg-white z-10"
      >
        <p class="text-sm p-1">{{ data.name }}</p>
      </div>

      <span
        v-show="selectedOptions.includes(data.id)"
        class="block absolute top-0 right-0 w-full h-full bg-slate-200/70 z-0"
      ></span>
    </div>
  </section>
</template>
