<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: [String, Number, Boolean],
  shouldOpenModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["updateInput"]);
let openModal = ref(props.shouldOpenModal);

const body = ref({
  interested: "",
  range:null,
});

const change = () => {
  // open.value = true
  openModal.value = true;
};

const close = () => {
  openModal.value = false;
  emit("updateInput", openModal.value);
};

let interests = ref([
  {
    id: 26,
    name: "Sports",
  },
  {
    id: 18,
    name: "Reading Books",
  },
  {
    id: 20,
    name: "Travelling",
  },
  {
    id: 11,
    name: "Domestic horticulture",
  },
  {
    id: 9,
    name: "Bank",
  },
]);

watch(
  () => props.shouldOpenModal,
  () => {
    openModal.value = props.shouldOpenModal;
  },
  { deep: true }
);

watch(
  () => body.value,
  () => {
    console.log(body.value.range)
  },
  { deep: true }
);
</script>

<template>
  <ModalContainer :shouldOpen="openModal" @update-input="close">
    <div class="space-y-5">
      <div class="border-b border-lightGrey relative">
        <p class="text-center text-xl font-medium pb-2">Filters</p>
        <XMarkIcon
          class="h-6 w-6 text-black absolute top-2 right-0"
          @click="close()"
        />
      </div>

      <div>
        <p class="text-start text-xl font-medium pb-2">Gender</p>
        <div class="text-center flex justify-start items-start gap-6">
          <FormCheckbox :title="'Female'" :label="'Female'" :required="false" />

          <FormCheckbox
            :title="'male'"
            :label="'male'"
            :type="'checkbox'"
            :required="false"
          />
          <FormCheckbox
            :title="'others'"
            :label="'others'"
            :type="'checkbox'"
            :required="false"
          />
        </div>
        <p class="pt-3 text-sm text-darkGrey">
          Select multiple options if needed
        </p>
      </div>

      <div>
        <p class="text-start text-xl font-medium pb-2 text-mediumBlack">
          Interests
        </p>
        <FormMultipleSelect
          v-model="body.interested"
          :title="''"
          :options="interests"
        />
      </div>

      <div>
        <p class="text-start text-xl font-medium pb-2 text-mediumBlack pb-12">
          Age Range
        </p>
        <FormRangeSlider v-model="body.range"/>
      </div>

      <div>
        <p class="text-start text-xl font-medium pb-2 text-mediumBlack">
          Location Preference
        </p>
        <div class="flex justify-between gap-5">
          <input
            type="text"
            class="border border-lightGrey h-8 rounded-md outline-none px-3 grow text-base"
            value="asdf"
          />

          <div class="relative border border-lightGrey h-8 rounded-md px-3 w-48 flex items-center">
            <select
              name="cars"
              id="cars"
              class=" outline-none w-full appearance-none text-sm text-darkGrey"
            >
              <option value="300">Around - 300 meter</option>
              <option value="400">Around - 400 meter</option>
              <option value="500">Around - 500 meter</option>
            </select>
            <img src="../../assets/images/filters/chevron.png" alt="" class="h-2 w-2 absolute top-3 right-4">
          </div>
        </div>
      </div>

      <div
        class="border-t border-lightGrey pt-3 flex justify-between items-center text-mediumBlack"
      >
        <p class="text-center text-lg font-medium">Clear Selection</p>

        <button
          class="bg-primary transition-all duration-200 border border-primary hover:text-black hover:bg-white text-white px-4 p-1 rounded-md"
        >
          Show Results
        </button>
      </div>
    </div>
  </ModalContainer>
</template>
