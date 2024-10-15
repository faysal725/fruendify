<script setup>
const props = defineProps({
  modelValue: [String, Number],
  title: String,
  label: String,
  error: String,
  oldValue: [String, null],
  required: {
    type: Boolean,
    default: false,
  },
});

let errorMsg = ref("");
const previous = "" + props.oldValue;

const emit = defineEmits(["update:modelValue"]);
watch(
  () => props.error,
  () => {
    errorMsg.value = props.error;
  },
  { deep: true }
);
</script>

<template>
  <div>
    <div class="flex justify-start items-center space-x-3">
      <input
        class="w-5 h-5 bg-white text-base text-gray-700 border border-gray-300 rounded-lg focus:outline-none"
        :name="label"
        :id="label"
        type="checkbox"
        :placeholder="'Enter ' + title"
        :value="previous"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <label
        :for="label"
        class="block text-mediumBlack text-base  leading-5 font-medium capitalize"
        ><span v-if="required" class="text-red-500 mr-1">*</span
        ><span>{{ title }}</span>
      </label>
    </div>
    <div>
      <p class="text-sm text-red-600">{{ errorMsg }}</p>
    </div>
  </div>
</template>
