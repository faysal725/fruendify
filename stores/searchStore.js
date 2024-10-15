import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useSearchStore = defineStore("searchStore", {
  //   persist: true,
  state: () => ({
    searchData: ""
  }),
  persist: true,
  actions: {
    setSearchData(data) {
      this.searchData = data
    },
    getSearchData() {
      return this.searchData;
    },

    clearSearchData() {
      this.searchData = ""
    },
  },
});
