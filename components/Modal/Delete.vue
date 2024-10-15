<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, TrashIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  shouldOpen: Boolean,
  path: String,
});

const emit = defineEmits(["updateInput"]);

// const open = ref(false)
open.value = props.shouldOpen;

const submit = async () => {
  let data = {
    modalOpen: false,
    id: props.id,
  };
  emit("updateInput", data);
};
</script>

<template>
  <TransitionRoot as="template" :show="props.shouldOpen">
    <Dialog as="div" class="relative z-10" @close="open = false">
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
          @click="emit('updateInput', false)"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto bg-gray-500/10">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
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
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                <div
                  class="mx-auto flex w-fit items-center justify-center rounded-full bg-violet-500 p-3"
                >
                  <TrashIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-2">
                  <DialogTitle
                    as="h3"
                    class="text-sm font-medium leading-6 text-darkGray"
                  >
                    {{ props.title }}
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-xs text-darkGray/70">
                      {{ props.description }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex gap-2">
                <button
                  class="bg-red-600 w-full border transition-all duration-100 text-white border-red-600 hover:bg-white hover:text-red-600 text-sm rounded-full p-1 text-sm"
                  @click="submit"
                >
                  Delete
                </button>

                <button
                  class="bg-green-600 w-full border transition-all duration-100 text-white border-green-600 hover:bg-white hover:text-green-600 text-sm rounded-full p-1 text-sm"
                  @click="emit('updateInput', false)"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
