import ApiService from "@/core/services/api.service";

export default {
    state: {
        category: [],
    },

    getters: {
        categoryList: state => state.category,
        categoryNameById: state => id => state.category.find(value => value.id === id),
        categoryNameBySlug: state => slug => state.category.find(value => value.slug === slug),
    },
    actions: {
        CATEGORY_LIST({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("category")
                    .then(({data}) => {
                        commit('SET_CATEGORY_LIST', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
    },
    mutations: {
        SET_CATEGORY_LIST: (state, data) => {
            state.category = data;
        },
        CATEGORY_MODIFY: (state, data) => {
            Object.assign(state.category.find(element => element.id === data.id), data);
        },
        CATEGORY_ADD: (state, data) => {
            state.category.unshift(data);
        },
        CATEGORY_REMOVE: (state, data) => {
            let index = state.category.findIndex(value => value.id === data);
            state.category.splice(index, 1);
        }
    }
}
