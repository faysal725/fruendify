import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    isLoggedIn: false,
    isOauthCalling:false,
    otpVarified: false,
    stepNo: 1,
    access_token: null,
    refresh_token: null,
    userData: {
      id: null,
      email: null,
      registered_token: null,
      aboutFrundify: "",
      joining_reason: "",
      full_name: "",
      last_name: "",
      birth_date: "",
      gender: "",
      jobTitle: "",
      jobDescription: "",
      industry: "",
      experience: "",
      interests: null,
      images: null,
      profile_image: null,
      formDataImages: null,

      user: null,
    },

    userDataAfterLogin: null,
  }),
  persist: true,
  actions: {
    savePrimaryData(credentials) {
      this.userData.email = credentials.data?.email
        ? credentials.data.email
        : null;
      this.userData.registered_token = credentials.data?.registered_token
        ? credentials.data.registered_token
        : null;
      this.stepNo = 2;
    },
    savePrimaryOauthData(credentials) {
      this.userData.email = credentials.email ? credentials.email : null;
      this.userData.registered_token = credentials.registered_token
        ? credentials.registered_token
        : null;
    },
    saveOtpData(isVarified) {
      if (isVarified) {
        this.stepNo = 3;
        this.otpVarified = true;
      } else {
        this.otpVarified = false;
      }
    },

    saveAboutFrundifyData(data) {
      this.userData.aboutFrundify = data.aboutFrundify;
      this.userData.ContainerProfileImagesUploader = data.joining_reason;
      this.stepNo = 4;
    },
    saveNameAndBirthday(credentials) {
      this.userData.full_name = credentials.full_name;
      this.userData.last_name = credentials.last_name;
      this.userData.birth_date = credentials.birth_date;
      this.stepNo = 6;
    },

    saveGender(gender) {
      this.userData.gender = gender;
      this.stepNo = 7;
    },

    saveJobInformation(info) {
      this.userData.jobTitle = info.jobTitle;
      this.userData.jobDescription = info.jobDescription;
      this.userData.industry = info.industry;
      this.userData.experience = info.experience;
      this.stepNo = 8;
    },

    saveInterests(interests) {
      this.userData.interests = [...interests];
      this.stepNo = 9;
    },
    saveImages(images) {
      this.userData.images = [...images];
      this.userData.profile_image = images[0];
      // this.userData.interests = [...interests];
      // this.stepNo = 9;
    },
    clearUserImages() {
      this.userData.images = null;
    },

    // makeFormData() {
    //   const formData = new FormData();

    //   // formData.append("email", authStore.userData.email);
    //   for (const image of this.userData.images) {
    //     // Check if each element is a File object
    //     if (!(image instanceof File)) {
    //       throw new Error("Invalid image data. Expected File objects");
    //     }

    //     formData.append("images[]", image); // Append with square brackets for array
    //   }
    // },

    saveAuthAccess(credentials) {
      this.isLoggedIn = true;

      this.access_token = credentials.tokens.access.token;
      this.refresh_token = credentials.tokens.refresh.token;
      this.userDataAfterLogin = credentials.data;
    },
    saveToken(credentials) {
      console.log(credentials.tokens.access.token);
      this.access_token = credentials.tokens.access.token;
      this.refresh_token = credentials.tokens.refresh.token;
    },
    saveOauthToken(credentials) {
      this.access_token = credentials.access;
      this.refresh_token = credentials.refresh_token;
    },
    saveAuthProfileInfo(credentials) {
      this.isLoggedIn = true;
      this.userDataAfterLogin = credentials;
    },
    stepUp() {
      this.stepNo++;
    },
    stepDown() {
      this.stepNo--;
    },
    setStep(number) {
      this.stepNo = number;
    },
    getToken() {
      return this.access_token;
    },
    authenticated() {
      return this.isLoggedIn;
    },
    setAuthUser(user) {
      this.user = user;
    },
    getAuthUser() {
      return this.user;
    },
    setIsOAuthCalling(bool) {
      return this.isOauthCalling = bool
    },

    clearAuthUser() {
      this.isLoggedIn = false;
      this.isOauthCalling = false;
      this.otpVarified = false;
      this.stepNo = 1;
      this.access_token = null;
      this.refresh_token = null;

      this.userData.id = null;
      this.userData.email = null;
      this.userData.registered_token = null;
      this.userData.aboutFrundify = "";
      this.userData.full_name = "";
      this.userData.birth_date = "";
      this.userData.gender = "";
      this.userData.jobTitle = "";
      this.userData.jobDescription = "";
      this.userData.industry = "";
      this.userData.experience = "";
      this.userData.interests = null;
      this.userData.images = null;
      this.userData.profile_image = null;
      this.userData.formDataImages = null;
      this.userData.user = null;

      this.userDataAfterLogin = null;
    },
  },
});
