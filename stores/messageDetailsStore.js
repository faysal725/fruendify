import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useMessageDetailsStore = defineStore("messageDetailsStore", {
  //   persist: true,
  state: () => ({
    currentGroupId: null,
    currentGroupDetails: null,
    currentMessageDetails: null,
    loaderState: null,
    shouldReload: false,
  }),
  persist: true,
  actions: {
    getCurrentMessageDetails(id) {
      if (this.currentGroupId == id) {
        return this.currentMessageDetails;
      } else {
        return null;
      }
    },
    setCurrentGroupDetails(id, details) {
      console.log(details);
      this.currentGroupDetails = details;
      this.currentGroupId = id;
    },
    setCurrentMessageDetails(id, details) {
      this.currentGroupId = id;
      this.currentMessageDetails = details;
    },
    clearMessageDetailsData() {
      this.currentGroupId = null;
      this.currentMessageDetails = null;
      this.currentGroupDetails = null;
      this.loaderState = null;
    },
    setLoaderState(stateName) {
      this.loaderState = stateName;
    },
    getLoaderState() {
      return this.loaderState;
    },
    setShouldReload(bool) {
      this.shouldReload = bool;
    },
  },
});
