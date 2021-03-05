import CartService from "@/core/services/cart.service";

export default {
    state: {
        cart: [],
    },

    getters: {
        cartList: state => state.cart,
        cartProductCount: state => state.cart.length,
        cartProductById: state => id => state.cart.find(value => value.id === id),
    },
    actions: {
        STORE_CART({commit}, data) {
            commit('SET_PRODUCT_CART', data);
            commit('STORE_CART_PRODUCT');
        },
        Remove_CART({commit}, data) {
            commit('CART_REMOVE_SINGLE', data);
            commit('STORE_CART_PRODUCT');
        },
        CART_PRODUCT_LIST({commit}) {
            commit('LOAD_CART_PRODUCT');
        },
        EMPTY_PRODUCT_CART_LIST({commit}){
          commit('EMPTY_PRODUCT_CART');
        },
    },
    mutations: {
        SET_PRODUCT_CART: (state, data) => {
            let index = state.cart.findIndex(value => value.id === data.id);
            if (index > -1) state.cart.splice(index, 1);
            state.cart.push(data);
        },
        EMPTY_PRODUCT_CART: (state) => {
            state.cart.splice(0,state.cart.length);
            CartService.saveCartProduct(state.cart);
        },
        STORE_CART_PRODUCT: (state) => {
            CartService.destroyCartProduct();
            CartService.saveCartProduct(state.cart);
        },
        LOAD_CART_PRODUCT: (state) => {
            if (CartService.getCartProduct()) {
                state.cart = CartService.getCartProduct();
            }
        },
        CART_REMOVE_SINGLE: (state, data) => {
            let index = state.cart.findIndex(value => value.id === data.id);
            if (index > -1) state.cart.splice(index, 1);
        }
    }

}
