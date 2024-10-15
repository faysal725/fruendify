<script setup>
import { useCategoryStore } from "~~/stores/categoryStore";
import { useFilterStore } from "~~/stores/filterStore ";
import { ArrowPathIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  eventData: {
    type: Array,
    default: [],
  },
});

// store
const filterStore = useFilterStore();
const { setFormData, getFormData, clearFormData, setCallFilterApi } =
  filterStore;

const categoryStore = useCategoryStore();
const {
  getSelectedCategories,
  SetSelectedCategories,
  clearSelectedCategories,
} = categoryStore;

const emit = defineEmits(["update:modelValue"]);
const selectedOptions = ref([]);

const selectOption = (option) => {
  if (!props.disable) {
    // if (selectedOptions.value.includes(option._id)) {
    //   let index = selectedOptions.value.indexOf(option._id);
    //   selectedOptions.value.splice(index, 1);
    // } else {
    //   selectedOptions.value.push(option._id);
    // }
    selectedOptions.value = option._id;
    SetSelectedCategories(selectedOptions.value);
    // emit("update:modelValue", selectedOptions.value);
  }
};

// watch(
//   () => filterStore.formData,
//   () => {
//     if (filterStore.formData.categories.length == 0) {
//       selectedOptions.value = []
//     }
//   }
// );

onMounted(() => {
  if (categoryStore.selectedCategories) {
    selectedOptions.value = categoryStore.selectedCategories;
  }
});

watch(
  () => categoryStore.selectedCategories,
  () => {
    console.log(categoryStore.selectedCategories);
    if (categoryStore.selectedCategories == null) {
      selectedOptions.value = [];
    }
  }
);
</script>
<template>
  <div class="w-full flex justify-center items-center">
    <ContainerHorizontal>
      <div v-if="eventData.length > 0" class="w-32" @click="clearSelectedCategories">
        <div
          class="rounded-md overflow-hidden cursor-pointer transition-all duration-200 flex justify-center"
          :class="
            selectedOptions.length == 0
              ? ' bg-[#FBFBFB] dark:bg-blackPrimary dark:border'
              : 'bg-transparent '
          "
        >
          <div
            class="w-16 h-16 items-center justify-center flex flex-col items-center overflow-hidden"
          >
            <div
              class="h-8 md:h-10 w-8 md:w-10 p-1 flex justify-center items-center"
            >
              <!-- <img
                class="w-full h-full flex-shrink-0"
                :src="data.image"
                alt=""
              /> -->
              <ArrowPathIcon class="h-6 w-6 text-black dark:text-slate-200" />
            </div>
            <p
              class="text-mediumBlack dark:text-slate-200 text-xs font-semibold sm:py-0 capitalize"
            >
              All
            </p>
          </div>
        </div>
      </div>
      <div v-for="data in eventData" class="w-32">
        <div
          class="rounded-md overflow-hidden cursor-pointer transition-all duration-200 flex justify-center"
          :class="
            selectedOptions.includes(data._id)
              ? ' bg-[#FBFBFB] dark:bg-blackPrimary dark:border'
              : 'bg-transparent '
          "
          @click="selectOption(data)"
        >
          <div
            class="w-16 h-16 items-center justify-center flex flex-col items-center overflow-hidden"
          >
            <div class="h-8 md:h-10 w-8 md:w-10 p-1">
              <img
                class="w-full h-full flex-shrink-0"
                :src="data.image"
                alt=""
              />
            </div>
            <p
              class="text-mediumBlack dark:text-slate-200 text-xs font-semibold sm:py-0 capitalize"
            >
              {{ data.title }}
            </p>
          </div>
        </div>
      </div>
    </ContainerHorizontal>
  </div>
</template>
