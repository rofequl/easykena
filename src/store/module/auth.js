import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import router from "../../router";

const auth = {
    state: {
        isAdmin: false,
        isLoad: false,
        user: {},
        isAuthenticated: !!JwtService.getToken()
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        isAdmin: state => state.isAdmin,
        isLoadProfile: state => state.isLoad,
        currentUser: state => state.user,
    },
    actions: {
        LOGIN({commit}, credentials) {
            return new Promise((resolve, reject) => {
                ApiService.post("login", credentials)
                    .then(({data}) => {
                        commit('SET_AUTH', data);
                        resolve();
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        },
        LOGOUT({commit, state}) {
            if (state.isAuthenticated) {
                ApiService.post("logout")
                commit('PURGE_AUTH');
                router.push({name: 'home'});
            } else console.log('Not Logout');
        },
        VERIFY_AUTH({commit, state}) {
            return new Promise((resolve, reject) => {
                if (JwtService.getToken()) {
                    ApiService.setHeader();
                    ApiService.get("profile")
                        .then(({data}) => {
                            commit('SET_AUTH_USERS', data.user);
                            resolve();
                        })
                        .catch(error => {
                            reject(error)
                        })
                        .finally(state.isLoad = true)
                }else {
                    resolve();
                }
            });
        }
    },
    mutations: {
        SET_AUTH: (state, user) => {
            state.isAuthenticated = true;
            JwtService.saveToken(user.token);
        },
        PURGE_AUTH: (state) => {
            state.isAuthenticated = false;
            state.user = {};
            JwtService.destroyToken();
        },
        SET_AUTH_USERS: (state, user) => {
            state.user = user;
            user.is_admin === 1 ? state.isAdmin = true : state.isAdmin = false;
        }
    }
};

export default auth
