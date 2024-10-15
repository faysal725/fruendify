import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useTimerStore = defineStore("timerStore", {
  //   persist: true,
  state: () => ({
    timerShouldStart: false
  }),
  persist: true,
  actions: {
    setTimerState(bool) {
        this.timerShouldStart = bool
    },
  },
});
