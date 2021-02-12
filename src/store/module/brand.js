import ApiService from "@/core/services/api.service";

export default {
    state: {
        brand: [],
    },

    getters: {
        brandList: state => state.brand,
    },

    actions: {
        BRAND_LIST({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("brand")
                    .then(({data}) => {
                        commit('SET_BRAND_LIST', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
    },
    mutations: {
        SET_BRAND_LIST: (state, data) => {
            state.brand = data;
        },
        BRAND_MODIFY: (state, data) => {
            Object.assign(state.brand.find(element => element.id === data.id), data);
        },
        BRAND_ADD: (state, data) => {
            state.brand.unshift(data);
        },
        BRAND_REMOVE: (state, data) => {
            let index = state.brand.findIndex(value => value.id === data);
            state.brand.splice(index, 1);
        }
    }

}
