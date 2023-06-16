import { createStore } from 'vuex'

import axios from "../mixin/axios.js";
const API_URL_STORE = "https://fakestoreapi.com/",
  API_URL_BIN = "http://httpbin.org/";
const { getData, postData } = axios;

export default createStore({
  state: {
    products: [],
    carts: [],
    user: {
      login: null,
      lastName: null,
      firstName: null,
      surname: null,
      address: null,
    }
  },
  mutations: {
    ADD_CART: (state, val) => {
      const index = state.carts.findIndex(item => item.id === val.id);
      if (index !== -1) {
        state.carts[index].count++;
      } else {
        state.carts.push({ ...val });
      }
    },
    DELETE_CART: (state, val) => {
      const index = state.carts.findIndex(item => item.id === val.id);
      if (index !== -1) {
        state.carts[index].count = state.carts[index].count - 1;
        if (state.carts[index].count < 1) {
          state.carts.splice(index, 1);
        }
      }
    },
    CLEAR_CARTS: (state) => {
      state.carts = [];
    },
    SET_PRODUCTS: (state, val) => {
      state.products = val;
    },
    SET_USER: (state, { login, lastName, firstName, surname, address }) => {
      state.user = {
        login: login || state.user.login,
        lastName: lastName || state.user.lastName,
        firstName: firstName || state.user.firstName,
        surname: surname || state.user.surname,
        address: address || state.user.address
      };
    },
  },
  actions: {
    getProducts({ commit }) {
      return getData(`${API_URL_STORE}products`, {}).then(
        (res) => {
          const products = res.map((item) => ({ ...item, count: 1 }))
          commit("SET_PRODUCTS", products)
        }
      );
    },
    logout() {
      sessionStorage.session = false;
    }
  },
  getters: {
    products: s => s.products,
    carts: s => s.carts,
    user: s => s.user,
  },
})