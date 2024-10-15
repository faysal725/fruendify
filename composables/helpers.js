
export const trimHyphen = (array) => {
    return toUpperCaseFirstLetter(array.split('-').join(' '))
}

export const toUpperCaseFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const isNestedRoute = (route) => {
    return route.currentRoute.value.fullPath.split('/').length > 2
}

export const routeLists = (route) => {
    return route.currentRoute.value.fullPath.split('/').splice(1,route.currentRoute.value.fullPath.split('/').length-1)
}

export const currentRoute = (route) => {
    return isNestedRoute(route) ? trimHyphen(routeLists(route)[0] + ' ' + routeLists(route)[1]) : trimHyphen(route.currentRoute.value.name)
}

export const currentRouteFromLists = (route, routeName) => {
    return toUpperCaseFirstLetter(trimHyphen(routeLists(route).filter(name => name === routeName)[0]))
}

export const currentRouteLinks = (route) => {
    return isNestedRoute(route) ? toUpperCaseFirstLetter(routeLists(route)[0] + ' ' + routeLists(route)[1]) : toUpperCaseFirstLetter(route.currentRoute.value.name)
}

export const isHrefIncludedInRouter = (route, href) => {
    return route.currentRoute.value.name.includes(href.slice(1))
}