<script setup>
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  rowId: Number,
  viewLink: String,
  editLink: String,
  deleteLink: String,
});

const emit = defineEmits(["updateInput"]);

const { apiVersion } = useRuntimeConfig().public;
let openModal = ref(false);

function submitDeleteEmit(dt) {
  if (dt === false) {
    openModal.value = false;
  } else {
    openModal.value = false;
    emit("updateInput", dt.id);
  }
}
</script>

<template>
  <td
    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm flex gap-3 text-gray-900 justify-end sm:pl-6 h-full"
  >
    <NuxtLink v-if="props.viewLink" :to="props.viewLink">
      <div class="group cursor-pointer flex flex-col items-center group">
        <EyeIcon
          class="h-4 text-blue-700 group-hover:text-blue/90 group-hover:scale-125 transition-all duration-150"
        />
      </div>
    </NuxtLink>

    <NuxtLink v-if="props.editLink" :to="props.editLink">
      <div class="group cursor-pointer flex flex-col items-center">
        <PencilSquareIcon
          class="h-4 text-yellow-700 group-hover:text-blue/90 group-hover:scale-125 transition-all duration-150"
        />
      </div>
    </NuxtLink>

    <div
      v-if="props.editLink"
      class="group cursor-pointer flex flex-col items-center"
      @click="openModal = true"
    >
      <TrashIcon
        class="h-4 text-red-600/70 group-hover:text-red-600 group-hover:scale-125 transition-all duration-150"
      />
    </div>

    <div>
      <ModalDelete
        :id="props.rowId"
        :title="'Do you want to delete this item?'"
        :description="'This action can not be undone'"
        :shouldOpen="openModal"
        :path="props.deleteLink"
        @update-input="submitDeleteEmit"
      />
    </div>
  </td>
</template>
