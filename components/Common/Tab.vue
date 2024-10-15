<script setup>
import { ref } from "vue";
import { useTabStore } from "~~/stores/tabStore";

const props = defineProps({
  tabData: {
    type: Array,
    default: [],
  },
  pageName: String,
});
const currentTab = ref("");
const emit = defineEmits(["update:modelValue"]);

const route = useRoute();

const currentRoute = ref("");

const { getCurrentTab, setCurrentTab } = useTabStore();

onMounted(() => {
  console.log(getCurrentTab(props.pageName))
  if (getCurrentTab(props.pageName)) {
    tabChanger(
      "el-" + getCurrentTab(props.pageName)["currentTab"],
      props.tabData[getCurrentTab(props.pageName)["currentTab"]].href,
      props.tabData[getCurrentTab(props.pageName)["currentTab"]].key,
      getCurrentTab(props.pageName)["currentTab"]
    );
  } else {
    tabChanger("el-" + 0, props.tabData[0].href, props.tabData[0].key, 0);
  }
});

const isCurrentRoute = (currRoute) => {
  // return route.path.toLowerCase().includes(currentRoute);
  return currentRoute == currRoute;
};

const changeTab = (tab, index) => {
  currentTab.value = tab;

  emit("update:modelValue", tab);
  setCurrentTab(props.pageName, index);
};

const tabChanger = (id, href, key, index) => {
  console.log(id, href, key, index)
  if (currentRoute.value == href) {
    return;
  }
  currentRoute.value = href;
  // document.getElementById(id).children[1].classList.add('animate-[spinner_3s_ease-in-out_infinite]')
  if (currentRoute !== href) {
    document.getElementById(id).children[1].classList.add("translate-x-[200%]");
  }
  changeTab(key, index);
};

// watch(
//   () => route.path.toLowerCase(),
//   () => {
//     console.log('asdfasdf')
//   },
//   { deep: true }
// );
</script>

<template>
  
  <div
    class="flex overflow-x-scroll whitespace-nowrap scrollbar-hide relative pb-2"
    ref="el"
  >
    <!-- animate-[spinner_3s_ease-in-out_infinite] -->
    <!-- animate-[sliding_3s_ease-in-out_infinite] -->
    <!-- animate-[sliding_1s_ease-in-out_infinite] -->

    <div
      v-for="(data, index) in tabData"
      @click="tabChanger('el-' + index, data.href, data.key, index)"
      class="text-sm font-semibold cursor-pointer pb-4 relative z-10 overflow-hidden dark:text-white"
      :id="'el-' + index"
    >
      <p class="px-2">{{ data.value }}</p>
      <span
        :class="
          currentRoute == data.href
            ? 'bg-primary '
            : 'bg-slate-200 -translate-x-full'
        "
        class="absolute bottom-1 w-full h-0.5 z-10 transition-all duration-500"
      ></span>
    </div>

    <span
      class="absolute bottom-3 w-full h-0.5 z-0 transition-all duration-150 bg-slate-200 dark:bg-slate-400"
    ></span>
  </div>
</template>

<!-- <NuxtLink
:to="data.href"
v-for="data in tabData"
@click="changeTab(data.key)"
:class="
  isCurrentRoute(data.href) ? 'border-b border-b-2 border-secondary' : ''
"
class="text-sm font-semibold cursor-pointer pb-2 border-b border-b-2 px-4"
>
{{ data.value }}
</NuxtLink> -->
