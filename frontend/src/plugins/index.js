/**
 * plugins/app.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import router from "../router";
import store from "../store";
import $axios from "@/plugins/axios";
import {getQueryParam, handleRedirect, handleRemoveQueriesNRedirect, removeQueryParams} from "@/others/util";

function handleAuthRoutes(to, isSignedin, userRole) {
  if (to.matched.some((record) => record.meta.requiresNoAuth) && isSignedin) {
    return store.getters["auth/calcHome"];
  } else if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isSignedin
  ) {
    return { name: "signin" };
  } else if (!to.name && isSignedin) {
    return store.getters["auth/calcHome"]; //undefined routes visited
  }
  return null;
}

export function registerPlugins(app) {
  router.beforeEach((to, from, next) => {
    if (
      handleRedirect({
        param: "backendRedirectUrl",
      })
    ) {
      return; // Stop the execution of this guard, as a full page reload is happening
    }
    //save routeinfo to state
    store.commit("setRouteInfo", { to, from });

    const isSignedin = store.getters["auth/signedin"];
    const currentUser = store.getters["auth/getCurrentUser"];
    const redirectRoute = handleAuthRoutes(to, isSignedin, currentUser.role);
    if (redirectRoute) {
      next(redirectRoute);
    } else {
      if (
        handleRemoveQueriesNRedirect({
          params: ["apiQueryMsg"],
        })
      ) {
        // No need to call next() here, as window.location.replace will trigger a new navigation cycle
        return;
      }
      next();
    }
  });

  app.use(vuetify).use(router).use(store);
  app.provide("$axios", $axios);
  window.$axios = $axios;
}
