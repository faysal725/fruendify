<script setup>
import { ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import {
  computed,
  nextTick,
  ref,
  watch,
  defineProps,
  defineEmits,
  onMounted,
  onUnmounted,
} from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  title: String,
  oldVal: {
    type: Object,
    default: [],
  },
  id: {
    type: [String, Number],
    required: false,
  },
  modelValue: {
    type: Array, // Change type to Array for multiple selection
    default: () => [], // Default value as empty array for multiple selection
  },
  placeholder: {
    type: String,
    default: "Enter your ...",
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  show: {
    type: String,
    default: "name",
  },
  returnVal: {
    type: [String, Number, Boolean, Array, Object],
    default: "id",
  },
  defaultVal: {
    type: [String, Number, Boolean, Array, Object],
  },
  select: {
    type: [String, Number, Boolean, Array, Object],
  },
});

const emits = defineEmits(["update:modelValue", "select"]);

const showOptionPanel = ref(false);
const searchTerm = ref("");
const selectedOptions = ref([]);

const searchInput = ref(null);

const toggleOptionPanel = () => {
  showOptionPanel.value = !showOptionPanel.value;
};

const handleOutsideClick = (event) => {
  if (showOptionPanel.value && !event.target.closest(".dropdown-container")) {
    showOptionPanel.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

onMounted(() => {
  if (props.oldVal) {
    props.oldVal.map((val) => {
      selectOption(val);
    });
  }
});

const showDropdown = () => {
  showOptionPanel.value = true;

  nextTick(() => {
    searchInput.value.focus();
  });
};

const selectOption = (option) => {
  const index = selectedOptions.value.findIndex(
    (opt) => opt[props.returnVal] === option[props.returnVal]
  );
  if (index === -1) {
    selectedOptions.value.push(option);
  } else {
    selectedOptions.value.splice(index, 1);
  }
  emits(
    "update:modelValue",
    selectedOptions.value.map((opt) => opt[props.returnVal])
  );
};

const filteredOptions = computed(() =>
  props.options.filter((option) =>
    option[props.show]
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.value.toString().toLowerCase())
  )
);

const filterOptions = () => {
  showOptionPanel.value = true;
};
</script>

<template>
  <div>
    <label
      :for="label"
      class="block text-gray-700 text-xs leading-5 font-medium capitalize"
      ><span v-if="required" class="text-red-500 mr-1">*</span
      ><span>{{ title }}</span>
    </label>
    <div class="relative dropdown-container">
      <ul
        @click="showDropdown"
        class="w-full h-auto min-h-8 flex flex-wrap gap-2 rounded-md border border-slate-300 p-2"
      >
        <li
          v-for="selected in selectedOptions"
          class="text-xs bg-mediumBlack w-fit rounded-md text-white flex items-center justify-center px-2"
        >
          <p class="p-1">{{ selected[props.show] }}</p>
          <XMarkIcon
            @click="selectOption(selected)"
            class="h-4 w-4 text-white"
          />
        </li>
      </ul>
      <input
        v-show="false"
        @click="showDropdown"
        :value="
          selectedOptions.length
            ? selectedOptions.map((opt) => opt[props.show]).join(', ')
            : defaultVal || ''
        "
        :readonly="true"
        :class="[
          props.disabled
            ? 'bg-white  text-gray-700 '
            : 'bg-white  text-gray-700 ',
          'w-full h-8 flex items-center pl-3 pr-8 rounded-md border border-slate-300 cursor-pointer placeholder:text-gray-700  focus:ring-1 focus:ring-violet-600 text-sm font-medium focus:border-0 focus:outline-none capitalize',
        ]"
      />
      <!-- <XMarkIcon
        @click="selectedOptions = []"
        v-if="selectedOptions.length"
        class="h-6 w-6 p-1 bg-gray-50 rounded-full absolute top-1 right-2 text-gray-700 transition-all duration-500 cursor-pointer"
        :class="showOptionPanel && 'rotate-180'"
      />
      <ChevronDownIcon
        v-else
        class="h-4 w-4 absolute top-2 right-3 text-gray-500 transition-all duration-500 cursor-pointer"
        :class="showOptionPanel && 'rotate-180'"
      /> -->
      <ul
        class="h-auto max-h-80 overflow-x-hidden overflow-y-auto small-scrollbar pt-5"
      >
        <div
          v-if="filteredOptions.length"
          class="flex justify-start flex-wrap gap-x-3"
        >
          <li
            v-for="(option, index) in filteredOptions"
            @click="selectOption(option)"
            :key="index"
            :class="{
              'bg-secondary text-white':
                selectedOptions.findIndex(
                  (opt) => opt[props.returnVal] === option[props.returnVal]
                ) !== -1,
            }"
            class="text-xs font-normal text-gray-700 p-2 my-1 cursor-pointer bg-gray-200 transition-all duration-300 rounded-md break-words whitespace-pre-wrap"
          >
            {{ option[props.show] }}
          </li>
        </div>
        <div v-else>
          <p
            class="text-sm font-normal text-gray-700 bg-gray-50 rounded-md p-2 mt-1"
          >
            No data found
          </p>
        </div>
      </ul>
    </div>
  </div>
</template>
