<script setup>
import {
  EllipsisHorizontalIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  profiles: {
    type: Array,
    default: [],
  },
  classes: {
    type: String,
    default: "h-14 w-14 object-cover",
  },
});
</script>

<template>
  <div class="flex" v-if="profiles.length > 0">
    <div
      v-for="(data, index) in profiles"
      class="rounded-full overflow-hidden object-cover border border-2 border-white"
      :class="index !== 0 ? '-ml-5' : ''"
    >
      <img
        :src="networkImage(data?.user_uid?.profile_image)"
        alt=""
        :class="classes"
      />
    </div>
  </div>
  <div class="flex" v-else>
    <UserCircleIcon class="h-16 w-16 text-slate-300" />
  </div>
</template>
