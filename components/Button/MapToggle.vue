<script setup>
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
import { MapPinIcon } from "@heroicons/vue/24/solid";
import { useVarifyStore } from "~/stores/varifyStore";

const props = defineProps({
  data: Number,
  oldValue: Boolean,
  containerClass: {
    default: "bg-mediumBlack",
    type:String
  },
  iconClass:  {
    default: "text-white",
    type:String
  },
});

const enabled = ref(props.oldValue);
const varifyStore = useVarifyStore();
const { getStatus, setStatus } = varifyStore;

const emit = defineEmits(["updateInput"]);

watch(
  () => enabled.value,
  () => {
    if (getStatus()) {
      // enabled.value = false;
      emit("updateInput", enabled.value);
    } else {
      enabled.value = false;
      emit("updateInput", enabled.value);
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    class="w-full h-full flex justify-between items-center gap-2  p-2 rounded-full border-secondary border-2 dark:bg-blackSecondary"
    :class="containerClass"
  >
    <div class="block text-gray-700 text-xs leading-5 font-medium">
      <MapPinIcon class=" h-8 w-8 " :class="iconClass" />
    </div>
    <Switch
      v-model="enabled"
      :class="[
        enabled ? 'bg-secondary' : 'bg-gray-200',
        'relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out  focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2',
      ]"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="[
          enabled ? 'translate-x-7 bg-white' : 'translate-x-0 bg-secondary',
          'pointer-events-none inline-block h-6 w-6 transform rounded-full  shadow ring-0 transition duration-200 ease-in-out',
        ]"
      />
    </Switch>
  </div>
</template>
