import ApiService from "@/core/services/api.service";

export default {
    state: {
        generals: [],
        isMaintenance: false,
        maintenanceDate: '',
        isBangla: false,
        defaultLanguage: 1,
    },

    getters: {
        generalSettings: state => state.generals,
        isBangla: state => state.isBangla,
        isMaintenance: state => state.isMaintenance,
        defaultLanguage: state => state.defaultLanguage,
    },

    actions: {
        GENERAL_LIST({commit}) {
            return new Promise((resolve, reject) => {
                ApiService.get("general-settings")
                    .then(({data}) => {
                        commit('SET_GENERAL_LIST', data[0]);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        BANGLA_ACTIVE({commit}, data) {
            return new Promise((resolve, reject) => {
                ApiService.post("language_active", data)
                    .then(({data}) => {
                        commit('SET_LANGUAGE_ACTIVE', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        DEFAULT_LANGUAGE({commit}, data) {
            return new Promise((resolve, reject) => {
                ApiService.post("default_language", data)
                    .then(({data}) => {
                        commit('SET_DEFAULT_LANGUAGE', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        MAAINTENANCE_ACTIVE({commit}, data) {
            return new Promise((resolve, reject) => {
                ApiService.post("maintenance_active", data)
                    .then(({data}) => {
                        commit('SET_MAINTENANCE_ACTIVE', data);
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        }
    },
    mutations: {
        SET_GENERAL_LIST: (state, data) => {
            state.generals = data;
            switch (data.maintenance_mode) {
                case 1:
                    state.isMaintenance = true;
                    state.maintenanceDate = data.maintenance_date;
                    break;
                case 0:
                    state.isMaintenance = false;
                    state.maintenanceDate = '';
                    break;
            }
            data.bangla_language === 1 ? state.isBangla = true : state.isBangla = false
            state.defaultLanguage = data.default_language;
        },
        SET_LANGUAGE_ACTIVE: (state, data) => {
            data === 1 ? state.isBangla = true : state.isBangla = false
        },
        SET_DEFAULT_LANGUAGE: (state, data) => {
            state.defaultLanguage = data;
        },
        SET_MAINTENANCE_ACTIVE: (state, data) => {
            data === 1 ? state.isMaintenance = true : state.isMaintenance = false
        },
    }
}
