<script setup>
import {
  ArrowLeftIcon,
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  oldValue: Array,
  title: {
    type: String,
    default: "demo",
  },
  imageSrc: {
    type: String,
    default: "#",
  },
  show: {
    type: String,
    default: "title",
  },
  uniqueContainerClass: {
    type: String,
    default: "dropdown-container",
  },
  shouldPanelOpen: {
    type: Boolean,
    default: false,
  },
  error: String,
});

let errorMsg = ref("");
const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref([]);
const showOptionPanel = ref(false);

const searchTerm = ref("");

const includeInterests = (_id, optionData) => {
  console.log("include runn");
  if (selectedValue.value.includes(_id)) {
    selectedValue.value.splice(selectedValue.value.indexOf(_id), 1);
    selectedOptions.value.splice(selectedOptions.value.indexOf(_id), 1);
  } else {
    selectedValue.value.push(_id);
    selectedOptions.value.push(optionData);
  }
};

// filter
const filteredOptions = computed(() =>
  props.options.filter((option) =>
    option.title
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.value.toString().toLowerCase())
  )
);

const selectedOptions = ref([]);

const handleOutsideClick = (event) => {
  if (
    showOptionPanel.value &&
    !event.target.closest("." + props.uniqueContainerClass)
  ) {
    showOptionPanel.value = false;
  }
};

onMounted(() => {
  if (props.oldValue) {
    selectedValue.value = [...props.oldValue];
    // props.options.map((opt) => {
    //   props.oldValue.map((oldVal) => {
    //     if (oldVal == opt._id) {
    //       selectedOptions.value.push(opt);
    //     }
    //   });
    // });
  }
});

onMounted(() => {
  console.log(props.shouldPanelOpen, "asdfasdfasdf");
  if (props.shouldPanelOpen) {
    setTimeout(() => {
      showOptionPanel.value = true;
    }, 1000);
  }
});

onMounted(() => {
  selectedOptions.value = [];
  if (props.oldValue && props.oldValue.length > 0) {
    props.options.map((opt) => {
      props.oldValue?.map((oldVal) => {
        if (oldVal === opt._id) {
          console.log("running", oldVal, opt._id);
          selectedOptions.value.push(opt);
        }
      });
    });
  }
});

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});
onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

watch(
  () => selectedValue.value,
  () => {
    emit("update:modelValue", selectedValue.value);
  },
  { deep: true }
);

watch(
  () => props.oldValue,
  () => {
    selectedValue.value.push(props.oldValue);
  },
  { deep: true }
);

watch(
  () => props.options,
  () => {
    if (props.oldValue.length > 0 && props.options.length > 0) {
      // console.log(props.oldValue, props.options);
      props.options.map((opt) => {
        props.oldValue?.map((oldVal) => {
          if (oldVal == opt._id) {
            // console.log(opt);
            selectedOptions.value.push(opt);
          }
        });
      });
    }
  },
  { deep: true }
);

watch(
  () => props.error,
  () => {
    errorMsg.value = props.error;
  },
  { deep: true }
);

function forMobile(e) {
  // console.log(e.target.value)
  props.options.filter((option) =>
    option.title
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.value.toString().toLowerCase())
  );
}
function onCompositionEnd(event) {
  props.options.filter((option) =>
    option.title
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.value.toString().toLowerCase())
  );
}
</script>
<template>
  <section :class="uniqueContainerClass">
    <div
      @click="showOptionPanel = true"
      class="flex items-center gap-3 pb-2 px-2 cursor-pointer bg-transparent"
      :class="showOptionPanel ? 'border-b border-b-lightGrey' : ''"
    >
      <img :src="imageSrc" alt="" />
      <p class="text-sm text-gray-600 text-nowrap bg-transparent">
        {{ title }}
      </p>

      <!-- <input
        type="text"
        v-model="searchTerm"
        @input="(e) => forMobile(e)"
        class="w-full focus:outline-none cursor-pointer bg-transparent"
        @compositionend="onCompositionEnd"
      /> -->
      <FormKit
        type="text"
        name=""
        v-model="searchTerm"
        :id="uniqueContainerClass"
        label="Name"
      />
      <img src="~~/assets/icons/Chevron.svg" alt="" class="ml-auto h-2 w-2" />
    </div>
    <ul
      class="pt-2 flex justify-start gap-3 flex-wrap overflow-y-scroll scrollbar-hide transition-all duration-200"
    >
      <li
        v-for="option in selectedOptions"
        @click="includeInterests(option._id, option)"
        class="p-1 cursor-pointer flex items-center gap-1 text-xs rounded-md border border-lightGrey bg-blackPrimary text-white"
      >
        {{ option.title }}
        <XMarkIcon class="h-5 w-5 text-white" />
      </li>
    </ul>
    <div class="pt-2">
      <ul
        v-if="filteredOptions.length"
        class="flex justify-start gap-3 flex-wrap overflow-y-scroll scrollbar-hide transition-all duration-200"
        :class="showOptionPanel ? 'max-h-28' : 'max-h-0'"
      >
        <li
          v-for="option in filteredOptions"
          @click="includeInterests(option._id, option)"
          class="p-1 cursor-pointer flex items-center gap-1 text-xs rounded-md border border-lightGrey"
          :class="
            selectedValue.includes(option._id)
              ? 'bg-blackPrimary text-white'
              : 'bg-whiteSecondary '
          "
        >
          {{ option.title }}
          <XMarkIcon
            v-if="selectedValue.includes(option._id)"
            class="h-5 w-5 text-white"
          />
        </li>
      </ul>
      <p
        v-if="!filteredOptions.length && showOptionPanel"
        class="text-xs font-normal text-gray-700 bg-gray-50 rounded-md p-2 mt-1"
      >
        No data found
      </p>
      <div>
        <p class="text-sm text-red-600">{{ errorMsg }}</p>
      </div>
    </div>
  </section>
</template>


<style >
.formkit-outer {
  width: 100%;
}
.formkit-inner {
  border-color: red;
  outline: none;
  width: 100%;
}
.formkit-input{
  width: 100%;
  text-align: start;
  outline: none;
}
.formkit-label{
  display: none;
}
</style>


w-full focus:outline-none cursor-pointer bg-transparent