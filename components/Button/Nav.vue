<script setup>
import {
  CalendarIcon,
  ChartBarIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  PowerIcon,
} from "@heroicons/vue/24/outline";


const props = defineProps({
  routes: Object,
});

const router = useRoute();
</script>

<template>
  <div>
    <nav class="border border-lightGrey  rounded-lg divide-y-2">
      <div v-for="route in routes" class=" p-2 px-5 rounded-t-md cursor-pointer">
        <p class="font-semibold " :class="router.fullPath == route.href ? 'text-primary': 'text-mediumBlack'"
        >{{ route.name }}</p>
      </div>
    </nav>
  </div>
</template>
