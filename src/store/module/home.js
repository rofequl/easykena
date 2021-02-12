import ApiService from "@/core/services/api.service";

export default {
    state: {
        homeSlider: [],
    },

    getters: {
        homeSlider: state => state.homeSlider,
    },

    actions: {
        HOME_SETUP({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("home-setup")
                    .then(({data}) => {
                        commit('SET_HOME_SLIDER_LIST', data.home_slider);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
    },

    mutations: {
        SET_HOME_SLIDER_LIST: (state, data) => {
            data = JSON.parse(data);
            if (data && data.length > 0) {
                state.homeSlider = data;
            }
        },
    }

}
