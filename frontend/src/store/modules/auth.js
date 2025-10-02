import $axios from "@/plugins/axios";
import {ifAdmin, ifSudo} from "@/others/util";

export const namespaced = true;

export const state = {
  token: localStorage.getItem("token") || null,
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || {},
};

export const mutations = {
  setToken(state, payload) {
    localStorage.setItem("token", payload);
    state.token = payload;
  },
  setCurrentUser(state, payload) {

    state.currentUser = {...state.currentUser, ...payload};
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser = {...currentUser, ...payload};
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  },
  removeToken(state) {
    localStorage.removeItem("token");
    state.token = null;
  },
  removeCurrentUser(state) {
    localStorage.removeItem("currentUser");
    state.currentUser = {};
  },
};

export const actions = {
  signin({commit}, request) {
    return new Promise((resolve, reject) => {
      $axios
        .post("/auth/signin", request)
        .then((response) => {
          commit("setToken", response.headers?.authorization);
          commit("setCurrentUser", response.data?.payload?.currentUser);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  signout({commit}) {
    return new Promise((resolve, reject) => {
      commit("removeToken");
      commit("removeCurrentUser");
      resolve();
    });
  },
  register({commit}, request) {
    return new Promise((resolve, reject) => {
      $axios
        .post("/auth/register", request)
        .then((response) => {
          commit("setToken", response.headers?.authorization);
          commit("setCurrentUser", response.data?.payload?.currentUser);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
export const getters = {
  getToken(state) {
    return state.token;
  },
  getCurrentUser(state) {
    return state.currentUser;
  },
  isSudo(state) {
    return ifSudo({role: state.currentUser.role})
  },
  isAdmin(state) {
    return ifAdmin({role: state.currentUser.role})
  },
  signedin(state) {
    return !!state.token;
  },
  calcHome(state, getters) {

    // add all the app roles here, and their default home page
    return getters.isAdmin
      ? {name: "dashboard-admin"}
      : getters.isSudo
        ? {name: "dashboard-sudo"}
        : {name: "signout"};
  },
};
