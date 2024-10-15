import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useImageStore = defineStore("imageStore", {
  //   persist: true,
  state: () => ({
    isImgLoaded: false,
    profileImageUrl: [],
    imageFiles: [],
  }),
  persist: true,
  actions: {
    getImages() {
      return this.profileImageUrl;
    },
    setImages(url) {
      const data = url.map((dt, index) => {
        return { id: index, imgSrc: dt };
      });
      this.profileImageUrl = [...data];
      this.isImgLoaded = true;
    },
    setImagesFiles(file) {
      this.imageFiles.push({ id: this.imageFiles.length, imgSrc: file });
    },
    removeImages(index) {
      if (this.profileImageUrl.length == 1) {
        this.profileImageUrl.splice(index, 1);
      } else {
        // this.isImgLoaded = false;
        this.profileImageUrl.splice(index, 1);
        // this.profileImageUrl = allImages
      }


    },

    removeFiles(index) {

      this.imageFiles.splice(index, 1);

      let allImages = []
      this.imageFiles.map((dt) => {
        console.log(dt)
        if(dt.imgSrc !== null){
          allImages.push(dt)
        }
      })
      this.imageFiles=[...allImages]
      
    },
    clearImages() {
      this.profileImageUrl = [];
      this.imageFiles = [];
      this.isImgLoaded = false;
    },
    getImageStatus() {
      return this.isImgLoaded;
    },
  },
});
