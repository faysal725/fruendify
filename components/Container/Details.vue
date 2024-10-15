<script setup>
const props = defineProps({
  title: String,
  data: Object,
});
</script>

<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-sm font-semibold leading-6 text-violet-800">
        {{ props.title }}
      </h3>
    </div>
    <div class="space-y-1">
      <dl v-for="item in props.data" :key="item.key">
        <div
          v-if="item.type == 'text'"
          class="border-b border-b-slate-300 bg-violet-600/10 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-xs font-medium text-violet-900  capitalize">
            {{ item.key }}
          </dt>
          <dd class="mt-1 text-xs text-black font-medium sm:col-span-2 sm:mt-0">
            {{ item.value }}
          </dd>
        </div>
        <div
          v-if="item.type == 'image'"
          class="border-b border-b-slate-700 bg-violet-600/10 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-xs font-medium text-violet-900 capitalize">
            {{ item.key }}
          </dt>
          <dd class="mt-1 text-xs text-black font-medium sm:col-span-2 sm:mt-0">
            <img
              :src="networkImage(item.value)"
              class="w-20 h-20 flex-shrink-0 object-fit"
            />
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
