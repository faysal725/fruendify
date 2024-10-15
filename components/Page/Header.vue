<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';
import Breadcumb from '../Common/Breadcumb.vue';

const router = useRouter()
</script>

<template>
    <header>
        <div class="flex flex-col pb-3">
            <div class="flex flex-row justify-between items-end space-x-4">
                <div class="flex flex-row justify-start space-x-6 w-full items-end">
                    <div class="flex flex-col">
                        <h3 class="font-bold text-md text-primary capitalize">{{ currentRoute(router) }}</h3>
                        <Breadcumb />
                    </div>
                    <input
                        v-if="!isNestedRoute(router)"
                        ref="input"
                        class="w-1/4 py-1 px-2 w-1/2 block bg-violet-50 text-xs text-gray-700 border border-gray-300 rounded-md focus:outline-none bg-violet-50"
                        autocomplete="username"
                        placeholder="search"
                    >
                </div>
                <div v-if="!isNestedRoute(router)" class="flex flex-row justify-start space-x-2">
                    <ButtonPrimary :name="'Add'" :link="currentRoute(router).toLowerCase()+'/'+'create'">
                        <PlusIcon class="h-4 w-4 text-white stroke-2" />
                    </ButtonPrimary>
                    <!-- <ButtonPrimary :name="'Add'" :link="currentRoute.name+'/'+'create'">
                        <PlusIcon class="h-4 w-4 text-white stroke-2" />
                    </ButtonPrimary> -->
                </div>
            </div>
        </div>
    </header>
</template>