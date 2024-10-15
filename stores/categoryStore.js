import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useCategoryStore = defineStore("categoryStore", {
  //   persist: true,
  state: () => ({
    selectedCategories: null,
  }),
  persist: true,
  actions: {
    getSelectedCategories() {
      return selectedCategories;
    },
    SetSelectedCategories(categoryId) {
        // console.log(categoryId)
      this.selectedCategories = categoryId
    },

    clearSelectedCategories() {
      this.selectedCategories = null
    },
  },
});
