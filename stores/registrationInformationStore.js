import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useRegistrationInformationStore = defineStore("registrationInformationStore", {
  //   persist: true,
  state: () => ({
    email: null,
    password: null,
    confirm_password: null,
    otp: null,
    aboutFrundify: null,
    age: null,
    full_name: null,
    date: null,
    month: null,
    year: null,
    files: null,
  }),
  persist: true,
  actions: {
    getCurrentEventDetails(id) {

      
    },
    setCurrentEventDetails(id, details) {

    },
    clearEventDetailsData() {

      },
  },
});
