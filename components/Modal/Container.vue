<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: [String, Number, Boolean],
  shouldOpen: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: "sm:w-full sm:max-w-lg",
  },
  showCloseBtn: {
    type: Boolean, 
    default: false
  }
});

const emit = defineEmits(["updateInput"]);

let open = ref()
open.value = props.shouldOpen;

// const submit = async () => {
//   let data = {
//     modalOpen: false,
//     id: props.id,
//   };
//   emit("updateInput", data);
// };

const close = () => {
  open.value = false;
  emit("updateInput", open.value);
};
</script>

<template>
  <TransitionRoot as="template" :show="props.shouldOpen">
    <Dialog class="relative z-50" @close="close()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex h-full md:min-h-full  items-end justify-center md:p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 h-full md:h-fit w-full md:w-fit"
              :class="classes"
            >
              <div v-if="showCloseBtn" class=" flex md:hidden justify-end"> 
                <XMarkIcon @click="close()" class="h-5 w-5 text-slate-500 dark:text-slate-200" />
              </div>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
