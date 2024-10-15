import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useStepStore = defineStore("stepStore", {
  //   persist: true,
  state: () => ({
    allPages : [
         {pageName: "registration" , currentStep: 0},
         {pageName: "login" , currentStep: 0},
         {pageName: "event" , currentStep: 0},
    ]
  }),
  persist: true,
  actions: {
    getCurrentStep(name) {
        console.log(this.allPages, name , this)
        let selected
        this.allPages.map((page, index) => {
            if (page.pageName == name) {
                selected = page
            }
        })
      return selected;
    },
    setCurrentStep(name, tabNo) {
      console.log(name, tabNo)
        let newData = []
        this.allPages.map((page, index) => {
            if (page.pageName == name) {
                page['currentStep'] = tabNo
            }
            newData.push(page)
        })
        this.allPages = newData
    },
    clearStep() {

        this.currentStep = null;
      },
  },
});
