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
    required: false,
  },
  title: String,
  oldVal: {
    type: [Object, String],
    default: [],
  },
  id: {
    type: [String, Number],
    required: false,
  },
  modelValue: {
    type: [Array, String], // Change type to Array for multiple selection
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
  classes: {
    type: String,
    default: "rounded-full",
  },
  iconClasses: {
    type: String,
    default: "text-gray-700",
  },
  label: {
    type: String,
    default: "somelabel",
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
  if (props.oldVal && props.options) {
    props.oldVal.map((val) => {
      props.options.map((data) => {
        if (val == data[props.returnVal]) {
          selectOption(data);
        }
      });
    });
  }
});

const showDropdown = () => {
  if (showOptionPanel.value) {
    showOptionPanel.value = false;
  } else {
    showOptionPanel.value = true;
  }

  nextTick(() => {
    searchInput.value.focus();
  });
};

const hideDropdown = () => {
  showOptionPanel.value = false;

  selectedOptions.value = [];
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

watch(
  () => props.options,
  () => {
    // console.log('asdfsdfsdf', 'multiseclted')
    if (props.oldVal && props.options) {
      props.oldVal.map((val) => {
        props.options.map((data) => {
          if (val == data[props.returnVal]) {
            selectOption(data);
          }
        });
      });
    }
  }
);
</script>

<template>
  <div>
    <label
      :for="label"
      class="block text-mediumBlack text-sm leading-5 font-medium capitalize"
    >
      <p class="text-start text-xs font-medium pb-2">{{ title }}</p>
    </label>
    <div class="relative dropdown-container">
      <ul
        @click="showDropdown"
        class="w-full h-auto min-h-10 max-h-20 overflow-y-scroll scrollbar-hide flex flex-wrap gap-2 rounded-lg border border-slate-300 p-2"
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
          'w-full h-8 flex items-center pl-3 pr-8  border border-slate-300 cursor-pointer placeholder:text-gray-700  focus:ring-1 focus:ring-primary text-sm font-medium  focus:outline-none capitalize',
          classes,
        ]"
      />
      <XMarkIcon
        @click="hideDropdown()"
        v-if="selectedOptions.length"
        class="h-6 w-6 p-1 bg-gray-50 rounded-full absolute top-2 right-2 transition-all duration-500 cursor-pointer"
        :class="[showOptionPanel && 'rotate-180', iconClasses]"
      />
      <ChevronDownIcon
        v-else
        class="h-4 w-4 absolute top-3 right-3 transition-all duration-500 cursor-pointer"
        :class="[showOptionPanel && 'rotate-180', iconClasses]"
      />
      <transition
        mode="out-in"
        enter-active-class="transition-all duration-300 ease-in"
        enter-from-class="transform translate-y-5 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition-all duration-300 ease-out"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-5 opacity-0"
      >
        <div
          v-if="showOptionPanel"
          class="absolute left-0 right-0 top-[100%] bg-white dark:bg-blackPrimary border border-gray-300 rounded-lg shadow-md p-1 space-y-1 z-10"
        >
          <!-- <FormKit
        type="text"
        name=""
        v-model="searchTerm"
        :id="uniqueContainerClass"
        label="Name"
      /> -->
          <!-- <input
            type="text"
            ref="searchInput"
            v-model="searchTerm"
            @input="filterOptions"
            :class="[
              props.disabled
                ? 'bg-[#f9fafa]  dark:bg-blackPrimary  text-[#505a62] dark:text-slate-200 '
                : 'bg-[#f4f5f6]   dark:bg-blackPrimary text-[#1f272e] dark:text-slate-200 ',
              'w-full h-9 pl-3 pr-8 rounded-md border-1 border border-gray-300  placeholder:text-gray-300 focus:ring-1 focus:ring-violet-600  text-base font-medium',
            ]"
          /> -->

          <FormKit
            type="text"
            ref="searchInput"
            v-model="searchTerm"
            @input="filterOptions"
            :classes="{
              inner:'$reset px-2',
              input:'$reset w-full h-9 pl-3 pr-8 rounded-md border-1 border border-gray-300  placeholder:text-gray-300 focus:ring-1 focus:ring-violet-600  text-base font-thin',
            }"
          />

          <ul
            class="h-auto max-h-52 overflow-x-hidden overflow-y-auto scrollbar-style "
          >
            <template v-if="filteredOptions.length">
              <li
                v-for="(option, index) in filteredOptions"
                @click="selectOption(option)"
                :key="index"
                :class="{
                  'bg-secondary text-slate-300':
                    selectedOptions.findIndex(
                      (opt) => opt[props.returnVal] === option[props.returnVal]
                    ) !== -1,
                }"
                class="text-sm font-normal text-gray-700 dark:text-slate-300 p-2 my-1 cursor-pointer hover:bg-secondary hover:text-white transition-all duration-300 rounded-md break-words whitespace-pre-wrap"
              >
                {{ option[props.show] }}
              </li>
            </template>
            <template v-else>
              <p
                class="text-sm font-normal text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-blackPrimary rounded-md p-2 mt-1"
              >
                No data found
              </p>
            </template>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* .formkit-outer {
  width: 100%;
}
.formkit-inner {
  border-color: red;
  outline: goldenrod;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}
.formkit-input{
  width: 100%;
  text-align: start;
  outline: none;
}
.formkit-label{
  display: none;
} */
</style>
