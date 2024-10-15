<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  EllipsisVerticalIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/vue/20/solid";

const props = defineProps({
  isHorizontal: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: [
      { key: 0, value: "Account settings" },
      { key: 1, value: "Support" },
      { key: 2, value: "License" },
      { key: 3, value: "Sign out" },
    ],
  },
  classes: {
    type: String,
    default:
      "text-gray-400 border border-slate-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-100 p-3 bg-gray-100 dark:bg-blackPrimary",
  },

  alignment: {
    type: String,
    default: "right-0",
  },
});

const emit = defineEmits(["selectedOption"]);
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="flex items-center rounded-lg" :class="classes">
        <span class="sr-only">Open options</span>
        <EllipsisHorizontalIcon
          v-if="isHorizontal"
          class="h-5 w-5"
          aria-hidden="true"
        />
        <EllipsisVerticalIcon v-else class="h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-blackPrimary shadow-lg ring-1 ring-black dark:ring-slate-400 ring-opacity-5 focus:outline-none"
        :class="alignment"
      >
        <div class="py-1">
          <MenuItem
            v-slot="{ active }"
            v-for="option in options"
            @click="emit('selectedOption', option.value)"
          >
            <a
              href="#"
              :class="[
                active
                  ? 'bg-gray-100 text-gray-900 dark:text-gray-900'
                  : 'text-gray-700 ',
                'block px-4 py-2 text-sm dark:text-slate-200 hover:dark:text-slate-900',
              ]"
              >{{ option.value }}</a
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
