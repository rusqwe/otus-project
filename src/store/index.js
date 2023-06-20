import { createStore } from 'vuex'
import product from "./product.js";

export default createStore({
  modules: {
    product
  },
  state: {
    carts: [],
    user: {
      login: null,
      lastName: null,
      firstName: null,
      surname: null,
      address: null,
      isAdmin: false
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
    SET_USER: (state, { login, lastName, firstName, surname, address }) => {
      state.user = {
        login: login || state.user.login,
        lastName: lastName || state.user.lastName,
        firstName: firstName || state.user.firstName,
        surname: surname || state.user.surname,
        address: address || state.user.address,
        isAdmin: (Math.random() < 0.5)
      };
    },
  },
  actions: {
    logout() {
      sessionStorage.removeItem('session');
    }
  },
  getters: {
    carts: s => s.carts,
    user: s => s.user,
  },
})