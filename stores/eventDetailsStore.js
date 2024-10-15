import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useEventDetailsStore = defineStore("eventDetailsStore", {
  //   persist: true,
  state: () => ({
    currentId: null,
    currentDetails: null,
    loaderState: null,
    shouldReload: false,
  }),
  persist: true,
  actions: {
    getCurrentEventDetails(id) {
      if (this.currentId == id) {
        return this.currentDetails;
      } else {
        return null;
      }
    },
    setCurrentEventDetails(id, details) {
      this.currentId = id;
      this.currentDetails = details;
    },
    clearEventDetailsData() {
      this.currentId = null;
      this.currentDetails = null;
      this.loaderState = null
      this.shouldReload = false
    },
    setLoaderState(stateName) {
      this.loaderState = stateName;
    },
    getLoaderState() {
      return this.loaderState;
    },
    setShouldReload(bool){
      this.shouldReload = bool
    }
  },
});
