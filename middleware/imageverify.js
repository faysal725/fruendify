import { isProfileImageVerified } from "~/composables/profile";

export default defineNuxtRouteMiddleware((to, from) => {
  const showToast = async (message) => {
    await useNuxtApp().$toast.info(message);
  };

  console.log(
    "composable image verddddddify",
    isProfileImageVerified() == false
  );
  if (isProfileImageVerified() == false) {
    showToast("Please Verify your image first", "error", 5000);

    return navigateTo("/events");
  }

  // if(loggedIn() ) {
  //     return navigateTo('/events')
  // } else if(!loggedIn()) {
  //     return navigateTo('/')
  // }
});
