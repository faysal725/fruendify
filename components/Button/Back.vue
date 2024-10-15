<script setup>


import { MapPinIcon, ArrowLeftIcon } from "@heroicons/vue/24/solid";

const router = useRouter()

</script>

<template>
    <button @click="router.back()">
        <ArrowLeftIcon
              class="h-6 w-6 text-mediumBlack dark:text-slate-200"
            />
    </button>
</template>
