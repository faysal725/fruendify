import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useNexteventStore = defineStore("nexteventStore", {
  //   persist: true,
  state: () => ({
    nextId: null,
    nextDetails: null,
    nextLoaderState: null,
    nextShouldReload: false,
  }),
  persist: true,
  actions: {
    getNextEventDetails(id) {
      if (this.nextId == id) {
        return this.nextDetails;
      } else {
        return null;
      }
    },
    setNextEventDetails(details) {
      this.nextDetails = details;
      this.nextId = details.data[0]._id
    },
    clearEventDetailsData() {
      this.nextId = null;
      this.nextDetails = null;
      this.nextLoaderState = null
      this.nextShouldReload = false
    },
    setnextLoaderState(stateName) {
      this.nextLoaderState = stateName;
    },
    getnextLoaderState() {
      return this.nextLoaderState;
    },
    setNextShouldReload(bool){
      this.nextShouldReload = bool
    }
  },
});
