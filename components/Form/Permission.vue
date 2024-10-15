<script setup>
import { XMarkIcon, CheckIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: [String, Number],
  allModules: Array,
  title: String,
  error: String,
  oldValue: [String, null],
});

const modules = ref(props.allModules);

const form = ref({
  permissions: [],
});

let errorMsg = ref("");
const previous = "" + props.oldValue;

const emit = defineEmits(["update:modelValue"]);


onMounted(async () => {
    // console.log(props.oldValue)
    if (props.oldValue) {
        props.oldValue.map((val) => {
            form.value.permissions.push(val);
        })
    }
})

// for all select and remove
const allModuleSelect = () => {
  modules.value.map((item) => {
    item.permissions.map((item) => {
      form.value.permissions.push(item.id);
    });
  });
};

const allModuleRemove = () => {
  form.value.permissions = [];
};

const selectall = (module_id) => {
  module_id.permissions.map((item) => {
    form.value.permissions.push(item.id);
  });
};

const removeall = (module_id) => {
  const tempArray = [];
  module_id.permissions.map((item) => {
    tempArray.push(item.id);
  });
  form.value.permissions = form.value.permissions.filter((x) => !tempArray.includes(x));
};



watch(
  () => form.value,
  () => {
    
    emit('update:modelValue', form.value.permissions)
  },
  { deep: true }
);
</script>

<template>
  <div>
    <h1 class="text-gray-500  text-sm">
      <span class="text-red-600">*</span> Select Permissions
    </h1>

    <div class="flex justify-start my-4 gap-4">
      <button
        type="button"
        @click="allModuleRemove"
        class="flex justify-center text-xs bg-red-600/70 hover:bg-red-600 hover:shadow-lg text-white rounded-full px-2 py-1"
      >
        <XMarkIcon class="h-4 w-4 mr-1" />
        <span>Remove</span>
      </button>

      <button
        type="button"
        @click="allModuleSelect"
        class="flex justify-center text-xs bg-violet-600/70 hover:bg-violet-600 hover:shadow-lg text-white rounded-full px-2 py-1"
      >
        <CheckIcon class="h-4 w-4 mr-1" />
        <span>Select</span>
      </button>
    </div>

    <div class="grid grid-cols-12 gap-x-4 gap-y-3">
      <div
        class="p-4 border col-span-3 rounded-md shadow-md"
        v-for="(module, index) in modules"
        :key="index"
      >
        <h1 class="text-sm font-semibold ">
          {{ module.title }}
        </h1>

        <div
          v-for="(permission, index) in module.permissions"
          :key="index"
          class="flex items-center mt-2"
        >
          <input
            :id="'checkbox_' + permission.id"
            v-model="form.permissions"
            :value="permission.id"
            type="checkbox"
            class="mr-2 w-3 h-3 rounded-sm"
          />
          <Label
            :value="permission.title"
            class="!text-gray-500 "
          />
          <span class="text-sm text-slate-600">{{ permission.title }}</span>
        </div>

        <div class="flex mt-6 gap-4">
          <button
            type="button"
            @click="removeall(module)"
            class="flex justify-center text-xs bg-red-600/70 hover:bg-red-600 hover:shadow-lg text-white rounded-full px-2 py-1"
          >
            <XMarkIcon class="h-4 w-4 mr-1" />
            <span>Remove</span>
          </button>

          <button
            type="button"
            @click="selectall(module)"
            class="flex justify-center text-xs bg-violet-600/70 hover:bg-violet-600 hover:shadow-lg text-white rounded-full px-2 py-1"
          >
            <CheckIcon class="h-4 w-4 mr-1" />
            <span>Select</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
