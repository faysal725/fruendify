import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useFriendsStore = defineStore("friendsStore", {
  //   persist: true,
  state: () => ({
    currentFriendId: null,
    currentFriend : null,
    shouldReload: false,
    settingFromGallary: false,
  }),
  persist: true,
  actions: {
    getCurrentFriend() {
        
      return currentFriend;
    },
    setCurrentFriend(friendData) {
      this.currentFriendId = friendData.user[0]._id
      this.currentFriend = friendData
    },
    setCurrentFriendFromSlider(friendData) {
      // this.currentFriend = friendData
      console.log(friendData.allData)
      const { allData} = friendData
      console.log(allData)
      this.currentFriendId = allData.user[0]._id
      this.currentFriend = allData
    },
    setShouldReload(bool ) {
      this.shouldReload = bool
    },

    setSettingFromGallary(bool){
      this.settingFromGallary = bool
    },
    clearCurrentFriend(){
      this.currentFriendId = null 
      this.currentFriend  = null
      this.shouldReload = false 
    }
  },
});
