import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useFilterStore = defineStore("filterStore", {
  //   persist: true,
  state: () => ({
    formData: null,
    callFilterApi: false
  }),
  persist: true,
  actions: {
    setFormData(data) {
      this.formData = data
    },
    setSearchData(key, value) {
      this.formData[key] = value
    },
    getFormData(data) {
      return this.formData;
    },
    setCallFilterApi(bool) {
      this.callFilterApi = bool;
      setTimeout(() => {
        this.callFilterApi = false
      }, 1000);
    },

    clearFormData() {
      this.formData = null
    },
  },
});
