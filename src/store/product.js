import axios from "../mixin/axios.js";
const API_URL_STORE = "https://fakestoreapi.com/",
  API_URL_BIN = "http://httpbin.org/";
const { getData, postData } = axios;

export default {
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS: (state, val) => {
      state.products = val;
    },
    ADD_PRODUCT: (state, val) => {
      state.products.unshift({ ...val, count: 1 });
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
    addProduct({ commit }, product) {
      return postData(`${API_URL_STORE}products`, product).then(
        (res) => {
          commit("ADD_PRODUCT", res)
        }
      );
    }
  },
  getters: {
    products: s => s.products,
  },
}