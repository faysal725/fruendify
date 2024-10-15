<script setup>
const props = defineProps({
  no_of_items: {
    default: 0,
    type: Number,
  },
});
const emit = defineEmits(["updateInput"]);
let openModal = ref(false);

function submitDeleteEmit(dt) {
  if (dt === false) {
    openModal.value = false;
  } else {
    openModal.value = false;
    emit("updateInput");
  }
}
</script>

<template>
  <div
    v-if="no_of_items > 0"
    class="flex items-center justify-between mb-2 bg-green-200 py-2 px-4 rounded-md"
  >
    <p class="text-green-800 font-semibold text-xs">
      {{ no_of_items }} are selected
    </p>
    <div>
      <!-- <ButtonSecondary @click="openModal = true" :name="'Delete'" /> -->
      <button  @click="openModal = true" class="text-xs bg-red-600/70 hover:bg-red-600 p-2 px-4 font-semibold rounded-md text-white">Delete</button>
    </div>

    <ModalDelete
      :id="1"
      :title="'Do you want to delete these items?'"
      :description="'This action can not be undone'"
      :shouldOpen="openModal"
      :path="props.deleteLink"
      @update-input="submitDeleteEmit"
    />
  </div>
</template>
