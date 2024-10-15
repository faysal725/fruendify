import { defineStore } from "pinia";
// import { useCrud } from "~~/composables/base";

// const crud = useCrud();
// const profileUpdateApi = api() + "/api/auth/update/profile";

export const useProfileStore = defineStore("profileStore", {
  state: () => ({
    coordinateCollected: false,
    latitude: null,
    longitude: null,
    timezone: null,
    shouldReload: false,
    loaderState: null,
    profileData: null,
    images: null,
  }),
  persist: {
    storage: localStorage, // Specify that you want to use localStorage
    paths: ['profileData']  // Specify which parts of the state you want to persist
  },
  actions: {
    saveImages(images) {
      this.userData.images = [...images];
      this.userData.profile_image = images[0];
      // this.userData.interests = [...interests];
      // this.stepNo = 9;
    },
    saveProfileData(credentials) {
      console.log(credentials);
      this.profileData = credentials;
    },

    // updateProfileData(formData) {
    //   console.log(formData);
    //   // await crud
    //   // .store({
    //   //   body: data,
    //   //   path: submitUserApi,
    //   // })
    //   // .then((res) => {
    //   //   if (res.status == 422) {
    //   //     // errors.value.title = res.message.errors.title
    //   //     //   ? errorFilter(res.message.errors.title)
    //   //     //   : "";
    //   //     console.log(res);
    //   //   }
    //   //   if (res.status == 200) {
    //   //     setStep(1);
    //   //     close();
    //   //     showToast("Registration successful");
    //   //     openLogin();
    //   //   }
    //   // });
    // },

    setLoaderState(stateName) {
      this.loaderState = stateName;
    },
    getLoaderState() {
      return this.loaderState;
    },
    getProfileData() {
      return this.profileData;
    },
    setShouldReload(bool) {
      return (this.shouldReload = bool);
    },
    clearProfileData() {
      this.loaderState = null;
      this.profileData = null;
      this.images = null;
    },

    getCoordinates() {
      return {
        latitude: this.latitude,
        longitude: this.longitude,
        coordinateCollected: this.coordinateCollected,
      };
    },
    setCoordinates(lat, lng, timezone) {
      console.log(lat, lng, timezone, 'asdfsdfsdfsdf')
      this.latitude = lat;
      this.longitude = lng;
      this.timezone = timezone;
      this.coordinateCollected = true;
    },
    clearCoordindates() {
      this.latitude = null;
      this.longitude = null;
      this.coordinateCollected = false;
    },
  },
});
