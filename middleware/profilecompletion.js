import { isProfileCompleted } from "~/composables/profile";

export default defineNuxtRouteMiddleware((to, from) => {
    console.log('composable', isProfileCompleted())
  const showToast = async (message) => {
    await useNuxtApp().$toast.info(message);
  };
  if (!isProfileCompleted()) {
    showToast("Please Complete your profile first", "error", 5000);
    return navigateTo("/");
  }
  
  // if(loggedIn() ) {
  //     return navigateTo('/events')
  // } else if(!loggedIn()) {
  //     return navigateTo('/')
  // }
});