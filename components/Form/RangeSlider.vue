<script setup>
import Slider from "@vueform/slider";

const props = defineProps({
  title: String,
  valueRange: {
    type: Array,
    default: [0, 100],
  },
  unit: {
    type: String,
    default: "none",
  },
  singleRange: {
    type: Number,
    default: 0,
  },
  isSingle: {
    type: Boolean,
    default: false
  },
  isRed: {
    type: Boolean,
    default: false
  }
});

const range = ref(props.isSingle ? props.singleRange : props.valueRange);
const emit = defineEmits(["change"]);

// export default {
//   components: {
//     Slider,
//   },
//   data() {
//     return {
//       value: [10 , 100]
//     }
//   }
// }

onMounted(() => {

  console.log(range.value)
  emit("change", range.value);
})

watch(
  () => range.value,
  () => {
    emit("change", range.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="">
    <div class="flex justify-between text-gray-700 dark:text-slate-200 text-xs leading-5 font-medium capitalize pb-5 cursor-default">
      <span>{{ title }}</span>
      <span v-if="isSingle">{{ range }} {{ unit }}</span>
      <span v-else>{{ range[0] }}-{{ range[1] }} {{ unit }}</span>
    </div>
    <div class="px-2">

      <Slider v-model="range" :class="isRed ? 'slider-red' : 'slider-primary'"/>
    </div>
    <!-- <div class="pt-5 flex justify-between items-center gap-x-8">
      <input
        type="text"
        v-model="range[0]"
        class="border border-lightGrey px-4 w-44 rounded-md"
      />
      <p class="rotate-90 text-3xl font-extralight text-lightGrey">|</p>
      <input
        type="text"
        v-model="range[1]"
        class="border border-lightGrey px-4 w-44 rounded-md"
      />
    </div> -->
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
.slider-red {
  --slider-connect-bg: #EF4444;
  --slider-tooltip-bg: #EF4444;
  --slider-handle-ring-color: #EF444430;
}

.slider-primary {
  --slider-connect-bg: #FF774D;
  --slider-tooltip-bg: #FF774D;
  --slider-handle-ring-color: #EF444430;
}
</style>