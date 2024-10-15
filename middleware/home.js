import { loggedIn } from "~/composables/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const showToast = async (message) => {
    await useNuxtApp().$toast.info(message);
  };
  if (loggedIn()) {
    return navigateTo("/events");
  }
  
  // if(loggedIn() ) {
  //     return navigateTo('/events')
  // } else if(!loggedIn()) {
  //     return navigateTo('/')
  // }
});

// if(loggedIn() && to.fullPath === '/login') {
//     return navigateTo('/events')
// } else if(!loggedIn()) {
//     return navigateTo('/')
// }
