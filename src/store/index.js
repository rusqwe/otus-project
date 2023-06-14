import { createStore } from 'vuex'

export default createStore({
    state: {
        products: [],
    },
    mutations: {
        ADD_PRODUCT: (state, val) => {
            const index = state.products.findIndex(item => item.id === val.id);
            if (index !== -1) {
                state.products[index].count++;
            } else {
                state.products.push(val);
            }
        },
        DELETE_PRODUCT: (state, val) => {
            const index = state.products.findIndex(item => item.id === val.id);
            if (index !== -1) {
                state.products[index].count = state.products[index].count - 1;
                if (state.products[index].count < 1) {
                    state.products.splice(index, 1);
                }
            }
        },
        CLEAR_PRODUCTS: (state,) => {
            state.products = [];
        },
    },

    getters: {
        products: s => s.products,
    },
    actions: {},
    modules: {}
})