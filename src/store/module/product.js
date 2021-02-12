import ApiService from "@/core/services/api.service";

export default {
    state: {
        product: [],
        productList: [],
    },

    getters: {
        productList: state => state.productList,
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
    },

    mutations: {
        SET_PRODUCT_LIST: (state, data) => {
            state.productList = data;
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
