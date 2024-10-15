<script setup>
import useWordFilter from "../../composables/useWordFilter";
const props = defineProps({
  modelValue: [String, Number],
  title: String,
  label: String,
  type: String,
  error: String,
  classes: {
    type: String,
    default: "h-10 w-full p-6  block bg-white text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none"
  },
  oldValue: [String, null],
  required: {
    type: Boolean,
    default: false,
  },
});

let errorMsg = ref("");
const previous = "" + props.oldValue;

const emit = defineEmits(["update:modelValue"]);
const { text, filterWords, errorMessage, limit } = useWordFilter();

watch(
  () => props.error,
  () => {
    errorMsg.value = props.error;
  },
  { deep: true }
);

watch(
  () => errorMessage,
  () => {
    errorMsg.value = errorMessage.value;
  },
  { deep: true }
);

watch(
  () => text,
  () => {
    emit("update:modelValue", text.value);
  },
  { deep: true }
);

</script>

<template>
  <div class="flex justify-between gap-5 w-full">
    <FormInputText2 :title="label" :label="label" :type="'number'" :oldValue="''" v-model="text" />
    <div
      class="relative border border-lightGrey h-10 rounded-md px-3 py-6 w-48 flex items-center"
    >
      <select
        name="cars"
        id="cars"
        class="outline-none w-full appearance-none text-base text-darkGrey"
      >
        <option value="300">Hours</option>
        <option value="400">Days</option>
        <option value="500">Months</option>
      </select>
      <img
        src="../../assets/images/filters/chevron.png"
        alt=""
        class="h-3 w-3 absolute top-4 right-4"
      />
    </div>
  </div>
</template>
