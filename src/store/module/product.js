import ApiService from "@/core/services/api.service";

export default {
    state: {
        product: [],
        productList: [],
        productListFeatured:[],
    },

    getters: {
        productList: state => state.productList,
        productListFeatured: state => state.productListFeatured,
    },

    actions: {
        PRODUCT_LIST({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("product")
                    .then(({data}) => {
                        commit('SET_PRODUCT_LIST', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        PRODUCT_LIST_FEATURED({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("product_featured")
                    .then(({data}) => {
                        commit('SET_PRODUCT_LIST_FEATURED', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
    },

    mutations: {
        SET_PRODUCT_LIST: (state, data) => {
            state.productList = data;
        },
        SET_PRODUCT_LIST_FEATURED: (state, data) => {
            state.productListFeatured = data;
        },
        PRODUCT_MODIFY: (state, data) => {
            Object.assign(state.productList.find(element => element.id === data.id), data);
        },
        PRODUCT_ADD: (state, data) => {
            state.productList.unshift(data);
        },
        PRODUCT_REMOVE: (state, data) => {
            let index = state.productList.findIndex(value => value.id === data);
            state.productList.splice(index, 1);
        }
    }

}
