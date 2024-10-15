<script setup>
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  lastPage: Number,
  firstPage: Number,
  perPage: Number,
  presentPage: Number,
  presentRoute: String,
});

const totalPage = ref([]);

onMounted(() => {
  // console.log(presentPage, )
  if (props.lastPage <= 4) {
    for (let i = 1; i <= props.lastPage; i++) {
      // const element = array[i];
      totalPage.value.push(i);
    }
  } else {
    if (parseInt(props.presentPage) >= 2) {
      totalPage.value.push(parseInt(props.presentPage) - 1);
      totalPage.value.push(parseInt(props.presentPage));
      totalPage.value.push(parseInt(props.presentPage) + 1);
    } else {
      totalPage.value.push(parseInt(props.presentPage));
      totalPage.value.push(parseInt(props.presentPage) + 1);
      totalPage.value.push(parseInt(props.presentPage) + 2);
    }
  }
});
</script>

<template>
  <div
    class="flex items-center justify-between bg-transparent px-4 py-5 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Previous</a
      >
      <a
        href="#"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Next</a
      >
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center justify-center">
      <div class="flex justify-center w-full">
        <nav
          class="isolate inline-flex space-x-0.5 rounded-md  "
          aria-label="Pagination"
        >
          <div
            class="relative inline-flex items-center rounded-l-md px-4 py-1  text-gray-600 dark:text-slate-200 text-sm  focus:z-20 focus:outline-offset-0 group gap-2 bg-whitePrimary dark:bg-blackPrimary w-fit dark:border-slate-200 dark:border"
          >
            <ArrowLeftIcon class="h-4 w-4 text-gray-600 dark:text-slate-200" />
            <span>Previous</span>
          </div>

          <div class="flex gap-3 px-10">
            <li v-for="page in totalPage" class="list-none divide-x active">
            <NuxtLink
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg focus:z-20 focus:outline-offset-0"
              :class="
                presentPage == page
                  ? 'bg-slate-900 dark:bg-slate-300 text-white dark:bg-slate-700'
                  : 'bg-transparent text-mediumBlack  dark:text-slate-200'
              "
              :to="presentRoute + '/page/' + page"
              aria-current="page"
              >{{ page }}</NuxtLink
            >
          </li>
          </div>

          <div
            class="relative inline-flex items-center rounded-r-md px-4 py-1 text-gray-600 dark:text-slate-200 text-sm  focus:z-20 focus:outline-offset-0 group gap-2 bg-whitePrimary dark:bg-blackPrimary w-fit mr-5 dark:border-slate-200 dark:border"
          >
            <span>Next</span>
            <ArrowRightIcon class="h-4 w-4 text-gray-600 dark:text-slate-200" />
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
