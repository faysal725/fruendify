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

const enabled = ref(props.oldValue)


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
  <div class="toggle-container">
    <div class="toggle-title">
      <span>{{ title }}</span>
    </div>
    <Switch
      v-model="enabled"
      :class="[
        enabled ? 'toggle-btn-active' : 'toggle-btn-inactive',
        'toggle-btn',
      ]"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
      />
    </Switch>
  </div>
</template>
