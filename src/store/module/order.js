import ApiService from "@/core/services/api.service";

export default {
    state: {
        order: [],
        orderList: [],
        orderListUser:[],
    },

    getters: {
        orderList: state => state.orderList,
        orderListUser: state => state.orderListUser,
    },

    actions: {
        ORDER_LIST({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("orders")
                    .then(({data}) => {
                        commit('SET_ORDER_LIST', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        ORDER_LIST_USER({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("orders_by_user")
                    .then(({data}) => {
                        commit('SET_ORDER_LIST_USER', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
    },

    mutations: {
        SET_ORDER_LIST: (state, data) => {
            state.orderList = data;
        },
        SET_ORDER_LIST_USER: (state, data) => {
            state.orderListUser = data;
        },
        ORDER_MODIFY: (state, data) => {
            Object.assign(state.orderList.find(element => element.id === data.id), data);
        },
        ORDER_ADD: (state, data) => {
            state.orderList.unshift(data);
        },
        ORDER_ADD_USER: (state, data) => {
            state.orderListUser.unshift(data);
        },
        ORDER_REMOVE: (state, data) => {
            let index = state.orderList.findIndex(value => value.id === data);
            state.orderList.splice(index, 1);
        },
        ORDER_REMOVE_USER: (state, data) => {
            let index = state.orderListUser.findIndex(value => value.id === data);
            state.orderListUser.splice(index, 1);
        }
    }

}
