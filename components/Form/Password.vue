<script setup>
import useWordFilter from "../../composables/useWordFilter";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: [String, Number],
  title: String,
  label: String,
  type: String,
  error: String,
  oldValue: [String, null],
  placeholder: String,
  required: {
    type: Boolean,
    default: false,
  },
});

let errorMsg = ref("");
const previous = "" + props.oldValue;
const showPass = ref(props.type === "password" ? true : false);
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
  <div class="relative">
    <label
      :for="label"
      class="block text-mediumBlack text-base pb-3 leading-5 font-medium capitalize"
      ><span v-if="required" class="text-red-500 mr-1">*</span
      ><span>{{ title }}</span>
    </label>
    <div class="relative">
      <input
        class="h-10 w-full p-6 block bg-white dark:bg-blackPrimary text-base text-gray-700 dark:text-gray-300 border border-gray-300 rounded-md focus:outline-none"
        :name="label"
        :id="label"
        :type="showPass ? 'password' : 'text'"
        :placeholder="placeholder ? placeholder : 'Enter Password' "
        :value="previous"
        @input="filterWords($event.target.value)"
      />

      <div
        v-if="type === 'password'"
        class="absolute h-2 w-2 top-3 right-8 text-slate-400"
      >
        <EyeIcon
          v-show="showPass"
          @click="showPass = !showPass"
          class="h-7 w-7"
        />
        <EyeSlashIcon
          v-show="!showPass"
          @click="showPass = !showPass"
          class="h-7 w-7"
        />
      </div>
    </div>

    <div>
      <p class="text-sm text-red-600">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  text-align: start;
  font-size: 12px;
}
</style>