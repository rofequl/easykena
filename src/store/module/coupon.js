import ApiService from "@/core/services/api.service";

export default {
    state: {
        coupon: [],
        couponList: [],
    },

    getters: {
        couponList: state => state.couponList,
    },

    actions: {
        COUPON_LIST({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("coupons")
                    .then(({data}) => {
                        commit('SET_COUPON_LIST', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
    },

    mutations: {
        SET_COUPON_LIST: (state, data) => {
            state.couponList = data;
        },
        COUPON_MODIFY: (state, data) => {
            Object.assign(state.couponList.find(element => element.id === data.id), data);
        },
        COUPON_ADD: (state, data) => {
            state.couponList.unshift(data);
        },
        COUPON_REMOVE: (state, data) => {
            let index = state.couponList.findIndex(value => value.id === data);
            state.couponList.splice(index, 1);
        }
    }

}
