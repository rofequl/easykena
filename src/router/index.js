import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const isAdminLoggedIn = (to, from, next) => {
    console.log(store.getters.isAdmin);
    if (store.getters.isAuthenticated) store.getters.isAdmin ? next() : next({name: 'home'});
    else next({name: 'admin-login'})
}
const isUserLoggedIn =(to,from,next)=>{
  if (store.getters.isAuthenticated)
    next();
  else next({name: 'home'})
}
const isAdminLoggedOut = (to, from, next) => {
    if (store.getters.isAuthenticated) store.getters.isAdmin ? next({name: 'dashboard'}) : next({name: 'home'});
    else next()
}

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior: () => ({y: 0}),
    routes: configRoutes()
})

function configRoutes() {
    return [
        {
            path: "/admin",
            redirect: "/admin/dashboard",
            component: () => import("@/layout/Admin"),
            beforeEnter: isAdminLoggedIn,
            children: [
                {
                    meta: {title: 'Dashboard'},
                    path: "/admin/dashboard",
                    name: "dashboard",
                    component: () => import("@/pages/Dashboard")
                },
                {
                    meta: {title: 'Category Manage'},
                    path: "/admin/product/category",
                    name: "admin-category",
                    component: () => import("@/pages/admin/product/Category")
                },
                {
                    meta: {title: 'Brand Manage'},
                    path: "/admin/product/brand",
                    name: "admin-brand",
                    component: () => import("@/pages/admin/product/Brand")
                },
                {
                    meta: {title: 'Sub-Category Manage'},
                    path: "/admin/product/sub-category",
                    name: "admin-subcategory",
                    component: () => import("@/pages/admin/product/SubCategory")
                },
                {
                    meta: {title: 'Sub-Subcategory Manage'},
                    path: "/admin/product/sub-subcategory",
                    name: "admin-subsubcategory",
                    component: () => import("@/pages/admin/product/SubSubCategory")
                },
                {
                    meta: {title: 'Product List'},
                    path: "/admin/product/product-list",
                    name: "admin-productList",
                    component: () => import("@/pages/admin/product/ProductList")
                },
                {
                    meta: {title: 'New Product Entry'},
                    path: "/admin/product/product-add",
                    name: "admin-productAdd",
                    component: () => import("@/pages/admin/product/ProductAdd")
                },
                {
                    meta: {title: 'Shipping Configuration'},
                    path: "/admin/shipping/configuration",
                    name: "shipping-configuration",
                    component: () => import("@/pages/admin/shipping/Shipping")
                },
                {
                    meta: {title: 'Region Manage'},
                    path: "/admin/shipping/region",
                    name: "shipping-region",
                    component: () => import("@/pages/admin/shipping/Region")
                },
                {
                    meta: {title: 'City Manage'},
                    path: "/admin/shipping/city",
                    name: "shipping-city",
                    component: () => import("@/pages/admin/shipping/City")
                },
                {
                    meta: {title: 'Area Manage'},
                    path: "/admin/shipping/area",
                    name: "shipping-area",
                    component: () => import("@/pages/admin/shipping/Area")
                },
                {
                    meta: {title: 'Orders List'},
                    path: "/admin/orders/orders-list",
                    name: "Orders List",
                    component: () => import("@/pages/admin/orders/OrdersList")
                },
                {
                    meta: {title: 'Coupons List'},
                    path: "/admin/coupons/coupons-list",
                    name: "Coupons List",
                    component: () => import("@/pages/admin/coupons/CouponsList")
                },
                {
                    meta: {title: 'General Settings'},
                    path: "/admin/setup/general-setting",
                    name: "general-setting",
                    component: () => import("@/pages/admin/setup/General")
                },
                {
                    meta: {title: 'Website Pages'},
                    path: "/admin/setup/pages",
                    name: "website-pages",
                    component: () => import("@/pages/admin/setup/Pages")
                },
                {
                    meta: {title: 'Home Page Settings'},
                    path: "/admin/setup/home-edit",
                    name: "home-edit",
                    component: () => import("@/components/general/Home")
                }
            ]
        },
        {
            path: "/",
            component: () => import("@/layout/Frontend"),
            children: [
                {
                    meta: {title: 'Home'},
                    path: "/",
                    name: "home",
                    component: () => import("@/pages/frontend/Home")
                },
                {
                    meta: {title: 'Categories'},
                    path: "/category/:cat/:sub?/:subcat?",
                    name: "category",
                    component: () => import("@/pages/frontend/ProductList")
                },
                {
                    meta: {title: 'All Category List'},
                    path: "/category",
                    name: "all-category",
                    component: () => import("@/pages/frontend/AllCategory")
                },
                {
                    meta: {title: 'Manage My Account'},
                    path: "/user-profile",
                    name: "user-profile",
                    component: () => import("@/pages/frontend/Account")
                },
                {
                    meta: {title: 'My Orders'},
                    path: "/user-orders",
                    name: "user-orders",
                    component: () => import("@/pages/frontend/OrdersList")
                },
                {
                    meta: {title: 'Edit Profile'},
                    path: "/user-profile/edit",
                    name: "user-profile-edit",
                    component: () => import("@/pages/frontend/account/Profile")
                },
                {
                    meta: {title: 'Address Book Manage'},
                    path: "/user-address/manage",
                    name: "user-address-manage",
                    component: () => import("@/pages/frontend/account/Address")
                },
                {
                    meta: {title: 'Add New Address'},
                    path: "/user-address/add",
                    name: "user-address-add",
                    component: () => import("@/pages/frontend/account/AddAddress")
                },
                {
                    meta: {title: 'Checkout'},
                    path: "/checkout",
                    name: "checkout",
                    beforeEnter: isUserLoggedIn,
                    component: () => import("@/pages/frontend/Checkout")
                }
            ]
        },
        {
            meta: {title: 'Admin - Login'},
            path: "/admin-login",
            name: "admin-login",
            beforeEnter: isAdminLoggedOut,
            component: () => import("@/pages/admin/Login"),
        },
        {
            path: "/error",
            name: "error-500",
            meta: {title: 'Error 500'},
            component: () => import("@/pages/error/Error-500"),
        },
        {
            path: "*",
            name: "error-404",
            meta: {title: 'Error 404'},
            component: () => import("@/pages/error/Error-404"),
        },
    ]
}
