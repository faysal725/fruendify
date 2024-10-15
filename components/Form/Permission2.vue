<script setup>
import { XCircleIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: [String, Number],
  oldValue: [Object, null],
});
const allCategories = ref([]);

const form = ref([]);

const emit = defineEmits(["update:modelValue"]);

onMounted(async () => {
  // console.log(props.oldValue)
  if (props.oldValue.length > 0) {
    props.oldValue.map((val) => {
      allCategories.value.push(val);
      form.value.push({
        title: val.title,
        slug: val.slug,
      });
    });
  } else {
    let newItem = {
      title: "",
      slug: "",
    };
    form.value.push(newItem);
    allCategories.value.push(newItem);
  }
});



const increment = () => {
  let newItem = {
    title: "",
    slug: "",
  };
  form.value.push(newItem);
  allCategories.value.push(newItem);
};

const decrement = (index) => {
  if (allCategories.value.length > 1) {
    form.value.splice(index, 1);
    allCategories.value.splice(index, 1);
  }
};

watch(
  () => form.value,
  () => {
    emit('update:modelValue', form.value)
  },
  { deep: true }
);


</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 border rounded-md p-4">
      <label
        class="block text-gray-700  text-xs leading-5 font-medium"
        ><!----><span>Permissions</span>
      </label>

      <div
        v-for="(category, index) in allCategories"
        class="mt-1 flex items-center rounded-md gap-1"
      >
        <input
          class="h-8 w-full p-2 block bg-white  text-sm text-gray-700  border border-gray-300 rounded-md focus:outline-none"
          type="text"
          placeholder="Title "
          v-model="form[index].title"
        />
        <input
          class="h-8 w-full p-2 block bg-white  text-sm text-gray-700  border border-gray-300 rounded-md focus:outline-none"
          type="text"
          placeholder="Slug"
          v-model="form[index].slug"
        />
        <div class="flex">
          <XCircleIcon @click="decrement(index)" class="h-6 w-6 text-red-600" />
          <PlusCircleIcon @click="increment" class="h-6 w-6 text-violet-600" />
        </div>
      </div>
    </div>
  </div>
</template>
