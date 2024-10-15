<script setup>
const router = useRouter()
</script>
<template>
    <div class="flex flex-row justify-start items-center space-x-2 text-xs font-semibold text-gray-700/70">
        <h3>Application</h3>
        <h3 class="">></h3>
        <div 
            v-for="(route, index) in routeLists(router)" 
            class="flex flex-row justify-start items-center space-x-2"
        >
            <h3 
                :key="index" 
                :to="'/'+route" >
                    {{ currentRouteFromLists(router, route) }}
            </h3>
            <h3 v-if="index != routeLists(router).length - 1">></h3>
        </div>
    </div>
</template>