import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useVarifyStore = defineStore("varifyStore", {
  //   persist: true,
  state: () => ({
    isVarified: false,
  }),
  persist: true,
  actions: {
    getStatus() {
      return this.isVarified;
    },
    setStatus(bool) {

      this.isVarified = bool;
    },
  },
});
