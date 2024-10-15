<script setup>
import { ref } from "vue";
import { Switch } from "@headlessui/vue";


const props = defineProps({
  title:{
    type: String,
    default: "Status"
  },
  data: Number,
  oldValue: Boolean,
})


const enabled = ref(props.oldValue);

const emit = defineEmits(['updateInput'])

watch(
	() => enabled.value,
	() => {
    emit('updateInput', enabled.value)

	},
	{deep: true}
)

</script>

<template>
  <Switch
    v-model="enabled"
    :class="[
      enabled ? 'bg-slate-400' : 'bg-gray-200',
      'relative inline-flex  w-20 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2',
    ]"
  >
    <span class="sr-only">Use setting</span>
    <span v-if="!enabled" class="absolute top-2 right-1 font-medium text-xs">Blur</span>
    <span v-else class="absolute top-2 left-1 font-medium text-xs">Unblur</span>
    <span
      aria-hidden="true"
      :class="[
        enabled ? 'translate-x-11' : 'translate-x-0',
        'pointer-events-none inline-block h-8 w-8 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out',
      ]"
    />
  </Switch>
</template>
