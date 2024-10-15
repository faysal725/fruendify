<script setup>
import { ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { computed, nextTick, ref, watch } from "vue";
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  title: String,
  label: String,
  id: {
    type: [String, Number],
    required: false,
  },
  modelValue: {
    type: [String, Number],
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
  showVal: {
    type: [String, Number, Boolean],
  },
  returnVal: {
    type: [String, Number, Boolean, Array, Object],
    default: "_id",
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
  oldValue: {
    type: [String, Number],
    default: "",
  },
});

const emits = defineEmits(["update:modelValue", "select"]);

// show/hide options
const showOptionPanel = ref(null);

const searchTerm = ref("");
const selectedOption = ref("");

const showRes = ref("");
const showData = ref("");

const searchInput = ref(null);

const toggleOptionPanel = () => {
  showOptionPanel.value = !showOptionPanel.value;
};

const handleOutsideClick = (event) => {
  if (showOptionPanel.value && !event.target.closest(".dropdown-container")) {
    showOptionPanel.value = false;
  }
};

const showDropdown = () => {
  searchInput.value.focus();
  showOptionPanel.value = true;

  // nextTick(() => {
  //   searchInput.value.focus();
  // });
};

const selectOption = (option) => {
  selectedOption.value = option[props.show];
  searchTerm.value = option[props.show];
  emits("update:modelValue", option[props.returnVal]);
  searchTerm.value = "";
  showOptionPanel.value = false;
  emits("select", option);
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

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});


onMounted(() => {
  console.log(props.oldValue)
  if (props.oldValue !== "") {
    console.log(props.options)
    props.options.map((data) => {
      if (data[props.returnVal] == props.oldValue) {
        selectOption(data)
      }
    })
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

watch(
  () => props.showVal,
  (newVal, oldVal) => {
    if (newVal) {
      props.options?.find((option) => {
        if (option.id == props.showVal) {
          showData.value = option.name;
        }
      });
    }
  }
);
</script>

<template>
  <div>
    <label
      :for="label"
      class="block text-gray-700 dark:text-slate-200 text-xs leading-5 font-medium capitalize"
      ><span v-if="required" class="text-red-500 mr-1">*</span
      ><span>{{ title }}</span>
    </label>
    <div class="relative dropdown-container pt-3">
      <input
        @click="showDropdown"
        :value="defaultVal || selectedOption || showData"
        :readonly="true"
        :class="[
          props.disabled
            ? 'bg-transparent  text-gray-700 dark:text-slate-300'
            : 'bg-transparent  text-gray-700 dark:text-slate-300',
          'w-full h-10 flex items-center pl-6 pr-8  border border-gray-300 cursor-pointer placeholder:text-gray-700  focus:ring-1 focus:ring-primary text-xs font-base  focus:outline-none capitalize ',
          classes,
        ]"
        ref="searchInput"
      />
      <XMarkIcon
        @click="selectedOption = ''"
        v-if="selectedOption || showData"
        class="h-6 w-6 p-1 bg-gray-50 rounded-full absolute top-5 right-2 transition-all duration-500 cursor-pointer"
        :class="[showOptionPanel && 'rotate-180', iconClasses]"
      />
      <ChevronDownIcon
        v-else
        class="h-4 w-4 absolute top-6 right-3 transition-all duration-500 cursor-pointer"
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
          <input
            type="text"
            ref="searchInput"
            v-model="searchTerm"
            @input="filterOptions"
            :class="[
              props.disabled
                ? 'bg-[#f9fafa] dark:bg-blackPrimary  text-[#505a62] dark:text-slate-200'
                : 'bg-[#f4f5f6] dark:bg-blackPrimary text-[#1f272e] dark:text-slate-200 ',
              'w-full h-9 pl-3 pr-8 rounded-md border border-gray-300  placeholder:text-gray-300 focus:ring-1 focus:ring-violet-600  text-base font-medium',
            ]"
          />
          <ul
            class="h-auto max-h-28 overflow-x-hidden overflow-y-scroll small-scrollbar scrollbar-hide"
          >
            <template v-if="filteredOptions.length">
              <li
                v-for="(option, index) in filteredOptions"
                @click="selectOption(option)"
                :key="index"
                class="text-xs font-normal text-gray-700 dark:text-slate-300 p-2 cursor-pointer hover:bg-secondary hover:text-white transition-all duration-300 rounded-md break-words whitespace-pre-wrap"
                :class="
                  option[props.show] == selectedOption
                    ? 'bg-secondary text-white'
                    : ''
                "
              >
                {{ option[props.show] }}
              </li>
            </template>
            <template v-else>
              <p
                class="text-xs font-normal text-gray-700 bg-gray-50 rounded-md p-2 mt-1"
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
