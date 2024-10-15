<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
const props = defineProps({
  modelValue: [String, Number],
  classes: {
    type: String,
    default:
      "h-8 rounded-full border border-lightGrey px-5 flex items-center w-full md:max-w-xs ",
  },
  uniqueContainerClass: {
    type: String,
    default: "search-container",
  },
});

const emit = defineEmits(["update:modelValue"]);

const searchString = ref();

let openModal = ref(false);

const change = () => {
  // open.value = true
  openModal.value = true;
};

const close = () => {
  openModal.value = false;
};

watch(
  () => searchString.value,
  () => {
    emit("update:modelValue", searchString.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="dark:bg-blackSecondary dark:text-slate-200" :class="classes">
    <!-- <input
      v-model="searchString"
      type="text"
      class="w-full h-full outline-none text-sm bg-white dark:bg-blackSecondary"
      placeholder="Search "
    /> -->
    <FormKit
      type="text"
      name=""
      v-model="searchString"
      :id="uniqueContainerClass"
      label="Name"
    />
    <MagnifyingGlassIcon
      @click="$emit('update:modelValue', searchString)"
      class="h-4 w-4 cursor-pointer text-gray-500"
    />
  </div>
</template>

<style >
input::placeholder {
  text-align: start;
  font-size: 12px;
}

.formkit-outer {
  width: 100%;
}
.formkit-inner {
  border-color: red;
  outline: none;
  width: 100%;
}
.formkit-input{
  width: 100%;
  text-align: start;
  outline: none;
  background: transparent;
}
.formkit-label{
  display: none;
}
</style>
