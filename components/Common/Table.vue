<script setup>
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  data: Array,
  last_page: Number,
  first_page: Number,
  per_page: Number,
  present_page: Number,
  present_route: String,
  allSelected: Array,
  isEmpty: {
    default: true,
    type: Boolean,
  },
});

let arrangeOrder = ref(false);
// let allHeaders = Object.keys(props.data[0])
const isChecked = ref(false);

const emit = defineEmits(["checkboxChanged"]);

const handleCheckboxChange = (event) => {
  isChecked.value = event.target.checked;
  emit("checkboxChanged", isChecked.value);
};

function updateValue(value, index) {
  if (value.sortable) {
    // arrangeOrder.value = !arrangeOrder.value
    let newVal = { field: value.field, arrange: value.arrange, index: index };
    emit("updateInput", newVal);
  }
}

watch(
  () => props.allSelected,
  () => {
    Object.values(props.allSelected).map((val) => {
      if (isChecked.value !== val) {
        isChecked.value = false;
      }
    });
  },
  { deep: true }
);
</script>

<template>
  <div class="mt-1 flow-root">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div class="overflow-x-auto border border-violet-600/70 rounded-md">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-violet-600/70">
              <tr>
                <th
                  class="flex items-center justify-center pl-4 py-3 text-left text-xs font-medium text-white uppercase"
                >
                  <input
                    id="unique"
                    v-model="isChecked"
                    @change="handleCheckboxChange"
                    type="checkbox"
                    class="mr-2 h-3 w-3"
                  />
                </th>
                <th
                  class="border-r px-4 py-3 text-xs font-medium text-white uppercase text-center"
                >
                  SL
                </th>

                <th
                  v-for="(data, index) in props.data"
                  :key="index"
                  class="border-r px-4 py-3 text-left text-xs font-medium text-white uppercase"
                >
                  <div
                    class="flex justify-center items-center"
                    @click="updateValue(data, index)"
                  >
                    <span>{{ data.title }}</span>
                  </div>
                </th>

                <th
                  class="px-4 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                >
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            
            <tbody class="bg-white divide-y divide-gray-200">
              <slot v-if="!isEmpty" />

              <tr v-else class="text-center py-8">
                <ContainerAnimationPulse :customClass="''" :colNo="props.data.length+3" />
              </tr>
            </tbody>
          </table>

          <Paginator
            v-if="last_page > 1"
            :lastPage="last_page"
            :firstPage="first_page"
            :perPage="per_page"
            :presentPage="present_page"
            :presentRoute="present_route"
          />
        </div>
      </div>
    </div>
  </div>
</template>
