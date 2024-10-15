import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useTabStore = defineStore("tabStore", {
  //   persist: true,
  state: () => ({
    allTabs : [
         {pageName: "events" , currentTab: 0},
         {pageName: "friends" , currentTab: 0},
         {pageName: "profileEvent" , currentTab: 0},
         {pageName: "profile" , currentTab: 0},
    ]
  }),
  persist: true,
  actions: {
    getCurrentTab(name) {
        let selected
        this.allTabs.map((tab, index) => {
            if (tab.pageName == name) {
                selected = tab
            }
        })
      return selected;
    },
    setCurrentTab(name, tabNo) {
        let newData = []
        this.allTabs.map((tab, index) => {
            if (tab.pageName == name) {
                tab['currentTab'] = tabNo
            }
            newData.push(tab)
        })
        this.allTabs = newData
    },
    clearTab() {

        this.currentTab = null;
      },
  },
});
