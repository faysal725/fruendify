import { loggedIn } from '~/composables/auth'


export default defineNuxtRouteMiddleware((to, from) => {
    // if(loggedIn() && to.fullPath === '/login') {
    //     return navigateTo('/dashboard')
    // } else if(!loggedIn()) {
    //     return navigateTo('/login')
    // }

    if(loggedIn() && to.fullPath === '/login') {
        return navigateTo('/dashboard')
    } else if(!loggedIn()) {
        return navigateTo('/login')
    }
})