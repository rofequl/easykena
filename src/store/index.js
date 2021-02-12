import Vue from 'vue'
import Vuex from 'vuex'

import auth from './module/auth'
import general from "@/store/module/general";
import category from "@/store/module/category";
import subcategory from "@/store/module/subcategory";
import subsubcategory from "@/store/module/subsubcategory";
import product from "@/store/module/product";
import brand from "@/store/module/brand";
import home from "@/store/module/home";
import cart from "@/store/module/cart";
import region from "@/store/module/region";
import city from "@/store/module/city";
import area from "@/store/module/area";
import address from "@/store/module/address";

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        auth,
        general,
        category,
        subcategory,
        subsubcategory,
        product,
        brand,
        home,
        cart,
        region,
        city,
        area,
        address
    },
    state: {
        sidebarShow: 'responsive',
        sidebarMinimize: false,
        sidebarMinimizeFront: true,
        sidebarTopSize: false,
    },
    mutations: {
        toggleSidebarDesktop(state) {
            const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
            state.sidebarShow = sidebarOpened ? false : 'responsive'
        },
        toggleSidebarMobile(state) {
            const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
            state.sidebarShow = sidebarClosed ? true : 'responsive'
        },
        toggleSidebarFrontend(state) {
            state.sidebarMinimizeFront = !state.sidebarMinimizeFront;
        },
        toggleSidebarTopSize(state, data) {
            state.sidebarTopSize = data;
        },
        set(state, [variable, value]) {
            state[variable] = value
        }
    }
})
