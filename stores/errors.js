import { defineStore } from "pinia";

export const useErrorsStore = defineStore("errorsStore", {
   state: () => ({
      message: []
   }),
   actions: {
      set(message) {
        this.message = message
      },
      get() {
        return this.message
      }
    },
});